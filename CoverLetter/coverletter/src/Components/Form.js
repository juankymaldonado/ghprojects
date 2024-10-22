import axios from "axios";
import { useState } from "react";

const Form = ({ page, onDataSent }) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [formVisible, setFormVisible] = useState(false);
  const [errorMsg, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const showSkill = page === "skill";
  const showExperience = page === "experience";
  const showHighlight = page === "about";
  const showMessage = page === "contact";

  const toggleForm = () => {
    setFormVisible(!formVisible);
    setError("");
  };

  const addform = async (page) => {
    setLoading(true);

    if (page === "skill") {
      try {
        const response = await axios.post(`/api/addskill`, {
          name: name,
        });
        const addedSkill = response.data;
        setName("");
        setError(addedSkill);
      } catch {
        setError("Error adding skill.");
      }
    }
    if (page === "experience") {
      try {
        const response = await axios.post(`/api/addexperience`, {
          name: name,
          desc: desc,
          type: type,
          date: date,
        });
        const addedExperience = response.data;
        console.log(addedExperience);
        setName("");
        setDesc("");
        setType("");
        setDate("");
        setError(addedExperience);
      } catch {
        setError("Error adding experience.");
      }
    }
    if (page === "about") {
      try {
        const response = await axios.post(`/api/addhighlight`, {
          title: name,
          desc: desc,
        });
        const addedHighlight = response.data;
        setName("");
        setDesc("");
        setError(addedHighlight);
      } catch {
        setError("Error adding highlight.");
      }
    }
    if (page === "contact") {
      try {
        const response = await axios.post(`/api/addmessages`, {
          name: name,
          message: desc,
        });
        const addedMessage = response.data;
        setName("");
        setDesc("");
        setError(addedMessage);
      } catch {
        setError("Error sending message.");
      }
    }

    setLoading(false);
  };

  return (
    <div className="form-container">
      <div className="header">
        <h3>
          {showMessage && "Send Me a Message"}
          {showSkill && "Add New Skill"}
          {showExperience && "Add New Experience"}
          {showHighlight && "Add New Highlight"}
        </h3>
        {!showMessage && (
          <>
            <button onClick={toggleForm} className="toggle-btn">
              {formVisible ? "−" : "+"}
            </button>
          </>
        )}
        {loading && <span className="loader"></span>}
      </div>

      {/* Conditionally render the form based on form visibility */}
      {formVisible && (
        <div>
          {showSkill && (
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                size={60}
                placeholder="Name"
                className="input-field"
              />
              <button onClick={() => addform("skill")} className="submit-btn">
                Send
              </button>
            </div>
          )}
          {showExperience && (
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                size={60}
                placeholder="Title"
                className="input-field"
              />
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="input-field"
              >
                <option value="work">Work</option>
                <option value="education">Education</option>
              </select>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                size={60}
                placeholder="Date"
                className="input-field"
              />
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                rows={4}
                cols={50}
                placeholder="Description"
                className="textarea-field"
              ></textarea>
              <button
                onClick={() => addform("experience")}
                className="submit-btn"
              >
                Add
              </button>
            </div>
          )}
          {showHighlight && (
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                size={60}
                className="input-field"
                placeholder="Title"
              />
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                rows={4}
                cols={50}
                className="textarea-field"
              ></textarea>
              <button onClick={() => addform("about")} className="submit-btn">
                Add
              </button>
            </div>
          )}
          <h4>
            {showMessage && errorMsg}
            {showSkill && errorMsg}
            {showExperience && errorMsg}
            {showHighlight && errorMsg}
          </h4>
        </div>
      )}

      {/* Show Message Form - Always Visible */}
      {showMessage && (
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
            placeholder="Your name"
            size={60}
            className="input-field"
          />
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows={4}
            cols={50}
            className="textarea-field"
            placeholder="Message"
          ></textarea>
          <button onClick={() => addform("contact")} className="submit-btn">
            Send
          </button>
          <h4>
            {showMessage && errorMsg}
            {showSkill && errorMsg}
            {showExperience && errorMsg}
            {showHighlight && errorMsg}
          </h4>
        </div>
      )}
    </div>
  );
};

export default Form;
