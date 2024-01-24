import React from "react";
import Card from "react-bootstrap/Card"; // import komponenty Card
import Icon from "@mdi/react"; // komponenta, kterou budeme používat pro zobrazení ikony
import { mdiAccountSchoolOutline, mdiGlassCocktail } from "@mdi/js"; // ikony, které chceme využít
import CardFooter from "react-bootstrap/esm/CardFooter";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";

function Drink(props) {
  let navigate = useNavigate();

  function handleOpen() {
    console.log("clicked");
    // to do

    navigate("/drinkDetail?id=" + props.id);
  }

  return (
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
      <Card.Body>
        <div style={{ fontWeight: "bold", fontSize: "large" }}>
          <Icon path={mdiGlassCocktail} size={1} color="grey" />{" "}
          {props.drink.name}
        </div>
        <div
          style={{
            fontStyle: "italic",
            marginBottom: "10px",
            fontSize: "small",
          }}
        >
          {"Author: "} {props.drink.author}
        </div>
        <div>{props.drink.description}</div>
      </Card.Body>
      <CardFooter>
        <Button onClick={handleOpen}>Open</Button>
      </CardFooter>
    </Card>
  );
}

export default Drink;
