import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Conferences.module.css";
import conferenceService from "../service/Conference.Service.js";
import { useConferenceContext } from "./ConferenceContext.jsx";
import Header from "./CommonHeader";

const PastConferences = () => {
  const [deleteSuccessMsg, setDeleteSuccessMsg] = useState({
    message: "",
    style: { fontSize: "25px", color: "green", textAlign: "center" },
  });
  const {
    conferenceList,
    setConferenceList,
    setLoader,
    setMsg,
    filterValue,
    setFilterValue,
    
  } = useConferenceContext();

  useEffect(() => {
    fetchPastConferences();
  }, [filterValue]);

  const fetchPastConferences = () => {
    setLoader(true);
    conferenceService
      .getAllPastConferences()
      .then((res) => {
        applyFilter(res.data);
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
        setMsg("Error fetching past conferences.");
      });
  };

  const applyFilter = (conferences) => {
    if (filterValue === "all") {
      setConferenceList(conferences);
    } else {
      const filteredPastConferences = conferences.filter(
        (conference) =>
          conference.status.toLowerCase() === filterValue.toLowerCase()
      );
      setConferenceList(filteredPastConferences);
    }
  };

  const deleteConference = (id) => {
    console.log("id : ", id);

    conferenceService
      .deleteConference(id)
      .then((res) => {
        setDeleteSuccessMsg({
          message: "Conference Deleted Successfully",
          style: { fontSize: "25px", color: "green", textAlign: "center" },
        });
        setTimeout(() => {
          setDeleteSuccessMsg({ message: "", style: {} });
        }, 2000);
        fetchPastConferences();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const variant = [
    "linear-gradient(90deg, #F8F5F0, #F4CB8C)",
    "linear-gradient(90deg, #F6FCF2, #D1F2B8)",
    "linear-gradient(90deg, #F5F7FB, #B4C4DA)",
    "linear-gradient(90deg, rgb(246, 252, 242), rgb(195 204 188))",
    "linear-gradient(90deg, rgb(248, 245, 240), rgb(244 140 206))",
    "linear-gradient(90deg, rgb(238 241 245), rgb(97 147 216))",
  ];

  const badgeBg = {
    online: "green",
    "online and in-person": "#d4a15c",
    "in-person": "#43adca",
  };

  return (
    <div className="container">
      {deleteSuccessMsg.message && (
        <div style={deleteSuccessMsg.style} className="success-msg">
          {deleteSuccessMsg.message}
        </div>
      )}
      <Header
        title={"Past Conferences"}
        isFilterActive
        isAddButton={false}
        onFilterChange={setFilterValue}
      />

      <div className="cards">
        {conferenceList &&
          conferenceList.length > 0 &&
          conferenceList.map((card, index) => {
            const randomVariant = variant[index % variant.length];
            const statusKey = card.status.toLowerCase();
            const dynamicBackgroundColor = badgeBg[statusKey];

            return (
              <div
                key={index}
                className={`card ${styles.cardCss}`}
                style={{ background: randomVariant }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "140px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <span
                      className={styles.badge}
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        background: dynamicBackgroundColor,
                      }}
                    >
                      {card.status}
                    </span>
                  </div>
                  <span
                    style={{
                      fontWeight: "500",
                      lineHeight: "1.2",
                      fontSize: "14px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    {card.date}
                  </span>
                  <span className={styles.confName}>{card.name}</span>
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      lineHeight: "21px",
                    }}
                  >
                    {card.place}
                  </span>
                  <span>
                    <a
                      href={card.link}
                      style={{
                        color: randomVariant,
                        textDecoration: "none",
                      }}
                    >
                      {card.link}
                    </a>
                  </span>
                </div>
                <div style={{ display: "flex" }}>
                  <Link
                    to={`/editConference/${card.conferenceId}?source=pastConferences`}
                    className={styles.button}
                  >
                    Edit
                  </Link>

                  <div style={{ marginLeft: "16px" }}>
                    <button
                      onClick={() => deleteConference(card.conferenceId)}
                      className={styles.button}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default PastConferences;
