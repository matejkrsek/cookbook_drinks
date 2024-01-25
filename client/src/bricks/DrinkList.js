import React, { useEffect } from "react";
import Drink from "./Drink";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Icon from "@mdi/react";
import { useState, useMemo } from "react";
import { mdiTable, mdiViewGridOutline, mdiMagnify } from "@mdi/js";
import { Col, Modal, Row } from "react-bootstrap";

function DrinkList(props) {
  const defaultForm = {
    name: "",
    author: "",
    description: "",
    ingredients: [],
  };

  const [searchBy, setSearchBy] = useState("");
  const [createRecipeForm, setCreateRecipeForm] = useState(false);
  const [formData, setFormData] = useState({
    defaultForm,
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
      console.log(serverDrinkList);
    });
  }, []);

  // setFormData vrací nově zadané hodnoty uvnitř formuláře. anonymní funkce, do které vstupují výchozí formData je poté pomocí const NewData obohacen o nový zápis do formuláře, a následně jsou tyto NewData vráceny do setForData statu...
  const setField = (name, val) => {
    return setFormData((formData) => {
      const newData = { ...formData };
      newData[name] = val;
      return newData;
    });
  };

  //definuje proměnnou filteredDrinkList, tedy ty recepty, které uživatel vyhledává v searchbaru (pokud nevyhledává nic, definuje je jako všechny recepty)
  const filteredDrinkList = useMemo(() => {
    return drinkList.filter((item) => {
      return (
        item.name.toLocaleLowerCase().includes(searchBy.toLocaleLowerCase()) ||
        item.description
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
        <Modal.Header closeButton>
          <Modal.Title>Create recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={formData.name}
              onChange={(e) => setField("description", e.target.value)}
              maxLength={25}
              required
            />
            <Form.Control.Feedback type="invalid">
              Write from 1 to 25 characters
            </Form.Control.Feedback>

            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              value={formData.author}
              onChange={(e) => setField("description", e.target.value)}
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
              onChange={(e) => setField("description", e.target.value)}
              maxLength={150}
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
                value={formData.weight}
                onChange={(e) => setField("weight", Number(e.target.value))}
                required
              >
                <option value="" disabled>
                  Ingredient
                </option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                value={formData.amount}
                onChange={(e) => setField("description", e.target.value)}
                maxLength={150}
                required
              />
            </Form.Group>
            <Form.Group as={Col} className="mb-3">
              <Form.Label>Unit</Form.Label>
              <Form.Select
                value={formData.unit}
                onChange={(e) => setField("weight", Number(e.target.value))}
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
      </Modal>
    </div>
  );
}

export default DrinkList;
