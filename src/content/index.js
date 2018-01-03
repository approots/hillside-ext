import React from "react";
import { render } from "react-dom";
import App from "./components/app.js";

var root = document.getElementById("root");
var element = document.createElement("div");
root.insertBefore(element, root.firstChild);

render(<App />, element);
