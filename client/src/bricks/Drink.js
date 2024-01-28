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
  const [validated, setValidated] = useState(false);
  const [drinkDetail, setDrinkDetail] = useState(false);
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: props.drink.name,
    author: props.drink.author,
    procedure: props.drink.procedure,
    ingredients: [
      {
        name: props.drink.ingredients[0].name,
        amount: props.drink.ingredients[0].amount,
        unit: props.drink.ingredients[0].unit,
      },
      {
        name: props.drink.ingredients[1].name,
        amount: props.drink.ingredients[1].amount,
        unit: props.drink.ingredients[1].unit,
      },
      {
        name: props.drink.ingredients[2].name,
        amount: props.drink.ingredients[2].amount,
        unit: props.drink.ingredients[2].unit,
      },
      {
        name: props.drink.ingredients[3].name,
        amount: props.drink.ingredients[3].amount,
        unit: props.drink.ingredients[3].unit,
      },
      {
        name: props.drink.ingredients[4].name,
        amount: props.drink.ingredients[4].amount,
        unit: props.drink.ingredients[4].unit,
      },
      {
        name: props.drink.ingredients[5].name,
        amount: props.drink.ingredients[5].amount,
        unit: props.drink.ingredients[5].unit,
      },
    ],
  });

  const setField = (name, val) => {
    return setFormData((formData) => {
      const newData = { ...formData };

      // If the field is within the ingredients array
      if (name.startsWith("ingredients")) {
        const ingredientsIndex = parseInt(name.match(/\[(\d+)\]/)[1], 10);

        // Make a copy of the ingredients array and update the specific element
        newData.ingredients = [...newData.ingredients];
        newData.ingredients[ingredientsIndex] = {
          ...newData.ingredients[ingredientsIndex],
          [name.split(".").pop()]: val,
        };
      } else {
        newData[name] = val;
      }

      return newData;
    });
  };

  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    // defaultní nastavení Form je, že když je provedeno onSubmit, reloadne se celá page, to nechceme, takže proto preventDefault
    e.preventDefault();
    // příklad: využití: https://react.dev/learn/responding-to-events
    e.stopPropagation();

    //data z vyplněného formuláře, která se odesílají na server
    const dataToServer = {
      ...formData,
    };
    // form je současný vstup uživatele, checkValidity se dívá na podmínky stanovené v jednotlibých Form.Control,
    // jako např. required, maxLength, min, max atd. a vyhodnocuje, zda je celý vstup validní... pak vrací true
    if (!form.checkValidity()) {
      setValidated(true);
      return;
    }
    // ukládáme přidanou známku na server -- ternární operátor nám na základě existence grade nastaví call na /update nebo / create

    ///////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////
    // TO DO EDIT RECIPE
    // zopakovat si kurz základy react JS...
    // OBECNĚ JAK TO UDĚLAT, KDYŽ PŘI ZMĚNE V KOMPONĚNTĚ DRINK chci tu změnu propsat do drinklistu, aby se mi aktualizoval...
  };

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

      <Modal
        show={editRecipeForm}
        onHide={() => setEditRecipeForm(false)}
        size="lg"
      >
        <Form
          noValidate
          validated={validated}
          onSubmit={(e) => handleSubmit(e)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit recipe</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) => setField("name", e.target.value)}
                maxLength={30}
                required
              />

              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                value={formData.author}
                onChange={(e) => setField("author", e.target.value)}
                maxLength={30}
                required
              />

              <Form.Label>Procedure</Form.Label>
              <Form.Control
                type="text"
                value={formData.procedure}
                onChange={(e) => setField("procedure", e.target.value)}
                maxLength={100}
                required
              />
            </Form.Group>

            <Row>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>Ingredient</Form.Label>
                <Form.Select
                  type="text"
                  value={formData.ingredients[0].name}
                  onChange={(e) =>
                    setField("ingredients[0].name", e.target.value)
                  }
                  required
                >
                  <option value="" disabled>
                    Select an ingredient
                  </option>
                  {props.ingredientsList.map((ingredient) => (
                    <option key={ingredient.id} value={ingredient.name}>
                      {ingredient.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="number"
                  value={formData.ingredients[0].amount}
                  onChange={(e) =>
                    setField("ingredients[0].amount", e.target.value)
                  }
                  required
                />
              </Form.Group>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>Unit</Form.Label>
                <Form.Select
                  value={formData.ingredients[0].unit}
                  onChange={(e) =>
                    setField("ingredients[0].unit", e.target.value)
                  }
                  required
                >
                  <option value="" disabled>
                    Unit
                  </option>
                  <option value={"g"}>g</option>
                  <option value={"špetka"}>špetka</option>
                  <option value={"lžička"}>lžička</option>
                  <option value={"ml"}>ml</option>
                  <option value={"cube"}>cube</option>
                </Form.Select>
              </Form.Group>
            </Row>

            <Row>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>Ingredient</Form.Label>
                <Form.Select
                  type="text"
                  value={formData.ingredients[1].name}
                  onChange={(e) =>
                    setField("ingredients[1].name", e.target.value)
                  }
                  required
                >
                  <option value="" disabled>
                    Select an ingredient
                  </option>
                  {props.ingredientsList.map((ingredient) => (
                    <option key={ingredient.id} value={ingredient.name}>
                      {ingredient.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="number"
                  value={formData.ingredients[1].amount}
                  onChange={(e) =>
                    setField("ingredients[1].amount", e.target.value)
                  }
                  required
                />
              </Form.Group>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>Unit</Form.Label>
                <Form.Select
                  value={formData.ingredients[1].unit}
                  onChange={(e) =>
                    setField("ingredients[1].unit", e.target.value)
                  }
                  required
                >
                  <option value="" disabled>
                    Unit
                  </option>
                  <option value={"g"}>g</option>
                  <option value={"špetka"}>špetka</option>
                  <option value={"lžička"}>lžička</option>
                  <option value={"ml"}>ml</option>
                  <option value={"cube"}>cube</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>Ingredient</Form.Label>
                <Form.Select
                  type="text"
                  value={formData.ingredients[2].name}
                  onChange={(e) =>
                    setField("ingredients[2].name", e.target.value)
                  }
                >
                  <option value="" disabled>
                    Select an ingredient
                  </option>
                  {props.ingredientsList.map((ingredient) => (
                    <option key={ingredient.id} value={ingredient.name}>
                      {ingredient.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="number"
                  value={formData.ingredients[2].amount}
                  onChange={(e) =>
                    setField("ingredients[2].amount", e.target.value)
                  }
                />
              </Form.Group>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>Unit</Form.Label>
                <Form.Select
                  value={formData.ingredients[2].unit}
                  onChange={(e) =>
                    setField("ingredients[2].unit", e.target.value)
                  }
                >
                  <option value="" disabled>
                    Unit
                  </option>
                  <option value={"g"}>g</option>
                  <option value={"špetka"}>špetka</option>
                  <option value={"lžička"}>lžička</option>
                  <option value={"ml"}>ml</option>
                  <option value={"cube"}>cube</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>Ingredient</Form.Label>
                <Form.Select
                  type="text"
                  value={formData.ingredients[3].name}
                  onChange={(e) =>
                    setField("ingredients[3].name", e.target.value)
                  }
                >
                  <option value="" disabled>
                    Select an ingredient
                  </option>
                  {props.ingredientsList.map((ingredient) => (
                    <option key={ingredient.id} value={ingredient.name}>
                      {ingredient.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="number"
                  value={formData.ingredients[3].amount}
                  onChange={(e) =>
                    setField("ingredients[3].amount", e.target.value)
                  }
                />
              </Form.Group>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>Unit</Form.Label>
                <Form.Select
                  value={formData.ingredients[3].unit}
                  onChange={(e) =>
                    setField("ingredients[3].unit", e.target.value)
                  }
                >
                  <option value="" disabled>
                    Unit
                  </option>
                  <option value={"g"}>g</option>
                  <option value={"špetka"}>špetka</option>
                  <option value={"lžička"}>lžička</option>
                  <option value={"ml"}>ml</option>
                  <option value={"cube"}>cube</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>Ingredient</Form.Label>
                <Form.Select
                  type="text"
                  value={formData.ingredients[4].name}
                  onChange={(e) =>
                    setField("ingredients[4].name", e.target.value)
                  }
                >
                  <option value="" disabled>
                    Select an ingredient
                  </option>
                  {props.ingredientsList.map((ingredient) => (
                    <option key={ingredient.id} value={ingredient.name}>
                      {ingredient.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="number"
                  value={formData.ingredients[4].amount}
                  onChange={(e) =>
                    setField("ingredients[4].amount", e.target.value)
                  }
                />
              </Form.Group>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>Unit</Form.Label>
                <Form.Select
                  value={formData.ingredients[4].unit}
                  onChange={(e) =>
                    setField("ingredients[4].unit", e.target.value)
                  }
                >
                  <option value="" disabled>
                    Unit
                  </option>
                  <option value={"g"}>g</option>
                  <option value={"špetka"}>špetka</option>
                  <option value={"lžička"}>lžička</option>
                  <option value={"ml"}>ml</option>
                  <option value={"cube"}>cube</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>Ingredient</Form.Label>
                <Form.Select
                  type="text"
                  value={formData.ingredients[5].name}
                  onChange={(e) =>
                    setField("ingredients[5].name", e.target.value)
                  }
                >
                  <option value="" disabled>
                    Select an ingredient
                  </option>
                  {props.ingredientsList.map((ingredient) => (
                    <option key={ingredient.id} value={ingredient.name}>
                      {ingredient.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="number"
                  value={formData.ingredients[5].amount}
                  onChange={(e) =>
                    setField("ingredients[5].amount", e.target.value)
                  }
                />
              </Form.Group>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>Unit</Form.Label>
                <Form.Select
                  value={formData.ingredients[5].unit}
                  onChange={(e) =>
                    setField("ingredients[5].unit", e.target.value)
                  }
                >
                  <option value="" disabled>
                    Unit
                  </option>
                  <option value={"g"}>g</option>
                  <option value={"špetka"}>špetka</option>
                  <option value={"lžička"}>lžička</option>
                  <option value={"ml"}>ml</option>
                  <option value={"cube"}>cube</option>
                </Form.Select>
              </Form.Group>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex flex-row justify-content-between align-items-center w-100">
              <div className="d-flex flex-row gap-2">
                <Button
                  variant="secondary"
                  onClick={() => setEditRecipeForm(false)}
                >
                  Close
                </Button>
                <Button variant="primary" type="submit">
                  Create
                </Button>
              </div>
            </div>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default Drink;
