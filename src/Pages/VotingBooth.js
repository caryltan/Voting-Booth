// Modules
import * as React from "react"
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { getDatabase, ref, onValue, update, get } from "firebase/database";
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
  const [getValue, setGetValue] = useState();
  const [getVotes, setGetVotes] = useState();
  const [updatedPollData, setUpdatedPollData] = useState();

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
  function handleSubmitVote(e) {
    e.preventDefault();
    // setIsSubmitted(true);

    const queryParameters = window.location.href.split('/');
    const lastSegment = queryParameters.pop()
    const dbRef = ref(auth, lastSegment);
   
    get(dbRef).then((snapshot) => {
      const fullPollData = snapshot.val().pollOptions;
      fullPollData.map((pollOption, index) => {
          if (getValue === pollOption.pollOption){
            pollOption.votes = pollOption.votes + 1
            update(dbRef, {
              [`pollOptions/${index}/votes`]: pollOption.votes
            });
          }
        })
    })
    

    

    // }
    // if (getValue === "pollOptionOne") {
    //   votingObject.pollOptionOne.votes = votingObject.pollOptionOne.votes + 1;
    //   votingObject.totalVotes = votingObject.pollOptionOne.votes + votingObject.pollOptionTwo.votes;
    // } else if (getValue === "pollOptionTwo") {
    //   votingObject.pollOptionTwo.votes = votingObject.pollOptionTwo.votes + 1;
    //   votingObject.totalVotes = votingObject.pollOptionOne.votes + votingObject.pollOptionTwo.votes;
    // } else {
    // alert for user if no vote was submitted
    //   Swal.fire({
    //     icon: "warning",
    //     title: "Oops...",
    //     text: "You must choose an option, fence-sitter!"
    //   });
    //   //if error returns, isSubmitted state is false to prevent vote confirmation ternary
    //   setIsSubmitted(false);
    //   return;
    // }

    // reference database
   
    //update vote to firebase
    
  };

  //function to discern poll option value choices on event
  const onChangeValue = (e) => {
    setGetValue(e.target.value);
  };

  // function to handle copy link to clipboard
  const clickHandler = (e, poll) => {
    e.preventDefault();
    //copy url of voting booth
    navigator.clipboard.writeText(`whatever-floats-your-vote.netlify.app/votingbooth/${poll.key}`)
    //alert when link is copied to clipboard
    Swal.fire({
      icon: "success",
      text: "Link copied!",
      showConfirmButton: false,
      timer: 1500
    });
    //isSubmitted set to false to prevent ternary for vote confirmation component
    setIsSubmitted(false);
    return;
  }

  return (
    <>
      <div className="voting-question">
        <h2>Question <span className="poll-heading">{pollData && pollData.pollQuestion}</span></h2>
      </div>

      <form onSubmit={(e) => { handleSubmitVote(e) }}>

        <div className="selection-container">
          <fieldset onChange={onChangeValue}>
            {pollData.pollOptions &&
              pollData.pollOptions.map((poll) => {
                return (
                  <div>
                    <input type="radio" name="choice" value={poll.pollOption} />
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
    </>
  )
}


//   return (
//     <>
//       {isSubmitted ?
//         <VotingConfirmation boothID={boothID} /> :
//         <section className="voting-ticket">
//         </section>
//       }
//     </>
//   );
// };

export default VotingBooth;