//Modules
import { Link } from "react-router-dom";
//Assets
import ErrorGraphic from "../assets/404-error.png";

const ErrorPage = () => {
  return (
    <>
      <div className="error-container">
        <img src={ErrorGraphic} alt="404 error image. Astronaut lost in space!"/>
      </div>
      <h2 className="error-h2">Oh no! Page not found!</h2>
      <div className="error-btn">
        <Link to={`/`} className="button primary"> Home</Link>
      </div>
    </>
  );
};

export default ErrorPage;