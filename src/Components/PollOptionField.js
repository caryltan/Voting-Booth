import { useState } from "react";

const PollInputField = ({ getFormValues }) => {

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
        // setMoreOptions(true)
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
                        index ?
                            <button type="button" className="button remove" onClick={() => removeFormFields(index)}>Remove</button>
                            : null
                    }
                </div>
            ))}
            <div className="button-section">
                {moreOptions ?
                    <>
                        <button onClick={handleMoreOptions} className="button primary">Add More Options</button>
                    </>
                    :
                    <>
                        <button className="button primary" type="button" onClick={() => addFormFields()}>Add New Option</button>
                        {/* <button className="button primary" onClick={(e) => getFormValues(formValues, e)}>Done</button> */}
                        <button className="button primary" onClick={(e) => {
                            getFormValues(formValues, e)
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