//Modules
import { useParams, Link } from "react-router-dom";
//Assets
import votingConfirmationImg from "../assets/voting-confirmation.png";

const VotingConfirmation = () => {
  const { boothID } = useParams();

  return (
    <section className="confirmation-container">
      <img src={votingConfirmationImg} alt="Person holding a tablet with a checkmark on their screen" />
      <h3>Your vote has been recorded!</h3>
      <div className="button-container">
        <Link className="button primary" to={`/results/${boothID}`}>View Results</Link>
      </div>
    </section>
  );
};

export default VotingConfirmation;