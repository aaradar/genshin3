//import { useState } from "react";
import { SumeruBackground } from "./SumeruBackground";
import NavBar from "../../navigation/NavBar";

function Sumeru() {
  return (
    <div>
      <NavBar />
      <div>
        <header>
          <h1>Zhongli Piano</h1>
        </header>
        <div>
          <SumeruBackground />
        </div>
      </div>
    </div>
  );
}

export default Sumeru;
