import React from 'react';
import '../ResultDisplay/styles.css'

function ResultDisplay({ result, copyToClipboard }) {

  return (
    <div className="result-display">
      <h2>Duration</h2>
      {result.formattedDuration && (
        <div className='result'>
          <p>{result.formattedDuration}</p>
          <button className = "copy" onClick={() => copyToClipboard(result.formattedDuration)}>Copy</button>
        </div>
      )}
      {result.shortDuration && (
        <div className='result'>
          <p>{result.shortDuration}</p>
          <button className = "copy"onClick={() => copyToClipboard(result.shortDuration)}>Copy</button>
        </div>
      )}
      {result.weeksDuration && (
        <div className='result'>
          <p>{result.weeksDuration}</p>
          <button className = "copy"onClick={() => copyToClipboard(result.weeksDuration)}>Copy</button>
        </div>
      )}
      {result.hoursDuration && (
        <div className='result'>
          <p>{result.hoursDuration}</p>
          <button className = "copy"onClick={() => copyToClipboard(result.hoursDuration)}>Copy</button>
        </div>
      )}
      {result.minutes && (
    <div className='result'>
      <p>{result.minutes} minutes</p>
      <button className="copy" onClick={() => copyToClipboard(result.minutes + ' minutes')}>Copy</button>
    </div>
  )}
    </div>
  );
}

export default ResultDisplay;
