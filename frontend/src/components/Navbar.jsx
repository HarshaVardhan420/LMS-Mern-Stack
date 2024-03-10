import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "./assets/images/2072841.png";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


function NavbarMenu() {
  const isUserSignedIn = !!localStorage.getItem("token");
  const navigate = useNavigate();
    
  //const handlesignin = () => {
  //   localStorage.removeItem("token");
  //   navigate("/");
  // };
  
  return (
    <Navbar expand="lg" bg="success" data-bs-theme="dark">
      <Container fluid>
        <Link to="/">
          <Navbar.Brand>
            { <img
              src={logo}
              alt="logo picture"
              style={{ width: "50px", height: "50px" }}
            /> }
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          {isUserSignedIn ? (
            <>
              {/* <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Nav.Link href="#action1">Home</Nav.Link>
                <Nav.Link href="#action2">Link</Nav.Link>
                <NavDropdown title="Link" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown>
        
              </Nav> */}
              {/* <Form className="d-flex">
                <Button onClick={handlesignin}>Logout</Button>
              </Form> */}
            </>
          ) : (
            <>
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Nav.Link className="navitem">
                  <Link to="/"></Link>
                </Nav.Link>
                <Nav.Link className="navitem">
                  <Link to="/aboutus"></Link>
                </Nav.Link>
              </Nav>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarMenu;
