import React, { useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";
import { Button, Form } from "react-bootstrap";
import SignUp from "./pages/signup";

const App = () => {
  const { hello } = useContext(UserContext);
  return (
    <SignUp/>
  );
};

export default App;
