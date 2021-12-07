const { create } = require("ipfs-http-client");
const ipfs = create("https://ipfs.infura.io:5001");
const MarketContractAddr = "0x55911bD688118bE1e027c69f18c672b3aa66F129";
const { ethers } = require("ethers");
const abi = require(".././secrets/abi.json");
const provider = new ethers.providers.Web3Provider(window.ethereum);

export const mintRecipeNFT = async (
  recipeName,
  ingredients,
  photo,
  account
) => {
  try {
    const gateway = await ipfsUpload(recipeName, ingredients, photo);
    const signer = await provider.getSigner(account);
    const nonce = await signer.getTransactionCount();
    const market = new ethers.Contract(
      MarketContractAddr,
      abi.marketAbi,
      signer
    );
    const tokenURI = gateway;

    await market.createUserRecipe(tokenURI, { nonce: nonce + 1 });
    return true;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const ipfsUpload = async (name, recipe, image) => {
  let imagePath = await ipfsImageUpload(image);
  console.log(recipe);
  const files = {
    path: "/",
    content: JSON.stringify({
      name: name,
      attributes: recipe.map((ingredient) => {
        return {
          trait_type: ingredient.name,
          value: ingredient.quantity,
        };
      }),

      image: imagePath,
      description: `Recipe for ${name}`,
    }),
  };
  console.log(files);
  const result = await ipfs.add(files);
  return result.path;
};

export const ipfsImageUpload = async (photo) => {
  const result = await ipfs.add(photo);
  let imagePath = `https://gateway.ipfs.io/ipfs/${result.path}`;
  return imagePath;
};
