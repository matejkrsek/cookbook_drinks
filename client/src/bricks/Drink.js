import React from "react";
import Card from "react-bootstrap/Card"; // import komponenty Card
import Icon from "@mdi/react"; // komponenta, kterou budeme používat pro zobrazení ikony
import { mdiAccountSchoolOutline, mdiGlassCocktail } from "@mdi/js"; // ikony, které chceme využít

function Drink(props) {
  return (
    <Card
      style={{
        width: "25%", // Set the fixed width of each drink item to 20%
        // Include padding and border in the width
        padding: "8px", // Add padding for better spacing
        boxSizing: "border-box",
        margin: "20px",
        maxHeight: "40vh", // Set the maximum height to 25% of the viewport height
        overflow: "hidden",
        minWidth: "250px",
        minHeight: "200px",
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
    </Card>
  );
}

export default Drink;
