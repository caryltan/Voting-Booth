//Modules
import { Link } from "react-router-dom";
import {
  faCircle,
  faPencil,
  faSquarePollHorizontal,
  faShareNodes
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//Components
import CreatePoll from "./CreatePoll";
import FindPoll from "./FindPoll";
//Assets
import HomeGraphic from "../assets/device-connection.png";

const Home = () => {

  const changeBackground = (e) => {
    e.target.style.background = '#0043bf';
  }

  const revertBackground = (e) => {
    e.target.style.background = '#0057fc';
  }

  return (
    <>
      <header className="home-header">
        <div className="text-container">
          <h2>Voice your opinion with just one tap!</h2>
          <h4>Create Polls. Share. Discover. Participate.</h4>
          <Link
            to={`/createpoll`}
            element={<CreatePoll />}
            onMouseOver={changeBackground}
            onMouseLeave={revertBackground}
            className="button primary">
            Create a poll</Link>
        </div>
        <div className="image-container">
          <img src={HomeGraphic} alt="Group of people on various digital devices" />
        </div>
      </header>

      <section className="features-section">

        <div className="feature-item">
          <div className="icon-container">
            <div className="fa-layers fa-fw fa-lg">
              <FontAwesomeIcon
                icon={faCircle}
                style={{ color: '#0057fc' }}
                size="4x"
              />
              <FontAwesomeIcon
                icon={faPencil}
                style={{ color: 'white' }}
                size="4x"
                transform="shrink-9"
                inverse
              />
            </div>
          </div>
          <div className="text-container">
            <h3>Create</h3>
            <p>Create your own polls about those burning questions on your mind.</p>
          </div>
        </div>

        <div className="feature-item">
          <div className="icon-container">
            <div className="fa-layers fa-fw fa-lg">
              <FontAwesomeIcon
                icon={faCircle}
                style={{ color: '#FFDD0F' }}
                size="4x"
              />
              <FontAwesomeIcon
                icon={faSquarePollHorizontal}
                size="4x"
                style={{ color: 'white' }}
                transform="shrink-9 right-1"
                inverse />
            </div>
          </div>
          <div className="text-container">
            <h3>Vote</h3>
            <p>Look for polls, view results, and participate with your vote.</p>
          </div>
        </div>

        <div className="feature-item">
          <div className="icon-container">
            <div className="fa-layers fa-fw fa-lg">
              <FontAwesomeIcon
                icon={faCircle}
                style={{ color: '#FF1F25' }}
                size="4x"
              />
              <FontAwesomeIcon
                icon={faShareNodes}
                size="4x"
                style={{ color: 'white' }}
                transform="shrink-9 right-1"
                inverse />
            </div>
          </div>
          <div className="text-container">
            <h3>Share</h3>
            <p>Share your poll with friends and family to get their opinions.</p>
          </div>
        </div>
      </section>
      {/* <div className="header-h2">
        <h2>Whatever Floats Your Vote</h2>
      </div>
      <section className="home-section">
        <div className="home-graphic">
          <img src={HomeGraphic} alt="Illustration of people putting a ballot into a voting box." />
        </div>
        <div className="home-button-box">
          <Link to={`/createpoll`} element={<CreatePoll />} className="button primary"> Create A Poll</Link>
          <Link to={`/findpoll`} element={<FindPoll />} className="button secondary"> Find A Poll</Link>
        </div>
      </section> */}
    </>
  );
};

export default Home;