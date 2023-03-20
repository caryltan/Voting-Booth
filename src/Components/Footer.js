import { Link } from "react-router-dom";
import Robot from "../assets/robot.png";
import CreatePoll from "../Pages/CreatePoll";
import FindPoll from "../Pages/FindPoll";

const Footer = () => {

  return (
    <footer>
      <div class="wrapper">
        <img src={Robot} alt="Friendly robot waving at you" />
        <section className="footer-top">
          <div className="footer-left">
            <h3>Whatever Floats <span>Your Vote</span></h3>
            <p>A web application to create polls, vote, and participate in previously created polls.</p>
          </div>
          <div className="footer-right">
            <div className="footer-column">
              <h4>Participate</h4>
              <ul>
                <li>
                  <Link
                    to={`/createpoll`}
                    element={<CreatePoll />}>
                    Create a Poll</Link>
                </li>
                <li>
                  <Link
                    to={`/findpoll`}
                    element={<FindPoll />}>
                    Find a Poll</Link>
                </li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>About</h4>
              <ul>
                <li>
                  <a href="https://github.com/caryltan">Github</a>
                </li>
                <li>
                  <a href="https://caryltan.com/">Portfolio Site</a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/caryl-tan/">Linkedin</a>
                </li>
              </ul>
            </div>
            <div className="footer-column right">
              <h4>Created by</h4>
              <p>© 2023 <a href="https://caryltan.com/">Caryl Tan</a>. All rights reserved</p>
            </div>
          </div>
        </section>

       

        <section className="footer-bottom">
          <hr />
          <p>
            Forked from original project created at<a href="https://junocollege.com/">Juno College </a>by
            <span>
              <a href="https://freemark.dev/">Fiona Freemark,</a>
              <a href="https://nobrayn.com/">Chris O'Bray,</a>
              <a href="https://elizabeth-reeves.ca/">Libby Reeves,</a>and
              <a href="https://caryltan.com/">Caryl Tan</a>©️ 2023
            </span>
          </p>
        </section>
      </div>
    </footer>
  );
};

export default Footer;