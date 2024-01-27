import React, { useEffect } from "react";
import Drink from "./Drink";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Icon from "@mdi/react";
import { useState, useMemo } from "react";
import { mdiTable, mdiViewGridOutline, mdiMagnify } from "@mdi/js";
import { Col, Modal, Row } from "react-bootstrap";

function DrinkList() {
  const [createRecipeCall, setCreateRecipeCall] = useState({
    state: "pending",
    data: "",
  });
  const [validated, setValidated] = useState(false);
  const [searchBy, setSearchBy] = useState("");
  const [createRecipeForm, setCreateRecipeForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    author: "",
    procedure: "",
    ingredients: [
      {
        name: "",
        amount: "",
        unit: "",
      },
      {
        name: "",
        amount: "", // [1]
        unit: "",
      },
      {
        name: "",
        amount: "",
        unit: "",
      },
      {
        name: "",
        amount: "",
        unit: "",
      },
      {
        name: "",
        amount: "",
        unit: "",
      },
      {
        name: "",
        amount: "",
        unit: "",
      },
    ],
  });
  const [drinkList, setDrinkList] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/api/drinks/`, {
      method: "GET",
      //   headers: {
      //   "Content-Type": "application/json",
      //  },
    }).then(async (response) => {
      const serverDrinkList = await response.json();
      setDrinkList(serverDrinkList);
    });
  }, []);

  // setFormData vrací nově zadané hodnoty uvnitř formuláře. anonymní funkce, do které vstupují výchozí formData je poté pomocí const NewData obohacen o nový zápis do formuláře, a následně jsou tyto NewData vráceny do setForData statu...
  const setField = (name, val, index) => {
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

  function handleClose() {
    setCreateRecipeForm(false);
  }

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

    const res = await fetch(`http://localhost:3001/api/drinks/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToServer),
    }).then(async (response) => {
      const newDrinkList = [...drinkList];
      const newRecipe = await response.json();
      newDrinkList.push(newRecipe);
      setDrinkList(newDrinkList);
      console.log(newRecipe);
    });

    handleClose();
  };

  //definuje proměnnou filteredDrinkList, tedy ty recepty, které uživatel vyhledává v searchbaru (pokud nevyhledává nic, definuje je jako všechny recepty)
  const filteredDrinkList = useMemo(() => {
    return drinkList.filter((item) => {
      return (
        item.name.toLocaleLowerCase().includes(searchBy.toLocaleLowerCase()) ||
        item.procedure
          .toLocaleLowerCase()
          .includes(searchBy.toLocaleLowerCase())
      );
    });
  }, [searchBy, drinkList]);

  //vyhledávání (search bar)
  function handleSearch(searchData) {
    searchData.preventDefault();
    // = vezmi searchData, tedy všechno, co bylo zadáno do formuláře, zaměř se na searchInput (.target["searchInput"]) a vem jeho hodnotu (.value). Tu nastav jako setSeatchBy...
    setSearchBy(searchData.target["searchInput"].value);
  }
  //vyhledávání (search bar) 2
  function handleSearchDelete(event) {
    if (!event.target.value) setSearchBy("");
  }

  // funkce pro zobrazení receptů pomocí propsy drinkList (recepty z této proměnné ty zobrazí)
  function getDrinkList(drinkList) {
    return (
      <div class="row">
        {drinkList.map((drink) => {
          return (
            <div
              class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3"
              style={{ paddingBottom: "8px" }}
            >
              <Drink key={drink.id} drink={drink} />
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div>
      <Navbar bg="light">
        <div className="container-fluid">
          <Navbar.Brand>List of drinks</Navbar.Brand>
          <div className="d-flex gap-2">
            <Button onClick={() => setCreateRecipeForm(true)}>
              Create recipe
            </Button>
            <Form className="d-flex" onSubmit={handleSearch}>
              <Form.Control
                id={"searchInput"}
                style={{ maxWidth: "150px" }}
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={handleSearchDelete}
              />
              <Button
                style={{ marginRight: "8px" }}
                variant="outline-success"
                type="submit"
              >
                <Icon size={1} path={mdiMagnify} />
              </Button>
            </Form>
          </div>
        </div>
      </Navbar>

      {getDrinkList(filteredDrinkList)}

      <Modal
        show={createRecipeForm}
        onHide={() => setCreateRecipeForm(false)}
        size="lg"
      >
        <Form
          noValidate
          validated={validated}
          onSubmit={(e) => handleSubmit(e)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Create recipe</Modal.Title>
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
              <Form.Control.Feedback type="invalid">
                Write from 1 to 25 characters
              </Form.Control.Feedback>

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
              <Form.Label>Procedure</Form.Label>
              <Form.Control
                type="text"
                value={formData.procedure}
                onChange={(e) => setField("procedure", e.target.value)}
                maxLength={100}
                required
              />
              <Form.Control.Feedback type="invalid">
                Write from 1 to 25 characters
              </Form.Control.Feedback>
            </Form.Group>

            <Row>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>Ingredient</Form.Label>
                <Form.Select
                  type="text"
                  // value={formData.ingredients[0].name}
                  value="máslo"
                  onChange={(e) =>
                    setField("ingredients[1].name", e.target.value)
                  }
                  required
                >
                  <option value="máslo" disabled>
                    Ingredient
                  </option>
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
                </Form.Select>
              </Form.Group>
            </Row>

            <Row>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>Ingredient</Form.Label>
                <Form.Select
                  type="text"
                  // value={formData.ingredients[0].name}
                  value="máslo"
                  onChange={(e) =>
                    setField("ingredients[1].name", Number(e.target.value))
                  }
                  required
                >
                  <option value="máslo" disabled>
                    Ingredient
                  </option>
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
                </Form.Select>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>Ingredient</Form.Label>
                <Form.Select
                  type="text"
                  // value={formData.ingredients[0].name}
                  value="máslo"
                  onChange={(e) =>
                    setField("ingredients[1].name", Number(e.target.value))
                  }
                >
                  <option value="máslo" disabled>
                    Ingredient
                  </option>
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
                </Form.Select>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>Ingredient</Form.Label>
                <Form.Select
                  type="text"
                  // value={formData.ingredients[0].name}
                  value="máslo"
                  onChange={(e) =>
                    setField("ingredients[1].name", Number(e.target.value))
                  }
                >
                  <option value="máslo" disabled>
                    Ingredient
                  </option>
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
                </Form.Select>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>Ingredient</Form.Label>
                <Form.Select
                  type="text"
                  // value={formData.ingredients[0].name}
                  value="máslo"
                  onChange={(e) =>
                    setField("ingredients[1].name", Number(e.target.value))
                  }
                >
                  <option value="máslo" disabled>
                    Ingredient
                  </option>
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
                </Form.Select>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>Ingredient</Form.Label>
                <Form.Select
                  type="text"
                  // value={formData.ingredients[0].name}
                  value="máslo"
                  onChange={(e) =>
                    setField("ingredients[1].name", Number(e.target.value))
                  }
                >
                  <option value="máslo" disabled>
                    Ingredient
                  </option>
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
                </Form.Select>
              </Form.Group>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex flex-row justify-content-between align-items-center w-100">
              <div className="d-flex flex-row gap-2">
                <Button
                  variant="secondary"
                  onClick={() => setCreateRecipeForm(false)}
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

export default DrinkList;
