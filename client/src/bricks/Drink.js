import React, { useState, useRef } from "react";
import Card from "react-bootstrap/Card"; // import komponenty Card
import "primeicons/primeicons.css";
import Icon from "@mdi/react"; // komponenta, kterou budeme používat pro zobrazení ikony
import { mdiDelete, mdiGlassCocktail, mdiPencilOutline } from "@mdi/js"; // ikony, které chceme využít
import CardFooter from "react-bootstrap/esm/CardFooter";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import CardHeader from "react-bootstrap/esm/CardHeader";
import "../App.css";
import Form from "react-bootstrap/Form";
import { Dialog } from "primereact/dialog";
import "primereact/resources/themes/saga-blue/theme.css"; // Replace with your chosen theme
import "primereact/resources/primereact.min.css";
import { Modal } from "react-bootstrap";
import { Row } from "react-bootstrap";
import Col from "react-bootstrap/esm/Col";
import { Toast } from "primereact/toast";

function Drink(props) {
  const [deleteRecipeDialog, setDeleteRecipeDialog] = useState(false);
  const [editRecipeForm, setEditRecipeForm] = useState(false);
  const [validated, setValidated] = useState(false);
  const [drinkDetail, setDrinkDetail] = useState(false);
  const [counter, setCounter] = useState(1);
  const toast = useRef(null);
  const [ingredientsList, setIngredientsList] = useState([]);
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: props.drink.name,
    author: props.drink.author,
    type: props.drink.type,
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
    // edit call:
    fetch(`http://localhost:3001/api/drinks/${props.drink.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToServer),
    }).then(async (response) => {
      console.log(response.status);
      /// const newRecipe = await response.json();
    });
    setEditRecipeForm(false);
  };

  const handleClose = (event) => {
    event.preventDefault();
    setEditRecipeForm(false);
  };

  function handleDelete(recipeID) {
    setDeleteRecipeDialog(false);
    return fetch(`http://localhost:3001/api/drinks/${recipeID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (response) => {
      switch (response.status) {
        case 204: {
          toast.current.show({
            severity: "success",
            summary: "OK",
            detail: `Recipe succesfully deleted`,
            life: 3000,
          });

          break;
        }
        case 404: {
          toast.current.show({
            severity: "danger",
            summary: "Fail",
            detail: `Recipe not found`,
            life: 3000,
          });
          break;
        }
        default: {
          toast.current.show({
            severity: "danger",
            summary: "Error",
            detail: `Error`,
            life: 3000,
          });
        }
      }

      window.location.reload();
    });
  }

  const openEditRecipeForm = () => {
    const ingredientsList = props.ingredientsList;
    setIngredientsList(ingredientsList);
    setEditRecipeForm(true);
  };

  const deleteRecipeDialogFooter = (
    <React.Fragment>
      <Button
        onClick={() => setDeleteRecipeDialog(false)}
        style={{ marginRight: "10px", borderRadius: "5px" }}
        severity="secondary"
      >
        No
      </Button>
      <Button
        severity="danger"
        onClick={() => handleDelete(props.drink.id)}
        style={{ marginRight: "10px", borderRadius: "5px" }}
      >
        Yes
      </Button>
    </React.Fragment>
  );

  const renderIngredients = (number) => {
    const ingredientsJSX = [];

    for (let i = 0; i < 6; i++) {
      if (props.drink.ingredients[i].name !== "") {
        ingredientsJSX.push(
          <div key={i}>
            {props.drink.ingredients[i].name}
            {"      "}
            {number * props.drink.ingredients[i].amount}{" "}
            {props.drink.ingredients[i].unit}
          </div>
        );
      }
    }

    return ingredientsJSX;
  };

  const incrementCounter = () => {
    setCounter(counter + 1);
  };

  const decrementCounter = () => {
    if (counter > 0) {
      setCounter(counter - 1);
    }
  };

  return (
    <div>
      <Toast ref={toast} />
      <div>
        <Card
          style={{
            margin: "10px",
            minWidth: "250px",
            maxWidth: "350px",
            height: "300px",
            borderColor: "black",
            borderWidth: 3,
            borderRadius: 10,
          }}
          className="bg-light"
        >
          <CardHeader
            style={{
              display: "flex",
              justifyContent: "space-between", // Align items to the end
              alignItems: "center", // Align items vertically
              backgroundColor: "lightyellow",
            }}
          >
            <div
              style={{
                fontWeight: "bold",
                fontSize: "large",
              }}
            >
              <Icon path={mdiGlassCocktail} size={1} color="orange" />{" "}
              {props.drink.name}
            </div>

            <div style={{ display: "flex", gap: "5px" }}>
              <Button
                onClick={openEditRecipeForm}
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.5)",
                  border: "2px solid black",
                  borderRadius: "50%",
                  padding: "5px",
                  width: "30px",
                  height: "30px",
                  display: "flex",
                  alignItems: "center",
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
                }}
              >
                <Icon path={mdiDelete} size={0.8} color="red" />
              </Button>
            </div>
          </CardHeader>

          <Card.Body
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                style={{
                  fontStyle: "italic",
                  fontWeight: "bold",
                  marginBottom: "10px",
                  fontSize: "small",
                }}
              >
                {"Author: "} {props.drink.author}
              </div>
              <div
                style={{
                  fontStyle: "italic",
                  fontWeight: "bold",
                  marginBottom: "10px",
                  fontSize: "small",
                }}
              >
                {"Type: "} {props.drink.type}
              </div>
            </div>
            <div>{props.drink.procedure}</div>
          </Card.Body>
          <CardFooter
            style={{
              backgroundColor: "lightyellow",
            }}
          >
            <Button
              onClick={() => setDrinkDetail(true)}
              style={{
                borderRadius: "5px",
              }}
            >
              Read more
            </Button>
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
            <span>
              Do you really want to delete the recipe <b>{props.drink.name}</b>?
            </span>
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
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.name}
                  onChange={(e) => setField("name", e.target.value)}
                  maxLength={30}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Write from 1 to 25 characters
                </Form.Control.Feedback>

                <Row>
                  <Form.Group as={Col} className="mb-3">
                    <Form.Label>Author</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.author}
                      onChange={(e) => setField("author", e.target.value)}
                      maxLength={30}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Write from 1 to 25 characters
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} className="mb-3">
                    <Form.Label>Type</Form.Label>
                    <Form.Select
                      value={formData.type}
                      onChange={(e) => setField("type", e.target.value)}
                      required
                    >
                      <option value="" disabled>
                        Type
                      </option>
                      <option value={"short"}>short</option>
                      <option value={"long"}>long</option>
                    </Form.Select>
                  </Form.Group>
                </Row>
                <Form.Label>Procedure</Form.Label>
                <Form.Control
                  as="textarea"
                  type="text"
                  value={formData.procedure}
                  onChange={(e) => setField("procedure", e.target.value)}
                  maxLength={300}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Write from 1 to 25 characters
                </Form.Control.Feedback>
              </Form.Group>

              <Row>
                <Form.Group as={Col}>
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
                    {ingredientsList.map((ingredient) => (
                      <option key={ingredient.id} value={ingredient.name}>
                        {ingredient.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col}>
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
                <Form.Group as={Col}>
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
                    <option value={"pinch"}>pinch</option>
                    <option value={"teaspoon"}>teaspoon</option>
                    <option value={"ml"}>ml</option>
                    <option value={"cube"}>cube</option>
                  </Form.Select>
                </Form.Group>
              </Row>

              <Row>
                <Form.Group as={Col}>
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
                    {ingredientsList.map((ingredient) => (
                      <option key={ingredient.id} value={ingredient.name}>
                        {ingredient.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col}>
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
                <Form.Group as={Col}>
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
                    <option value={"pinch"}>pinch</option>
                    <option value={"teaspoon"}>teaspoon</option>
                    <option value={"ml"}>ml</option>
                    <option value={"cube"}>cube</option>
                  </Form.Select>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col}>
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
                    {ingredientsList.map((ingredient) => (
                      <option key={ingredient.id} value={ingredient.name}>
                        {ingredient.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.ingredients[2].amount}
                    onChange={(e) =>
                      setField("ingredients[2].amount", e.target.value)
                    }
                  />
                </Form.Group>
                <Form.Group as={Col}>
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
                    <option value={"pinch"}>pinch</option>
                    <option value={"teaspoon"}>teaspoon</option>
                    <option value={"ml"}>ml</option>
                    <option value={"cube"}>cube</option>
                  </Form.Select>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col}>
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
                    {ingredientsList.map((ingredient) => (
                      <option key={ingredient.id} value={ingredient.name}>
                        {ingredient.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.ingredients[3].amount}
                    onChange={(e) =>
                      setField("ingredients[3].amount", e.target.value)
                    }
                  />
                </Form.Group>
                <Form.Group as={Col}>
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
                    <option value={"pinch"}>pinch</option>
                    <option value={"teaspoon"}>teaspoon</option>
                    <option value={"ml"}>ml</option>
                    <option value={"cube"}>cube</option>
                  </Form.Select>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col}>
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
                    {ingredientsList.map((ingredient) => (
                      <option key={ingredient.id} value={ingredient.name}>
                        {ingredient.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.ingredients[4].amount}
                    onChange={(e) =>
                      setField("ingredients[4].amount", e.target.value)
                    }
                  />
                </Form.Group>
                <Form.Group as={Col}>
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
                    <option value={"pinch"}>pinch</option>
                    <option value={"teaspoon"}>teaspoon</option>
                    <option value={"ml"}>ml</option>
                    <option value={"cube"}>cube</option>
                  </Form.Select>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col}>
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
                    {ingredientsList.map((ingredient) => (
                      <option key={ingredient.id} value={ingredient.name}>
                        {ingredient.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.ingredients[5].amount}
                    onChange={(e) =>
                      setField("ingredients[5].amount", e.target.value)
                    }
                  />
                </Form.Group>
                <Form.Group as={Col}>
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
                    <option value={"pinch"}>pinch</option>
                    <option value={"teaspoon"}>teaspoon</option>
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
                    severity="secondary"
                    onClick={handleClose}
                    style={{ borderRadius: "5px" }}
                  >
                    Close
                  </Button>
                  <Button
                    severity="success"
                    type="submit"
                    style={{ borderRadius: "5px" }}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            </Modal.Footer>
          </Form>
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
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>
                <span style={{ fontWeight: "bold" }}>Author: </span>{" "}
                <span>{props.drink.author}</span>
              </span>

              <span style={{ marginRight: "150px" }}>
                <span style={{ fontWeight: "bold" }}>Type: </span>
                <span>{props.drink.type}</span>
              </span>
            </div>
            <br></br>
            <span style={{ fontWeight: "bold" }}>Procedure: </span>{" "}
            <span>{props.drink.procedure}</span>
            <br></br>
            <br></br>
            <div style={{ fontWeight: "bold" }}>
              Ingredients for {counter}{" "}
              <span>
                <Button
                  icon="pi pi-plus"
                  style={{
                    height: "25px",
                    width: "30px",
                    marginRight: "5px",
                    alignItems: "center",
                  }}
                  onClick={incrementCounter}
                ></Button>
                <Button
                  icon="pi pi-minus"
                  style={{
                    height: "25px",
                    width: "30px",
                    alignItems: "center",
                    marginRight: "5px",
                  }}
                  onClick={decrementCounter}
                ></Button>
              </span>
              drinks:
            </div>
            <div></div>
            {renderIngredients(counter)}
          </div>
        </Dialog>
      </div>
    </div>
  );
}

export default Drink;
