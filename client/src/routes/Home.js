import { Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Importujte styl Bootstrapu

function Home() {
  let navigate = useNavigate();

  const handleNavLinkClick = () => {
    navigate("/drinklist");
  };

  return (
    <div>
      Welcome to the n.1 drink cookbook on the planet. If you would like to get
      more information about any drink, feel free to follow here{" "}
      <Nav.Link
        onClick={handleNavLinkClick}
        onMouseEnter={(e) => e.target.classList.add("text-primary")} // Přidá třídu pro zvýraznění při najetí myší
        onMouseLeave={(e) => e.target.classList.remove("text-primary")} // Odebere třídu po opuštění myší
        style={{ textDecoration: "underline" }}
      >
        Our drinks
      </Nav.Link>
    </div>
  );
}

export default Home;
