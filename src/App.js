import React, { useState } from 'react';
function App() {
  
  const[dateEntered, setDateEntered] = useState();
  const[messageDisplay, setMessageDisplay] = useState('');

  //Generating Date Object
  const returnDateObject=(rawDate)=>{
    const splitDate = rawDate.split('-');
    const date = {
      year: splitDate[0],
      month: splitDate[1],
      day: splitDate[2]
    };
    
    return date;
  }
  
  const returnAllFormats = (date)=>{
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

  //Fitting puzzle pieces in this function
  const onClickHandler = () => {
    //slice karo '-' se aur saare formats generate karo
    //saare formats ko reverse kar ke dekho palindrome hai ki nai
    //agar hai to show message
    //agar nahi to next day wala function and then keep checking the day with palindrome.
     let allDates = (returnAllFormats(returnDateObject(dateEntered)));
     if(checkPalindrome(allDates)){
       setMessageDisplay("Congratulations your birthday is a palindrome!");
     }
     else{
       const [nextPalindrome, daysUntil] = checkNextPalindrome(returnDateObject(dateEntered));
       setMessageDisplay("Um..sorry. Your birthday isn't a palindrome. The next plaindrome is after "+ daysUntil+ " days on " + nextPalindrome.day+"-"+nextPalindrome.month+"-"+nextPalindrome.year);
     }
  }

  const isLeapYear = (year) =>{
    let checkYear = Number(year);
    if(checkYear%400 === 0){
      return true;
    }
    if(checkYear%100 === 0){
      return false;
    }
    if(year%4 === 0){
      return true;
    }
    return false;
  }

  //to getNextDay 
  const nextDay = (dateObject) => {
    let year = Number(dateObject.year);
    let month = Number(dateObject.month);
    let day = Number(dateObject.day);
    day = day+1;

    var monthlyDays = [31,28,31,30,31,30,31,31,30,31,30,31];

    //for Feb
    if(month === 2){
      //checkLeapYear
      if(isLeapYear(year)){
        if(day>29){
          day = 1;
          month++;
        }
      }
      else {
        if(day>28){
          day = 1;
          month++;
        }
      }
    }
    else {
      if(day>monthlyDays[month-1]){
        day =1;
        month++;
      }
    }

    if(month>12){
      month =1;
      year++;
    }
    if(day<10){
      day = '0' + String(day);
      console.log(day)
    }
    if(month<10){
      month ='0' + String(month);
      console.log(month);
    }
    return {
      day: String(day),
      month: String(month),
      year: String(year)
    };
  }

  //checkNextPalindrome
  const checkNextPalindrome = (date) => {
    //keep getting next date until the date is palindrome
      let next = nextDay(date);
      let count = 0;
      while(1){
      count++;
      const allformats = returnAllFormats(next);
      if(checkPalindrome(allformats)){
        
        return [next,count];
      }
      else{
        next = nextDay(next);
        
      }
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
