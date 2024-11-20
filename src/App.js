import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import Button from './component/Button';
import "react-datepicker/dist/react-datepicker.css";
import { TimePicker } from 'react-time-picker';
import ResultDisplay from './component/ResultDisplay/ResultDisplay';
import './App.css';

function App() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState('12:00');
  const [endTime, setEndTime] = useState('12:00');
  const [includeAllDays, setIncludeAllDays] = useState(false);
  const [includeEndDay, setIncludeEndDay] = useState(false);
  const [result, setResult] = useState({});
  const [show, setShow] = useState(false)
  const [errorMsgStartDate, setErrorMsgStartDate] = useState("");
  const [errorMsgEndDate, setErrorMsgEndDate] = useState("");
  const [errorMsgStartTime, setErrorMsgStartTime] = useState("");
  const [errorMsgEndTime, setErrorMsgEndTime] = useState("");

  const calculateDuration = () => {
    if (!startDate) {
      setErrorMsgStartDate("Select Start Date");

    }
    if (!endDate) {
      setErrorMsgEndDate("Select End Date");
      return;
    }

    if (!startTime) {
      setErrorMsgStartTime("Select Start Time");
      return
    }
    if (!endTime) {
      setErrorMsgEndTime("Select End Time");
      return;
    }
    setErrorMsgStartTime("");
    setErrorMsgEndTime("");
    setShow(true);
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    const startTimeParts = startTime.split(":");
    start.setHours(parseInt(startTimeParts[0]), parseInt(startTimeParts[1]), 0, 0);
  
    const endTimeParts = endTime.split(":");
    end.setHours(parseInt(endTimeParts[0]), parseInt(endTimeParts[1]), 0, 0);
  
    let durationInMs = end - start;
  
    if (durationInMs < 0) {
      setErrorMsgEndDate("End time must be after start time.");
      return;
    }
  
    if (!includeAllDays) {
      durationInMs -= (24 * 60 * 60 * 1000);
    }
  
    if (includeEndDay) {
      durationInMs += (24 * 60 * 60 * 1000); 
    }
  
    const years = Math.floor(durationInMs / (365.25 * 24 * 60 * 60 * 1000));
    const months = Math.floor((durationInMs % (365.25 * 24 * 60 * 60 * 1000)) / (30 * 24 * 60 * 60 * 1000));
    const days = Math.floor((durationInMs % (30 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000));
    const hours = Math.floor((durationInMs % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((durationInMs % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((durationInMs % (60 * 1000)) / 1000);
  
    setResult({
      years,
      months,
      days,
      hours,
      minutes,
      seconds,
      formattedDuration: `${years} years, ${months} months, ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`,
      shortDuration: `${years} years, ${months * 30 + days} days`,
      weeksDuration: `${Math.floor(durationInMs / (7 * 24 * 60 * 60 * 1000))} weeks`,
      hoursDuration: `${Math.floor(durationInMs / (60 * 60 * 1000))} hours`,
    });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert("Copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  }

  return (
    <div >

      <div className="App">
        <h1>Date Duration Calculator</h1>
        <div className="date-inputs">
          <div className="date-picker">
            <label>Start Date:</label>
            <DatePicker
              className="custom-datepicker-input"
              selected={startDate}
              onChange={(date) => {
                setStartDate(date)
                setErrorMsgStartDate("")
              }}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select start date"

            />
            {errorMsgStartDate && <p className="error-message">{errorMsgStartDate}</p>}

          </div>
          <div className="date-picker">
            <label>End Date:</label>
            <DatePicker
              className="custom-datepicker-input"
              selected={endDate}
              onChange={(date) => {
                setEndDate(date)
                setErrorMsgEndDate("")
              }}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select end date"
            />
            {errorMsgEndDate && <p className="error-message">{errorMsgEndDate}</p>}

          </div>
        </div>

        <div className="time-inputs">
          <div className="time-input">
            <label>Start Time:</label>
            <TimePicker
              value={startTime}
              onChange={(time) => {
                setStartTime(time)
                setErrorMsgStartTime("")
              }}
              className="custom-time-picker"
            />
            {errorMsgStartTime && <p className="error-message">{errorMsgStartTime}</p>}
          </div>
          <div className="time-input">
            <label>End Time:</label>
            <TimePicker
              value={endTime}
              onChange={(time) => {
                setEndTime(time)
                setErrorMsgEndTime("")
              }}
              className="custom-time-picker"
            />
            {errorMsgEndTime && <p className="error-message">{errorMsgEndTime}</p>}
          </div>
        </div>

        <div className="toggles">
          <div>
            <label>Include all days?</label>
            <label className="switch">
              <input
                type="checkbox"
                checked={includeAllDays}
                onChange={() => setIncludeAllDays(!includeAllDays)}
              />
              <span className="slider round"></span>
            </label>
          </div>
          <div>
            <label>Include end day?</label>
            <label className="switch">
              <input
                type="checkbox"
                checked={includeEndDay}
                onChange={() => setIncludeEndDay(!includeEndDay)}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>

        <Button className="calculator-button" onClick={calculateDuration}>Calculate</Button>

      </div>
      <div className="App-Duration">
        {show && (<ResultDisplay result={result} copyToClipboard={copyToClipboard} />)}
      </div>
    </div>

  );
}

export default App;
