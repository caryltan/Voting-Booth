import { useState } from "react";
import Swal from "sweetalert2";

const PollInputField = ({ getFormValues, isDone }) => {

    const [moreOptions, setMoreOptions] = useState(true)
    const [formValues, setFormValues] = useState([
        {
            pollOption: ""
        }]);

    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
    };

    let addFormFields = () => {
        setFormValues([...formValues, { pollOption: "" }]);
    };

    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues);
    };

    const handleMoreOptions = () => {
        setMoreOptions(false)
    }

    const completeOptions = () => {
        setMoreOptions(true)
        console.log(formValues)
        if (formValues.length <= 0) {
            Swal.fire({
                text: "Select 'New Option' to Create a Poll Option",
            });
        }
        formValues.forEach((vote) => {
            console.log(vote.pollOption)
            if (vote.pollOption == "") {
                Swal.fire({
                    text: "Poll options cannot be empty. Please fill all fields or remove any empty fields to continue"
                });
            }
        })
        // if (formValues.has("") == true) {
        //     Swal.fire({
        //       text: "empty",
        //     });
        //   }
    }

    return (
        <>
            {formValues.map((element, index) => (
                <div className="create-poll-option" key={index}>
                    <input
                        type="text"
                        name="pollOption"
                        placeholder="Poll Option"
                        value={element.name}
                        onChange={e => handleChange(index, e)}
                    />
                    {
                        moreOptions ?
                            null :
                            <button type="button" className="button remove" onClick={() => removeFormFields(index)}>Remove</button>

                    }
                </div>
            ))}
            <div className="button-section">
                {moreOptions ?
                    <>
                        <button
                            onClick={() => {
                                handleMoreOptions()
                                isDone(moreOptions)
                            }}
                            className="button primary">+/- Options</button>
                    </>
                    :
                    <>
                        <button className="button primary" type="button" onClick=
                            {() => addFormFields()}>+ Option</button>
                        <button className="button primary" onClick={(e) => {
                            getFormValues(formValues, e)
                            isDone(moreOptions)
                            completeOptions()
                        }}>
                            Done
                        </button>
                    </>
                }
            </div>
        </>
    )
}

export default PollInputField;