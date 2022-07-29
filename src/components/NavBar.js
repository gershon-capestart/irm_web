import { Navbar, Container, Nav } from "react-bootstrap";

export default function NavBar() {
  return (
    <Navbar>
      <Container>
        <Navbar.Brand href="#home">IRM</Navbar.Brand>
        <Navbar.Toggle />
        <Nav.Link onClick={() => (window.location.href = "/workspace-booking")}>
          Workspace Booking
        </Nav.Link>
        <Nav.Link onClick={() => (window.location.href = "/vehicles")}>
          Your Vehicles
        </Nav.Link>
        <Nav.Link onClick={() => (window.location.href = "/booking-history")}>
          Booking History
        </Nav.Link>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="#login">{localStorage.getItem("name")}</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
