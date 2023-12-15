import React, { useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";
import { Button, Form } from "react-bootstrap";
import SignUp from "./pages/signup";
import Home from "./pages/home";

const App = () => {
  const { hello } = useContext(UserContext);
  return (
    <Home/>
  );
};

export default App;
