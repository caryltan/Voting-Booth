//Modules
import { Link } from "react-router-dom";
//Pages
import FindPoll from "../Pages/FindPoll";
import Home from "../Pages/Home";
import CreatePoll from "../Pages/CreatePoll";


const NavBar = () => {
  return (
    <div className="nav-bar">
      <div className="title-home">
        <Link className="menu-link" to={`/`} element={<Home />}> <h1>Whatever Floats Your Vote </h1> </Link>
      </div>
      <div className="create-find">
      <ul className="nav-ul" >
        <li>
          <Link className="menu-link" to={`/createpoll`} element={<CreatePoll />}> Create A Poll</Link>
        </li>
        <li> 
          <Link className="menu-link" to={`/findpoll`} element={<FindPoll />}> Find A Poll</Link>
        </li>
      </ul>
      </div>
    </div>
  );
};

export default NavBar;