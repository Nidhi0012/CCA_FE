import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Conferences.module.css";
import conferenceService from "../service/Conference.Service.js";
import { useConferenceContext } from "./ConferenceContext.jsx";
import Header from "./CommonHeader";

const Conferences = () => {
  const {
    conferenceList,
    setConferenceList,
    msg,
    setMsg,
    filterValue,
    setFilterValue,
    loader,
    setLoader,
  } = useConferenceContext();

  const variant = [
    "linear-gradient(90deg, #F8F5F0, #F4CB8C)",
    "linear-gradient(90deg, #F6FCF2, #D1F2B8)",
    "linear-gradient(90deg, #F5F7FB, #B4C4DA)",
    "linear-gradient(90deg, rgb(246, 252, 242), rgb(195 204 188))",
    "linear-gradient(90deg, rgb(248, 245, 240), rgb(244 140 206))",
    "linear-gradient(90deg, rgb(238 241 245), rgb(97 147 216))",
  ];

  useEffect(() => {
    fetchConferences();
  }, [filterValue]);

  const fetchConferences = () => {
    setLoader(true);
    if (filterValue === "all") {
      conferenceService
        .getAllConference()
        .then((res) => {
          console.log(res.data);
          setConferenceList(res.data);
          setTimeout(() => {
            setLoader(false);
          }, 50000);
        })
        .catch((error) => {
          console.log(error);
          setLoader(false);
        });
    } else {
      conferenceService
        .getConferenceByStatus(filterValue)
        .then((res) => {
          console.log(res.data);
          setConferenceList(res.data);
          setLoader(false);
        })
        .catch((error) => {
          console.log(error);
          setLoader(false);
        });
    }
  };

  const deleteConference = (id) => {
    console.log("id : ", id);

    conferenceService
      .deleteConference(id)
      .then((res) => {
        setMsg("Conference Deleted Successfully");
        setTimeout(() => {
          setMsg("");
        }, 2000);

        fetchConferences();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const generateRandomVariant = (id) => {
    const index = conferenceList.findIndex(
      (conference) => conference.conferenceId === id
    );
    return variant[index % variant.length];
  };

  const badgeBg = {
    online: "green",
    "online and in-person": "#d4a15c",
    "in-person": "#43adca",
  };

  return (
    <>
      {loader && !conferenceList.length ? (
        <div
          style={{
            position: "fixed",
            top: "0",
            right: "0",
            bottom: "0",
            left: "0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
          }}
        >
          <div style={{ textAlign: "center", fontSize: "24px" }}>
            Loading Conferences...
          </div>
        </div>
      ) : (
        <div className="container">
          {msg && <p className="fs-4 text-center text-success">{msg}</p>}

          <Header
            title={"Conferences"}
            isFilterActive
            isAddButton
            onFilterChange={setFilterValue}
          />
          <div>
            {!conferenceList.length ? (
              <div
                style={{
                  textAlign: "center",
                  fontSize: "18px",
                }}
              >
                No conferences to display
              </div>
            ) : (
              <div className="cards">
                {conferenceList.map((card) => {
                  const randomVariant = generateRandomVariant(
                    card.conferenceId
                  );

                  const statusKey = card.status.toLowerCase();
                  const dynamicBackgroundColor = badgeBg[statusKey];

                  return (
                    <div
                      key={card.conferenceId}
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
                              // background: badgeBg[card.status],
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
                          to={"/editConference/" + card.conferenceId}
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
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default Conferences;
