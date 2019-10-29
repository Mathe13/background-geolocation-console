// @flow
import React from "react";

import { AppBar, Navigation, Link } from "react-toolbox";

import Styles from "../assets/styles/app.css";
import logo from "../assets/images/uergs-log.png";

const HeaderView = () => (
  <AppBar
    title="Monitor de Deslocamento Marítimo"
    className={Styles.uergsprimary}
    leftIcon="menu"
  >
    <Navigation type="horizontal">
      <Link href="http://uergs.com.br/guaiba/" label="">
        {/* <img className={Styles.logo} src={logo} />{" "} */}
      </Link>{" "}
    </Navigation>{" "}
  </AppBar>
);
export default HeaderView;
