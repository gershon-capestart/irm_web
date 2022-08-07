import React, { useState } from "react";
import axios from "axios";

import constants from "../constants";
import { Form, Button } from "react-bootstrap";

function Login() {
  // React States
  const [uname, setUname] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(uname);

    axios
      .get(`${constants.BASE_URL}/profile?empCode=${uname}`)
      .then(function (response) {
        console.log(response);
        let user = response.data.data;
        localStorage.setItem("employee_code", user.code);
        localStorage.setItem("name", user.name);
        localStorage.setItem("email", user.email);
        localStorage.setItem("designation", user.designation);
        alert(`welcome, ${user.name}`);
        window.location.href = "http://localhost:3000/workspace-booking";
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const renderForm = (
    <Form>
      <br></br>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control
          size="lg"
          type="password"
          placeholder=""
          onChange={(e) => setUname(e.target.value)}
        />
      </Form.Group>
      <Button
        style={{ marginTop: "16px" }}
        variant="primary"
        type="submit"
        size="lg"
        onClick={handleSubmit}
      >
        Proceed to Dashboard
      </Button>
    </Form>
  );

  return (
    <div className="container" style={{ width: "50%", padding: "8px" }}>
      <div
        className="shadow-lg p-3 mb-5 bg-white rounded"
        style={{ marginTop: "15%", padding: "5%" }}
      >
        <h1 style={{ marginTop: "16px" }}>Enter Employee id</h1>
        {renderForm}
      </div>
    </div>
  );
}

export default Login;
