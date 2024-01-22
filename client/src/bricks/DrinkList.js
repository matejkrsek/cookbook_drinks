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

  function handleSearch(searchData) {
    searchData.preventDefault();
    // = vezmi searchData, tedy všechno, co bylo zadáno do formuláře, zaměř se na searchInput (.target["searchInput"]) a vem jeho hodnotu (.value). Tu nastav jako setSeatchBy...
    setSearchBy(searchData.target["searchInput"].value);
  }

  function handleSearchDelete(event) {
    if (!event.target.value) setSearchBy("");
  }

  function getDrinkList(drinkList) {
    return drinkList.map((drink) => {
      return <Drink key={drink.id} drink={drink} />;
    });
  }

  return (
    <div>
      <Navbar bg="light">
        <div className="container-fluid">
          <Navbar.Brand>List of drinks</Navbar.Brand>
          <div>
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
      <div
        style={{
          display: "flex",
          flexWrap: "wrap", // Allow items to wrap to the next row
          margin: "0 auto",
          maxWidth: "80%",
          justifyContent: "space-evenly",
        }}
      >
        {getDrinkList(filteredDrinkList)}
      </div>
    </div>
  );
}

export default DrinkList;
