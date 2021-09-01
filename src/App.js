import React, { useState } from 'react';
function App() {
  
  const[dateEntered, setDateEntered] = useState();
  
  return (
    <div className = "container">
    <h1>Check if your Birth-date is a Palindrome or Not</h1>
    <iframe className="gif" src="https://giphy.com/embed/bJO0LN9AMKtAbIDF34" width="200" height="200" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
    <label htmlFor="datePicker">Enter your Date-Of-Birth</label>
    <input id = "datePicker" type = "date" onChange={(e)=>{
      setDateEntered(e.target.value);
    }}></input>
    <button onClick = {()=>{console.log(dateEntered)}}>Check</button>
  </div> 
    )
}

export default App;
