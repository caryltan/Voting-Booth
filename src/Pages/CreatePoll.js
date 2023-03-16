//Components
import PollCreation from "../Components/PollCreation";
import PollInputField from "../Components/PollOptionField";
import { useEffect, useState } from "react";

const CreatePoll = () => {
  const [ options, setPollOptions ] = useState([]);
  const [inputList, setInputList] = useState({});

  const handleChange = (e) => {
    console.log(inputList);
    // console.log('event', event);
    // const { value } = event.target
    // const newInputList = [...inputList]
    // newInputList.input = value;
    // console.log('newInputList', newInputList)
    const { input, value } = e.target;
    //setInputList({ ...inputList, [input]: value });
    console.log(input, value);
  };

  const addField = (event) => {
    console.log(event.target);
  };

  useEffect(() => {
    console.log(inputList);
  })

  return (
    <>
      <PollCreation />
      {/* {options.map((input, index) => (
          <input
            key={index}
            name={input}
            onChange={(event) => handleChange(event)} 
          />
          ))
      }
     <button onClick={(event) => addField(event)}>Add Poll Option</button> */}
    </>
  );
};

export default CreatePoll;