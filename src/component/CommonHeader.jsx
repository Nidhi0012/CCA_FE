import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Conferences.module.css";

const sessionTypes = [
  { key: "all", value: "All" },
  { key: "online", value: "Online" },
  { key: "in-person", value: "In-person" },
  { key: "online and in-person", value: "Online and In-person" },
];

const Header = ({ title, isFilterActive, isAddButton, onFilterChange }) => {
  const handleFilterChange = (event) => {
    onFilterChange(event.target.value);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "120px",
      }}
    >
      <h1 style={{ marginLeft: "8px" }}>{title}</h1>
      <div style={{ display: "flex" }}>
        {isFilterActive && (
          <div style={{ marginRight: "24px" }}>
            <label
              htmlFor="filterBy"
              style={{
                fontSize: "20px",
                fontWeight: "700",
                letterSpacing: "1px",
              }}
            >
              Filter by:{" "}
            </label>
            <select
              id="filterBy"
              className={styles.dropdown}
              name="filterBy"
              style={{
                marginLeft: "8px",
                padding: "8px",
                width: "110px",
                borderRadius: "8px",
              }}
              onChange={handleFilterChange}
            >
              {sessionTypes.map((item) => (
                <option
                  key={item.key}
                  value={item.key}
                  style={item.key === "all" ? { padding: "8px" } : {}}
                >
                  {item.value}
                </option>
              ))}
            </select>
          </div>
        )}
        {isAddButton && (
          <Link to="/addConference" className={styles.addConfBtn}>
            Add Conference
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
