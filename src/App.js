import React, { useState } from 'react';
function App() {
  
  const[dateEntered, setDateEntered] = useState();
  const[messageDisplay, setMessageDisplay] = useState('');

  //Generating Date Object
  const generateDateObject=(rawDate)=>{
    const splitDate = rawDate.split('-');
    const date = {
      year: splitDate[0],
      month: splitDate[1],
      day: splitDate[2]
    };
    
    const ddmmyyyy = date.day+date.month+date.year;
    const mmddyyyy = date.month+date.day+date.year;
    const yyyymmdd = date.year+date.month+date.day;
    const ddmmyy = date.day+date.month+date.year.slice(-2);

    const allFormats = [ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy];
    return allFormats;
  }

  //Check if all formats are Palindrome or not
  const checkPalindrome = (allFormats) => {
    for (let i of allFormats){
      let reverse = i.split('').reverse().join('');
      if(reverse === i){
        return true;
      }
    }
    return false;
  }




  const onClickHandler = () => {
    //slice karo '-' se aur saare formats generate karo
    //saare formats ko reverse kar ke dekho palindrome hai ki nai
    //agar hai to show message
    //agar nahi to next day wala function and then keep checking the day with palindrome.
    const allFormats = generateDateObject(dateEntered);
    if(checkPalindrome(allFormats)){
      setMessageDisplay("Cogratulations!! Your Birthday is a Palindrome")
    }
    else{
      setMessageDisplay("Umm..Not a Palindrome sorry");
    }
  }
  
  return (
    <div className = "container">
    <h1>Check if your Birth-date is a <span style={{color: "#0e835c"}}>Palindrome</span> or Not</h1>
    <iframe className="gif" src="https://giphy.com/embed/bJO0LN9AMKtAbIDF34" width="200" height="200" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
    <label htmlFor="datePicker">Enter your Date-Of-Birth</label>
    <input id = "datePicker" type = "date" onChange={(e)=>{
      setDateEntered(e.target.value);
    }}></input>
    <h3>{messageDisplay}</h3>
    <button onClick = {onClickHandler}>Check</button>
  </div> 
    )
}

export default App;
