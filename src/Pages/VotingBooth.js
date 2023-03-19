// Modules
import * as React from "react"
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { ref, onValue, update, get } from "firebase/database";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
//Components
import { auth } from "../utils/firebase";
import VotingConfirmation from "../Components/VotingConfirmation";
//Assets
import votingImage from "../assets/voting-booth.png"

const VotingBooth = () => {
  //defining State
  const [pollData, setPollData] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { boothID } = useParams();
  const [getID, setGetID] = useState();

  //firebase connection
  useEffect(() => {
    const queryParameters = window.location.href.split('/');
    const lastSegment = queryParameters.pop()
    const dbRef = ref(auth, lastSegment);
    onValue(dbRef, (response) => {
      const dataResponse = response.val();
      setPollData(dataResponse);
    })
  }, []);

  // function to record vote submitted on button submit
  const handleSubmitVote = (e) => {
    e.preventDefault();

    const queryParameters = window.location.href.split('/');
    const lastSegment = queryParameters.pop();
    const dbRef = ref(auth, lastSegment);

    get(dbRef).then((snapshot) => {
      const fullPollData = snapshot.val().pollOptions;
      fullPollData.map((pollOption, index) => {
        if (getID == index) {
          pollOption.votes = pollOption.votes + 1
          update(dbRef, {
            [`pollOptions/${index}/votes`]: pollOption.votes
          });
          setIsSubmitted(true);
        } else if (getID == null) {
          Swal.fire({
            icon: "warning",
            title: "Oops...",
            text: "You must select a vote!"
          });
          setIsSubmitted(false);
          return;
        }
      })
    })
  };

  //function to discern poll option value choices on event
  const onChangeValue = (e) => {
    setGetID(e.target.id);
  };

  // function to handle copy link to clipboard
  const clickHandler = (e) => {
    e.preventDefault();
    const queryParameters = window.location.href.split('/');
    const lastSegment = queryParameters.pop()
    navigator.clipboard.writeText(`whatever-floats-your-vote.netlify.app/votingbooth/${lastSegment}`)
    //alert when link is copied to clipboard
    Swal.fire({
      icon: "success",
      text: "Link copied!",
      showConfirmButton: false,
      timer: 1500
    });
    setIsSubmitted(false);
    return;
  }

  return (
    <>
      {isSubmitted ?
        <VotingConfirmation /> :
        <>
          <div className="voting-booth-container">
            <img src={votingImage} alt="Group of people voting digitally on a monitor" />
            <div className="voting-question">
              <h2>Question <span className="poll-heading">{pollData && pollData.pollQuestion}</span></h2>
            </div>

            <form onSubmit={(e) => { handleSubmitVote(e) }}>

              <div className="selection-container">
                <fieldset onChange={onChangeValue}>
                  {pollData.pollOptions &&
                    pollData.pollOptions.map((poll, index) => {
                      console.log(index)
                      return (
                        <div>
                          <input type="radio" name="choice" id={index}value={poll.pollOption} key={index}/>
                          <label htmlFor={poll.pollOption}>{poll.pollOption}</label>
                        </div>
                      )
                    })
                  }
                </fieldset>
              </div>

              <div className="button-container">
                <button className="button primary" type="submit">Submit</button>
                <div className="secondary-buttons">
                  <button className="button secondary" aria-label="Copy poll link to keyboard." value="Copy" onClick={(e) => { clickHandler(e) }}>Copy Poll Link</button>
                  <Link className="button secondary" to={`/results/${boothID}`}>See Results Only</Link>
                </div>
              </div>
            </form>
          </div>
        </>
      }
    </>
  )
}

export default VotingBooth;