import React, { useState } from "react";
import Card from "react-bootstrap/Card"; // import komponenty Card
import Icon from "@mdi/react"; // komponenta, kterou budeme používat pro zobrazení ikony
import {
  mdiAccountSchoolOutline,
  mdiDelete,
  mdiGlassCocktail,
  mdiPencilOutline,
} from "@mdi/js"; // ikony, které chceme využít
import CardFooter from "react-bootstrap/esm/CardFooter";
import Button from "react-bootstrap/esm/Button";
import { Form, useNavigate } from "react-router-dom";
import CardHeader from "react-bootstrap/esm/CardHeader";
import "../App.css";

import { Dialog } from "primereact/dialog";
import "primereact/resources/themes/saga-blue/theme.css"; // Replace with your chosen theme
import "primereact/resources/primereact.min.css";
import { Modal } from "react-bootstrap";
import { Row } from "react-bootstrap";
import Col from "react-bootstrap/esm/Col";

function Drink(props) {
  const [deleteRecipeDialog, setDeleteRecipeDialog] = useState(false);
  const [editRecipeForm, setEditRecipeForm] = useState(false);
  const [createRecipeForm, setCreateRecipeForm] = useState(false);
  const [validated, setValidated] = useState(false);
  const [drinkDetail, setDrinkDetail] = useState(false);
  let navigate = useNavigate();

  function handleSubmit() {
    return;
  }

  function handleDelete(recipeID) {
    setDeleteRecipeDialog(false);
    return fetch(`http://localhost:3001/api/drinks/${recipeID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (response) => {
      //const newDrinkList = [...drinkList];
      /// const newRecipe = await response.json();
      // newDrinkList.push(newRecipe);
      // setDrinkList(newDrinkList);
    });
  }

  function editRecipe() {
    return;
  }
  function deleteRecipe() {
    return;
  }
  const openDeleteRecipeDialog = () => {
    setDeleteRecipeDialog(true);
    console.log(deleteRecipeDialog);
  };

  const deleteRecipeDialogFooter = (
    <React.Fragment>
      <Button
        onClick={() => setDeleteRecipeDialog(false)}
        style={{ marginRight: "10px", backgroundColor: "grey" }}
      >
        No
      </Button>
      <Button
        onClick={() => handleDelete(props.drink.id)}
        style={{ marginRight: "10px", backgroundColor: "red" }}
      >
        Yes
      </Button>
    </React.Fragment>
  );
  const editRecipeFormFooter = (
    <React.Fragment>
      <Button
        onClick={() => setEditRecipeForm(false)}
        style={{ marginRight: "10px", backgroundColor: "grey" }}
      >
        No
      </Button>
      <Button
        onClick={editRecipe}
        style={{ marginRight: "10px", backgroundColor: "red" }}
      >
        Yes
      </Button>
    </React.Fragment>
  );

  const renderIngredients = () => {
    const ingredientsJSX = [];

    for (let i = 0; i < 6; i++) {
      if (props.drink.ingredients[i].name !== "") {
        ingredientsJSX.push(
          <div key={i}>
            {props.drink.ingredients[i].name}
            {"      "}
            {props.drink.ingredients[i].amount}{" "}
            {props.drink.ingredients[i].unit}
          </div>
        );
      }
    }

    return ingredientsJSX;
  };

  return (
    <div>
      <Card
        style={{
          // Include padding and border in the width
          padding: "8px", // Add padding for better spacing
          boxSizing: "border-box",
          margin: "20px",
          // overflow: "hidden",
          width: "300px",
          height: "350px",
          borderColor: "black",
          borderWidth: 3,
          borderRadius: 10,
        }}
      >
        <CardHeader style={{ display: "flex", gap: "5px" }}>
          <div
            style={{
              fontWeight: "bold",
              fontSize: "large",
              //marginRight: "20px",
            }}
          >
            <Icon path={mdiGlassCocktail} size={1} color="grey" />{" "}
            {props.drink.name}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "start",
              justifyContent: "flex-end",
              gap: "5px",
            }}
          >
            <Button
              onClick={() => setEditRecipeForm(true)}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                border: "2px solid black",
                borderRadius: "50%",
                padding: "5px",
                width: "30px",
                height: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {" "}
              <Icon path={mdiPencilOutline} size={1} color="black" />
            </Button>

            <Button
              onClick={() => setDeleteRecipeDialog(true)}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                border: "2px solid red",
                borderRadius: "50%",
                padding: "5px",
                width: "30px",
                height: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon path={mdiDelete} size={0.8} color="red" />
            </Button>
          </div>
        </CardHeader>
        <Card.Body>
          <div
            style={{
              fontStyle: "italic",
              marginBottom: "10px",
              fontSize: "small",
            }}
          >
            {"Author: "} {props.drink.author}
          </div>
          <div>{props.drink.procedure}</div>
        </Card.Body>
        <CardFooter>
          <Button onClick={() => setDrinkDetail(true)}>Read more</Button>
        </CardFooter>
      </Card>

      <Dialog
        visible={deleteRecipeDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirmation"
        modal
        footer={deleteRecipeDialogFooter}
        onHide={() => setDeleteRecipeDialog(false)}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          <span>
            Do you really want to delete the recipe <b>{props.drink.name}</b>?
          </span>
        </div>
      </Dialog>

      <Modal show={editRecipeForm} onHide={() => setEditRecipeForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>

      <Dialog
        visible={drinkDetail}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header={props.drink.name}
        modal
        onHide={() => setDrinkDetail(false)}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          <div></div>
          <div>Author: {props.drink.author}</div>
          <br></br>
          <div>Procedure: {props.drink.procedure}</div>
          <br></br>
          <div>Ingredients:</div>
          {renderIngredients()}
        </div>
      </Dialog>
    </div>
  );
}

export default Drink;
