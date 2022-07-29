import { Navbar, Container, Nav } from "react-bootstrap";

export default function AdminNavBar() {
  return (
    <Navbar>
      <Container>
        <Navbar.Brand href="#home">IRM Admin</Navbar.Brand>
        <Navbar.Toggle />
        <Nav.Link onClick={() => (window.location.href = "/admin/workspace")}>
          Workspace
        </Nav.Link>
        <Nav.Link onClick={() => (window.location.href = "/admin/vehicles")}>
          Vehicles
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
