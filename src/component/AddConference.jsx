import React, { useState } from "react";
import conferenceService from "../service/Conference.Service";
import { useNavigate } from "react-router-dom";
import styles from "../styles/AddConference.module.css";

const AddConference = () => {
  const [conference, setConference] = useState({
    place: "",
    date: "",
    name: "",
    status: "",
    link: "",
  });

  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setConference({ ...conference, [name]: value });
  };

  const conferenceRegister = (event) => {
    event.preventDefault();
    conferenceService
      .saveConference(conference)
      .then((res) => {
        setSuccessMsg("Conference added successfully");

        setTimeout(() => {
          setSuccessMsg("");
        }, 2000);

        setConference({
          place: "",
          date: "",
          name: "",
          status: "",
          link: "",
        });

        setTimeout(() => {
          navigate("/conferences");
        }, 1000);
      })
      .catch((error) => {
        console.error("Error adding conference:", error);
        setMsg("Error adding conference. Please try again.");
      });
  };

  return (
    <div className={`container ${styles.addConference}`}>
      <div className={styles.addConferenceCard}>
        <div className={`card-body ${styles.cardBody}`}>
          {msg && (
            <p className={`fs-4 text-center text-success ${styles.successMsg}`}>
              {msg}
            </p>
          )}
          {successMsg && (
            <p className={`fs-4 text-center text-success ${styles.successMsg}`}>
              {successMsg}
            </p>
          )}
          <div className={`card-header fs-3 text-center ${styles.cardHeader}`}>
            Add Conference
          </div>

          <form onSubmit={(e) => conferenceRegister(e)}>
            <div className="mb-3">
              <label>Enter Place</label>
              <input
                type="text"
                name="place"
                className="form-control"
                onChange={(e) => handleChange(e)}
                value={conference.place}
                required
                maxLength={40}
                minLength={2}
                pattern="^[a-zA-Z0-9_. -]+$"
                title="Please enter a valid name"
              />
            </div>

            <div className="mb-3">
              <label>Select Date</label>
              <input
                type="date"
                name="date"
                id="my-date-picker"
                min="2023-07-26"
                className="form-control"
                onChange={(e) => handleChange(e)}
                value={conference.date}
                required
              />
            </div>

            <div className="mb-3">
              <label>Enter Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                onChange={(e) => handleChange(e)}
                value={conference.name}
                required
                maxLength={80}
                minLength={2}
                pattern="^[a-zA-Z0-9_. -]+$"
                title="Please enter a valid name"
              />
            </div>

            <div className="mb-3">
              <label>Enter Link</label>
              <input
                type="text"
                name="link"
                className="form-control"
                onChange={(e) => handleChange(e)}
                value={conference.link}
                required
                maxLength={40}
                minLength={2}
                pattern="(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?"
                title="Please enter valid link"
              />
            </div>

            <div className="mb-3">
              <label>Select Mode</label>
              <div className={styles.radio_option}>
                <input
                  type="radio"
                  name="status"
                  value="In-person"
                  checked={conference.status === "In-person"}
                  onChange={(e) => handleChange(e)}
                />
                <span className={styles.radio_label}>In-person</span>
              </div>
              <div className={styles.radio_option}>
                <input
                  type="radio"
                  name="status"
                  value="Online"
                  checked={conference.status === "Online"}
                  onChange={(e) => handleChange(e)}
                />
                <span className={styles.radio_label}>Online</span>
              </div>
              <div className={styles.radio_option}>
                <input
                  type="radio"
                  name="status"
                  value="Online and In-person"
                  checked={conference.status === "Online and In-person"}
                  onChange={(e) => handleChange(e)}
                />
                <span className={styles.radio_label}>Online and In-person</span>
              </div>
            </div>

            <button className={styles.submit_btn}>Add Conference</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddConference;
