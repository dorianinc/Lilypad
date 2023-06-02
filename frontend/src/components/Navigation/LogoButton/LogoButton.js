import logo from "../../../assets/images/airDnD.png"
import "./LogoButton.css"

function LogoButton() {
    return (
      <div className="logoContainer">
          <img className ="logo" alt="airBnB"  src={logo}/>
          <p className="title">Xenios</p>
      </div>
    );
  }
  
  export default LogoButton;
  