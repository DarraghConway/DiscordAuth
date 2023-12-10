import React from "react";
import { Nav } from "react-bootstrap";

const Navigation = () => {
  return (
    <Nav>
      <Nav.Item>
        <Nav.Link href="#home">Home</Nav.Link>
      </Nav.Item>
      {/* Other Nav items */}
    </Nav>
  );
};

export default Navigation;
