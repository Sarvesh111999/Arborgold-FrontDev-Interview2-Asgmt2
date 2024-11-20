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
  const [copied, setCopied] = useState(false)

  const calculateDuration = () => {
    if (!startDate) {
      setErrorMsgStartDate("Select Start Date");

    }
    if (!endDate) {
      setErrorMsgEndDate("Select End Date");
      return;
    }

    setShow(true);
    const start = new Date(startDate);
    const end = new Date(endDate);

    let duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    if (!includeAllDays) {
      duration -= 1;
    }

    if (includeEndDay) {
      duration += 1;
    }

    const years = Math.floor(duration / 365);
    const months = Math.floor((duration % 365) / 30);
    const days = duration % 30;
    const weeks = Math.floor(duration / 7);
    const hours = duration * 24;

    setResult({
      years,
      months,
      days,
      weeks,
      hours,
      formattedDuration: `${years} years, ${months} months, ${days} days`,
      shortDuration: `${years} years, ${months * 30 + days} days`,
      weeksDuration: `${weeks} weeks`,
      hoursDuration: `${hours} hours`
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
              onChange={setStartTime}
              className="custom-time-picker"

            />
          </div>
          <div className="time-input">
            <label>End Time:</label>
            <TimePicker
              value={endTime}
              onChange={setEndTime}
              className="custom-time-picker"
            />
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
