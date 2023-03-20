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
        if (formValues.length <= 0) {
            Swal.fire({
                text: "Select 'New Option' to Create a Poll Option",
            });
        }
        formValues.forEach((vote) => {
            if (vote.pollOption == "") {
                Swal.fire({
                    text: "Please fill all fields or remove any empty fields to continue"
                });
            }
        })
    }

    const changeBackground = (e) => {
        e.target.style.background = '#0043bf';
    }

    const revertBackground = (e) => {
        e.target.style.background = '#0057fc';
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
                        className="poll-input"
                        onChange={e => handleChange(index, e)}
                    />
                    {
                        moreOptions ?
                            null :
                            <div
                                type="button"
                                className="button remove"
                                onClick={() => removeFormFields(index)}>
                                Remove
                            </div>

                    }
                </div>
            ))}
            <div className="button-section">
                {moreOptions ?
                    <>
                        <div
                            onMouseOver={changeBackground}
                            onMouseLeave={revertBackground}
                            onClick={() => {
                                handleMoreOptions()
                                isDone(moreOptions)
                            }}
                            className="button primary">
                            Add or Remove Options</div>
                    </>
                    :
                    <>
                        <div
                            className="button primary"
                            type="button"
                            onMouseOver={changeBackground}
                            onMouseLeave={revertBackground}
                            onClick=
                            {() => addFormFields()}>
                            Add Option</div>
                        <button
                            className="button primary"
                            onMouseOver={changeBackground}
                            onMouseLeave={revertBackground}
                            onClick={(e) => {
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