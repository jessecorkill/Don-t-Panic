//Function Component for Calendar View
export function CalendarView(props){
    const theBudget = props.budget;
  
    //TO DO - Convert budgetDays to a function sub component that can be clicked on to change modal view
    
    if(props.budget !== null && props.modalScreen === "budget"){
      //Compensate offset for first day of theBudget by spoofing calendarDay divs ahead of 
      //Get current day of the week
      let weekday = new Date(theBudget[0][0]).getDay();
      let spacerArr = new Array(weekday).fill(null);
      const spacerDays = spacerArr.map((day) => <div className="calendarDay"></div>);
      const budgetDays = theBudget.map((day) => <div className="calendarDay" key={day[0]}><h2>{new Date(day[0]).getDate()}</h2><p>${day[1]}</p><p>{day[2]}</p></div>);
  
      return(
        <div id="calendarContainer">
          {spacerDays}
          {budgetDays}
        </div>
      )
    }else{
      return(
        ""
      )
    }
  
  }