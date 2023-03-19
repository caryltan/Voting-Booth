//Modules
import { auth } from "../utils/firebase";
import { get, ref } from "firebase/database";
import { useEffect, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const ResultsBar = () => {
  const { boothID } = useParams();

  //defining State
  const [pollQuestion, setPollQuestion] = useState("");
  const [totalVotes, setTotalVotes] = useState(0);
  const [pollOptions, setPollOptions] = useState([]);


  useEffect(() => {
    getDatabase().then((snapshot) => {
      const voteValues = [];
      let newArray = [];
      setPollQuestion(snapshot.val().pollQuestion);
      newArray.push(snapshot.val().pollOptions);
      if (newArray[0]) {
        newArray[0].map((poll) => {
          voteValues.push(poll.votes);
          console.log(voteValues)
          poll.percentage = 0;
        })
        let sum = 0;
        voteValues.forEach((vote) => {
          sum += vote;
        })

        voteValues.forEach((vote, index) => {
          if (vote > 0) {
            newArray[0][index].percentage = Math.floor((vote / sum) * 100);
          }
        })
        if (sum === 0) {
          Swal.fire("No votes yet!");
        }
        setTotalVotes(sum);
        setPollOptions(newArray[0])
      }
      console.log(totalVotes);
    })

  }, [totalVotes]);

  async function getDatabase() {
    const dbRef = ref(auth, `/${boothID}`);
    const snapshot = await get(dbRef);
    return snapshot;
  }

  // get(dbRef).then((snapshot) => {
  //   if (snapshot.exists()) {
  //     setPollQuestion(snapshot.val().pollQuestion);
  //     setPollOptions(snapshot.val().pollOptions)
  // setOptionOneDescription(snapshot.val().pollOptionOne.optionOneDescription);
  // setVotesOne(snapshot.val().pollOptionOne.votes);
  // setOptionTwoDescription(snapshot.val().pollOptionTwo.optionTwoDescription);
  // setVotesTwo(snapshot.val().pollOptionTwo.votes);
  // setTotalVotes(snapshot.val().totalVotes);

  //function to calculate % of votes
  //     const voteCounting = function getPercentA(x, y) {
  //       if (!isNaN(x, y)) {
  //         return Math.round((x / (x + y)) * 100);
  //       }
  //     };
  //     //ensuring vote one or two has data before passing into useState
  //     const voteCalc = voteCounting(votesOne, votesTwo);
  //     const voteTwoCalc = voteCounting(votesTwo, votesOne);
  //     if (voteCalc >= 1 || voteTwoCalc >= 1) {
  //       setVoteOnePercent(voteCalc, voteTwoCalc);
  //       setVoteTwoPercent(voteTwoCalc, voteCalc);
  //     } else if (votesOne === 0 && votesTwo === 0) {
  //       //error alert if total votes are 0
  //       Swal.fire("No votes yet!");
  //     } else {
  //       setVoteOnePercent(0);
  //       setVoteTwoPercent(0);
  //     }

  //     //if snapshot does not exist:
  //   } else {
  //     Swal.fire("No data available");
  //   }
  // }).catch(() => {
  //   Swal.fire("Sorry, an error has occurred.");
  // });

  return (
    <>
      <h2 className="results-bar-h2"><span>Poll Question:</span> {pollQuestion}</h2>

        <h3 className="results-bar-h3">Total Votes: {totalVotes}</h3>      

      <section className="progress-bars-container">
        {pollOptions &&
          pollOptions.map((poll) => {
            return (
              <>
                <h2>{poll.pollOption}</h2>
                <h3>Votes: {poll.votes}</h3>
                <ProgressBar completed={poll.percentage} bgColor="#E54F6D" />
              </>
            )
          })
        }
      </section>
    </>
  );
};

export default ResultsBar;

// Progress bar courtesy of
// https://dev.to/ramonak/react-how-to-create-a-custom-progress-bar-component-in-5-minutes-2lcl