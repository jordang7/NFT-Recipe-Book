import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const { ethers } = require("ethers");

const RecipeUpload = () => {
  const [IngredientsArray, setIngredientsArray] = useState([
    { Ingredient: "", Amount: "" },
  ]);
  const [photo, setPhotoData] = useState();

  let handleChange = (i, e) => {
    let newIngredientsArray = [...IngredientsArray];
    newIngredientsArray[i][e.target.name] = e.target.value;
    setIngredientsArray(newIngredientsArray);
  };

  let addNewIngredient = () => {
    setIngredientsArray([...IngredientsArray, { Ingredient: "", Amount: "" }]);
  };

  let removeIngredient = (i) => {
    let newIngredientsArray = [...IngredientsArray];
    newIngredientsArray.splice(i, 1);
    setIngredientsArray(newIngredientsArray);
  };

  let handleSubmit = (e) => {
    e.preventDefault();

    //TODO Send information to mint.js to mint the NFT
  };
  const style = {
    IngredientBox: {
      border: "2px solid #FFFFFF",
    },
  };

  return (
    <div>
      <h1>Upload your recipe here!</h1>
      <Form onSubmit={handleSubmit}>
        {IngredientsArray.map((element, index) => (
          <div className="form-inline" style={style.IngredientBox} key={index}>
            <Row className="p-4">
              <Col md="auto">#{index + 1}</Col>
              <Col>
                <InputGroup>
                  <FormControl
                    placeholder="Ingredient"
                    aria-label="Ingredient"
                    type="text"
                    name="Ingredient"
                    value={element.Ingredient || ""}
                    id="validationCustom03"
                    onChange={(e) => handleChange(index, e)}
                    required
                  />
                </InputGroup>
              </Col>
              <Col>
                <InputGroup>
                  <FormControl
                    placeholder="Amount"
                    aria-label="Amount"
                    type="text"
                    name="Amount"
                    value={element.Amount || ""}
                    onChange={(e) => handleChange(index, e)}
                    required
                  />
                </InputGroup>
              </Col>

              {index ? (
                <Col md="auto">
                  <Button
                    type="button"
                    variant="primary"
                    onClick={() => removeIngredient(index)}
                  >
                    Remove
                  </Button>
                </Col>
              ) : null}
            </Row>
          </div>
        ))}
        <Form.Group controlId="formFile" className="m-3">
          <Form.Control
            type="file"
            onChange={(e) => setPhotoData(e.target.value)}
          />
        </Form.Group>
        <div>
          <Button
            className="mx-1"
            variant="primary"
            onClick={() => addNewIngredient()}
          >
            Add
          </Button>
          <Button className="mx-1" variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};
export default RecipeUpload;
