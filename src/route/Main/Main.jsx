import React, {useEffect} from "react";
import Intro from "../../Component/Main/Intro/Intro.jsx";
import Contact from "../../Component/Main/Contact/Contact.jsx";
import Popol from "../../Component/Main/Popol/Popol.js";
import Force from "../../Component/Main/Force/Force.js";

function Main() {


  return (
    <>
      <Intro />
      <Force />
      <Popol />
      <Contact/>
    </>
  );
}

export default Main;