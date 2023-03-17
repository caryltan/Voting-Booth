// Modules
import * as React from "react"
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { getDatabase, ref, onValue, update } from "firebase/database";
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

  //firebase connection
  useEffect(() => {
    const queryParameters = window.location.href.split('/');
    const lastSegment = queryParameters.pop()
    const dbRef = ref(auth, lastSegment);
    onValue(dbRef, (response) => {
      const newState = [];
      const dataResponse = response.val();
      // data is an object, so we iterate through it using a for in loop to access each voting booth
      // for (let key in dataResponse) {
      //   newState.push({ key: key, poll: dataResponse[key] });
      // }
      // setPollData(newState);
      // console.log(dataResponse)
      setPollData(dataResponse);
      console.log('sasa', dataResponse);
    })
  }, []);
  
  // function to record vote submitted on button submit
  function handleSubmitVote(e, poll) {
    e.preventDefault();
    //ternary to display vote confirmation component or poll options, set to true, to show vote confirmation
    setIsSubmitted(true);
    const votingObject = {
      ...poll.poll,
    };

    // conditional logic for tallying votes based on poll option selection 
    if (getValue === "pollOptionOne") {
      votingObject.pollOptionOne.votes = votingObject.pollOptionOne.votes + 1;
      votingObject.totalVotes = votingObject.pollOptionOne.votes + votingObject.pollOptionTwo.votes;
    } else if (getValue === "pollOptionTwo") {
      votingObject.pollOptionTwo.votes = votingObject.pollOptionTwo.votes + 1;
      votingObject.totalVotes = votingObject.pollOptionOne.votes + votingObject.pollOptionTwo.votes;
    } else {
      // alert for user if no vote was submitted
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "You must choose an option, fence-sitter!"
      });
      //if error returns, isSubmitted state is false to prevent vote confirmation ternary
      setIsSubmitted(false);
      return;
    }
    // reference database
    const database = getDatabase(auth);
    const dbRef = ref(auth, `/${poll.key}`);
    //update vote to firebase
    update(dbRef, votingObject);
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

  // console.log(pollData)
  // console.log(pollData[0].key)

//   return (
//     <>
//     {
//       pollData.map((poll) => {
//         return (
//           <>
//           <input type="radio" name="choice"/>
//           <label>{}</label>
          
//           </>
//         )
//       })
//     }
//     </>
//   )
// }


  return (
    <>
      {isSubmitted ?
        <VotingConfirmation boothID={boothID} /> :
        <section className="voting-ticket">
        </section>
      }
    </>
  );
};

export default VotingBooth;