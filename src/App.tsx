import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { ProjectListScreen } from "./screens/project-list/index";
import { LoginScreen } from "./screens/login/index";

function App() {
  return (
    <div className="App">
      {/* <ProjectListScreen /> */}
      <LoginScreen />
    </div>
  );
}

export default App;
