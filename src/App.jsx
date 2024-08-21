import "./App.css";
import Login from "/src/components/Login.jsx";
import Home from "/src/components/Home";
import New from "./components/New.jsx";
import SHOW from "./components/SHOW.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import React, { useState } from "react";
import { UserProvider } from "./components/user_context/UserContext.jsx";
// import { useCookies } from 'react-cookie'

function App() {
  // const [cookies, setCookie] = useCookies('user')

  // function handlelogIn(user){
  //   setCookie('user', user, {path : "/"})
  // }

  // const [username, setUsername] = useState("");

  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/NEW" element={<New />} />
          <Route path="/SHOW" element={<SHOW />} />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
