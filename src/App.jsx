import { useState } from "react";
import Forms from "./layouts/forms";
import Home from "./pages/Home";
import { BrowserRouter, BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";
function App() {
  const label = ["Username", "Password"];
  const types = ["text", "password"];
  return (
    <>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      {/* <Forms labels={label} types={types} action={"Login"} title={"Login"} /> */}
    </>
  );
}

export default App;
