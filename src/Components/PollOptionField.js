import { useState } from "react";

const PollInputField = ({ getFormValues }) => {

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

    return (
        <>
            {formValues.map((element, index) => (
                <div className="form-inline" key={index}>
                    <label>Poll Option</label>
                    <input
                        type="text"
                        name="pollOption"
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
                <button className="button add" type="button" onClick={() => addFormFields()}>Add</button>
                <button onClick={(e) => getFormValues(formValues, e)}>Done</button>
            </div>
        </>
    )
}

export default PollInputField;