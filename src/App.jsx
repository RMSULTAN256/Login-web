import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./login"
import Home from "./home"
import PrivateRoute from "./pages/PrivateRoutes";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<PrivateRoute><Home /></PrivateRoute>} />
      </Routes>
    </Fragment>
  )
}

export default App;