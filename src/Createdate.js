import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Createdate = ({createdtime}) => {
  const [result, setResult] = useState("");
  const navA=useNavigate();
  useEffect(() => {
    const timer = () => {
      const currentTime = +new Date(); // current time
      const targetTime = +new Date(createdtime); // poll created time
      const timeDifference = currentTime - (targetTime - 5.5 * 60 * 60 * 1000);
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
      const months = Math.floor((timeDifference / (1000 * 60 * 60 * 24 * 30)) % 12);
      const years = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365));

      let timeString = "";

      if (years > 0) {
        timeString += `${years} years `;
      }
      if (months > 0) {
        timeString += `${months} months `;
      }
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

      setResult(timeString.trim() + " ago");
    };

    if (createdtime) {
      timer(); // Update immediately
      const intervalId = setInterval(timer, 1000); // Update every second

      return () => clearInterval(intervalId); // Clean up on unmount or when createdtime changes
    }
  }, [createdtime]);
  return (
    <div>
      <b>{result}</b>
    </div>
  )
}

export default Createdate
