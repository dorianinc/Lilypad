import logo from "../../../assets/images/logo.png"
import "./LogoButton.css"

function LogoButton() {
  
    return (
      <div className="logoContainer">
          <img className ="logo" alt="airBnB" style={{height: 35, width: 40}} src={logo}/>
          <p className="title">airbnb</p>
      </div>
    );
  }
  
  export default LogoButton;
  