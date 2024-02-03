import React, { useEffect, useRef } from "react";
import Drink from "./Drink";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "primereact/button";
import Form from "react-bootstrap/Form";
import Icon from "@mdi/react";
import { useState, useMemo } from "react";
import { mdiFilterMenuOutline, mdiMagnify } from "@mdi/js";
import { Col, Modal, Row } from "react-bootstrap";
import { Toast } from "primereact/toast";
import DrinkFormBody from "./DrinkFormBody";

function DrinkList() {
  const [filter, setFilter] = useState("");
  const [validated, setValidated] = useState(false);
  const [searchBy, setSearchBy] = useState("");
  const [createRecipeForm, setCreateRecipeForm] = useState(false);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [drinkList, setDrinkList] = useState([]);
  const toast = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    author: "",
    type: "",
    procedure: "",
    ingredients: [
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

  useEffect(() => {
    console.log("useEffect triggered");
    fetch(`http://localhost:3001/api/drinks/`, {
      method: "GET",
    })
      .then(async (response) => {
        const serverDrinkList = await response.json();
        switch (response.status) {
          case 200: {
            setDrinkList(serverDrinkList);

            break;
          }
          default: {
            toast.current.show({
              severity: "danger",
              summary: "Fail",
              detail: `Drinks were not uploaded`,
              life: 3000,
            });
          }
        }
      })
      .then(
        fetch(`http://localhost:3001/api/ingredients/`, {
          method: "GET",
        }).then(async (response) => {
          const serverIngredientList = await response.json();
          switch (response.status) {
            case 200: {
              setIngredientsList(serverIngredientList);

              break;
            }
            default: {
              toast.current.show({
                severity: "danger",
                summary: "Fail",
                detail: `Ingredients were not uploaded`,
                life: 3000,
              });
            }
          }
        })
      );
  }, []);
  // setFormData vrací nově zadané hodnoty uvnitř formuláře. anonymní funkce, do které vstupují výchozí formData je poté pomocí const NewData obohacen o nový zápis do formuláře, a následně jsou tyto NewData vráceny do setForData statu...
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

  const handleClose = () => {
    setCreateRecipeForm(false);
  };

  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    e.preventDefault();

    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
      return;
    }
    //data z vyplněného formuláře, která se odesílají na server
    const dataToServer = {
      ...formData,
    };

    await fetch(`http://localhost:3001/api/drinks/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToServer),
    }).then(async (response) => {
      switch (response.status) {
        case 201: {
          toast.current.show({
            severity: "success",
            summary: "OK",
            detail: `Recipe succesfully created`,
            life: 3000,
          });
          const newList = [...drinkList];
          newList.push(dataToServer);
          setDrinkList(newList);
          window.location.reload();
          break;
        }
        case 404: {
          toast.current.show({
            severity: "danger",
            summary: "Error",
            detail: `error 404`,
            life: 3000,
          });

          break;
        }
        default: {
          console.log(response.status);
          toast.current.show({
            severity: "danger",
            summary: "Fail",
            detail: `Error on the way`,
            life: 3000,
          });
        }
      }
    });
    setCreateRecipeForm(false);
  };
  //definuje proměnnou filteredDrinkList, tedy ty recepty, které uživatel vyhledává v searchbaru (pokud nevyhledává nic, definuje je jako všechny recepty)
  const filteredDrinkList = useMemo(() => {
    return drinkList.filter((item) => {
      // Existing conditions
      const existingConditions =
        item.name.toLowerCase().includes(searchBy.toLowerCase()) ||
        item.procedure.toLowerCase().includes(searchBy.toLowerCase());
      // New condition: Include if the filter is not an empty string and item.type matches filter
      const typeCondition = filter !== "" ? item.type === filter : true;
      // Return the result of combined conditions
      return existingConditions && typeCondition;
    });
  }, [searchBy, drinkList, filter]);

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
              style={{ padding: "8px" }}
            >
              <Drink
                key={drink.id}
                drink={drink}
                ingredientsList={ingredientsList}
              />
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div>
      <Toast ref={toast} />
      <div>
        <Navbar
          style={{
            backgroundColor: "lightyellow",
            gap: "5px",
          }}
          className="flex-md-row flex-column"
        >
          <Navbar.Brand
            style={{
              paddingLeft: "10px",
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginRight: "auto",
            }}
          >
            List of our drinks
          </Navbar.Brand>
          <Button
            severity="success"
            onClick={() => setCreateRecipeForm(true)}
            style={{ borderRadius: "5px", marginRight: "30px" }}
          >
            Create recipe
          </Button>
          <Form
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "5px",
              marginRight: "30px",
            }}
          >
            <Form.Select
              style={{ height: "42px" }}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              required
            >
              <option value="" disabled>
                All
              </option>
              <option value={""}>all</option>
              <option value={"short"}>short</option>
              <option value={"long"}>long</option>
            </Form.Select>
            <Icon path={mdiFilterMenuOutline} size={3} />
          </Form>
          <Form
            style={{ display: "flex", gap: "5px", marginRight: "30px" }}
            onSubmit={handleSearch}
          >
            <Form.Control
              id={"searchInput"}
              style={{ maxWidth: "150px" }}
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={handleSearchDelete}
            />
            <Button
              style={{ borderRadius: "5px" }}
              severity="success"
              type="submit"
            >
              <Icon size={1} path={mdiMagnify} />
            </Button>
          </Form>
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
            <DrinkFormBody
              formData={formData}
              ingredientsList={ingredientsList}
              setField={setField}
              closeFunction={handleClose}
              type={"Create"}
            />
          </Form>
        </Modal>
      </div>
    </div>
  );
}

export default DrinkList;
