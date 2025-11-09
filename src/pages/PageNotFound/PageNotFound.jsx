import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PageNotFound.module.scss";

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>
        Sorry, the page you’re looking for doesn’t exist.
      </p>
      <button className={styles.homeButton} onClick={handleGoHome}>
        Go to Home
      </button>
    </div>
  );
};

export default PageNotFound;
