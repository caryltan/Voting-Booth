//Modules
import { auth } from "../utils/firebase";
import Swal from "sweetalert2";
import { ref, onValue, remove } from "firebase/database";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";
//Components
import CreatePoll from "./CreatePoll";
//Assets
import Relax from "../assets/relax.png";

const FindPoll = () => {
  //defining State
  const [pollData, setPollData] = useState([]);
  const [dbState, setDbState] = useState();
  // Firebase Connection
  useEffect(() => {
    const dbRef = ref(auth);
    setDbState(auth);

    onValue(dbRef, (response) => {
      const newState = [];
      const dataResponse = response.val();

      for (let key in dataResponse) {
        newState.push({ key: key, poll: dataResponse[key] });
      }
      setPollData(newState);
    }
    )
  }, []);

  //function to delete polls from page and firebase
  const deleteFunction = (key) => {
    const keyRef = ref(dbState, `/${key}`);
    //alert to ask for confirmation before poll deletion 
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        //alert to confirm poll is deleted
        Swal.fire(
          "Deleted!",
          "Your file has been deleted.",
          "success"
        )
        //removal from firebase
        remove(keyRef);
      }
    });
  };

  const changeBackgroundBlue = (e) => {
    e.target.style.background = '#0043bf';
  }

  const revertBackgroundBlue = (e) => {
    e.target.style.background = '#0057fc';
  }

  const changeBackground = (e) => {
    e.target.style.color = '#0043bf';
  }

  const revertBackground = (e) => {
    e.target.style.color = '#333333';
  }

  return (
    <>
      <section className="find-poll-section">
        <h2>Find a Poll</h2>
        {[...pollData].reverse().map((poll) => {
          return (
            <div className="find-poll-container" key={poll.key}>
              <div className="h3-container">
                <h3>{poll.poll.pollQuestion}</h3>
              </div>
              <div className="find-poll-links">
                <Link
                  className="button primary"
                  to={`/votingbooth/${poll.key}`}
                  onMouseOver={changeBackgroundBlue}
                  onMouseLeave={revertBackgroundBlue}
                >
                  Vote
                </Link>
                <Link
                  className="button secondary"
                  to={`/results/${poll.key}`}
                  onMouseOver={changeBackground}
                  onMouseLeave={revertBackground}
                >
                  See Results Only
                </Link>
              </div>
              <button
                className="delete-button"
                onClick={() => deleteFunction(poll.key)}>
                <FaTimesCircle className="delete-button-icon" aria-label="Delete Poll" />
              </button>
            </div>
          );
        })}
      </section>
      <div className="bottom-graphic">
        <h3>You scrolled to the bottom!</h3>
        <div className="find-poll-img">
          <img src={Relax} alt="A person relaxing in a chair with their laptop" />
        </div>
        <Link
          to={`/createpoll`}
          element={<CreatePoll />}
          className="button primary"
          onMouseOver={changeBackgroundBlue}
          onMouseLeave={revertBackgroundBlue}
        >
          Create A Poll
        </Link>
      </div>
    </>
  );
};

export default FindPoll;