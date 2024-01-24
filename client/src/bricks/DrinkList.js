import React from "react";
import Drink from "./Drink";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Icon from "@mdi/react";
import { useState, useMemo } from "react";
import { mdiTable, mdiViewGridOutline, mdiMagnify } from "@mdi/js";

function DrinkList(props) {
  const [searchBy, setSearchBy] = useState("");

  //definuje proměnnou filteredDrinkList, tedy ty recepty, které uživatel vyhledává v searchbaru (pokud nevyhledává nic, definuje je jako všechny recepty)
  const filteredDrinkList = useMemo(() => {
    return props.drinkList.filter((item) => {
      return (
        item.name.toLocaleLowerCase().includes(searchBy.toLocaleLowerCase()) ||
        item.description
          .toLocaleLowerCase()
          .includes(searchBy.toLocaleLowerCase())
      );
    });
  }, [searchBy]);

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
          <div>
            <Form className="d-flex" onSubmit={handleSearch}>
              <Button>Create recipe</Button>
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
    </div>
  );
}

export default DrinkList;
