import { Outlet, useNavigate } from "react-router-dom";
import "./App.css";
import DrinkList from "./bricks/DrinkList";
import Headline from "./bricks/Headline";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Offcanvas from "react-bootstrap/Offcanvas";

const drinkList = [
  {
    author: "Vlado Gurčo",
    name: "Bloody Marry",
    description:
      "Tenndus anmremainnining sker including versions of Lorem Ipsum",
    id: "8fd09f3f5e2b4l23",
  },
  {
    author: "Slender Man",
    name: "Bloody Marry",
    description:
      "Tento recept pochází z daléke Indie em Ipsum has been the industry's",
    id: "8fdq9f3f5e2b4324",
  },
  {
    author: "Slender Man",
    name: "Bloody Marry",
    description:
      "Tand scramblep publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    id: "8fd09f3f5emb4324",
  },
  {
    author: "Slender Man",
    name: "Bloody Marry",
    description:
      "Tento recept pochází z daléke Indie em Ipsum has been the industry's s",
    id: "8fd09y3f5e2b4324",
  },
  {
    author: "Slender Man",
    name: "Bloody Marry",
    description:
      "Tento recept pochází z daléke Indie em Ipsum has been the industry's standard dummy te",
    id: "8fd09n3f5e2b4324",
  },
  {
    author: "Slender Man",
    name: "Bloody Marry",
    description: "Tento recept pe 1500s, psum",
    id: "8fd09f3fte2b4324",
  },
  {
    author: "Slender Man",
    name: "Bloody Marry",
    description: "Tento rons of Lorem Ipsum",
    id: "8fd0ef3f5e2b4324",
  },
  {
    author: "Slender Man",
    name: "Bloody Marry",
    description: "Tento recept pochází z daléke Ike a tyt of Lorem Ipsum",
    id: "8fd09f3fae2b4324",
  },
  {
    author: "Slender Man",
    name: "Bloody Marry",
    description: "Tento recept pochází z daléke Iversions of Lorem Ipsum",
    id: "8fd09f3f5e2b2324",
  },
  {
    author: "Vlado Gurčo",
    name: "Great Marry",
    description:
      "Tento pri publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    id: "8fd09f3f5e2b4322",
  },
  {
    author: "Vlado Gurčo",
    name: "Great Marradith",
    description: "Tento a gaf Lorem Ipsum",
    id: "8fd09f3f5e2b4321",
  },
  {
    author: "Vlado Gurčo",
    name: "Flex Marradith",
    description:
      "Tento recept pocháver since the 1500s, whenlike Aldus PageMaker including versions of Lorem Ipsum",
    id: "8fd09f3f5e2b4326",
  },

  {
    author: "Vlado Gurčo",
    name: "Bloody Susan",
    description: "Tento recept pochk ap in of Lorem Ipsum",
    id: "8fd09f3f5e2b4327",
  },
  {
    author: "Vlado Gurčo",
    name: "Rainy day",
    description: "Tenons of Lorem Ipsum",
    id: "8fd09f3f5e2b4320",
  },
];

function App() {
  let navigate = useNavigate();
  return (
    <div className="App">
      <Navbar
        fixed="top"
        expand={"sm"}
        className="mb-3"
        bg="dark"
        variant="dark"
      >
        <Container fluid>
          <Navbar.Brand onClick={() => navigate("/home")}>
            The world n. 1 drink cookbook
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`} />
          <Navbar.Offcanvas id={`offcanvasNavbar-expand-sm`}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
                Drink cookbook
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link onClick={() => navigate("/home")}>Home</Nav.Link>
                <Nav.Link onClick={() => navigate("/drinklist")}>
                  Our drinks
                </Nav.Link>
                <Nav.Link onClick={() => navigate("/ingredients")}>
                  Ingredients
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

      <Outlet />
    </div>
  );
}

export default App;
