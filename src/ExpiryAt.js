import React, { useEffect, useState } from "react";

const ExpiryAt = ({ expiryTime }) => {
  const [result, setResult] = useState("");

  useEffect(() => {
    const TimeRemain = () => {
      const currentTime = Date.now();
      const targetTime = new Date(expiryTime).getTime();
      const timeDifference = targetTime - 5.5 * 60 * 60 * 1000 - currentTime;
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
      let timeString = "";
      if (days > 0) {
        timeString += `${days} days `;
      }
      if (hours > 0) {
        timeString += `${hours} hours `;
      }
      if (minutes > 0) {
        timeString += `${minutes} minutes `;
      }
      if (seconds > 0) {
        timeString += `${seconds} seconds `;
      }
      setResult(timeString.trim() + " to End");
    };
    if (expiryTime) {
      TimeRemain(); // Update immediately
      const intervalId = setInterval(TimeRemain, 1000); // Update every second
      return () => clearInterval(intervalId); // Clean up on unmount or when expiryTime changes
    }
  }, [expiryTime]);
  return (
    <div>
      <b>{result}</b>
    </div>
  );
};

export default ExpiryAt;