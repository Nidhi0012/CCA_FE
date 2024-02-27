import React, { createContext, useContext, useState } from "react";

const ConferenceContext = createContext();

export const ConferenceProvider = ({ children }) => {
  const [conferenceList, setConferenceList] = useState([]);
  const [msg, setMsg] = useState("");
  const [filterValue, setFilterValue] = useState("all");
  const [loader, setLoader] = useState(false);

  const contextValue = {
    conferenceList,
    setConferenceList,
    msg,
    setMsg,
    filterValue,
    setFilterValue,
    loader,
    setLoader,
  };

  return (
    <ConferenceContext.Provider value={contextValue}>
      {children}
    </ConferenceContext.Provider>
  );
};

export const useConferenceContext = () => {
  const context = useContext(ConferenceContext);
  if (!context) {
    throw new Error(
      "useConferenceContext must be used within a ConferenceProvider"
    );
  }
  return context;
};
