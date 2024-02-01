import { Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap style

function Home() {
  let navigate = useNavigate();

  const handleNavLinkClick = () => {
    navigate("/drinklist");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start", // Adjusted to top-align content
        alignItems: "center",
        height: "100vh", // Full viewport height
        fontWeight: "bold",
        fontSize: "larger",
        paddingTop: "20vh", // Added margin-top to move the content to the top quarter
        // backgroundColor: "lightyellow",
        backgroundColor: "lightyellow",
      }}
    >
      <div>
        Welcome to the n.1 drink cookbook on the planet. If you would like to
        get more information about any drink, feel free to follow here{" "}
      </div>
      <br></br>
      <Nav.Link
        onClick={handleNavLinkClick}
        onMouseEnter={(e) => e.target.classList.add("text-primary")}
        onMouseLeave={(e) => e.target.classList.remove("text-primary")}
        style={{
          textDecoration: "underline",
          fontSize: "x-large",
        }}
      >
        Our Drinks
      </Nav.Link>
    </div>
  );
}

export default Home;
