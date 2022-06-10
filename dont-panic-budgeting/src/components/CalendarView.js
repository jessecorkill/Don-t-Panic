//Function Component for Calendar View
import React from 'react';

//Child Component to help make charge items interactable.
//Charges should allow for ammount changes or removal of charge for this app visit
function Charges(props){
    const detailsArr = props.detailsArr.map((element, index) => 
        <div key={'charge_' + index} className='charge'>
            <p>{element}</p>            
        </div>
    )
    return(
        <div className='chargeDetails'>
            {detailsArr}
        </div> 
    )
}

class CalendarDay extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            budgetDayObj: null,
        }
    }
    componentDidMount(){

    }
    componentDidUpdate(){
        //On Day's State Change, invoke a re-drawing of the budget with new values
        

    }

    render(){
        return(
            <div className="calendarDay">
                <h2>{new Date(this.props.budgetInstance[0]).getDate()}</h2>
                <p>${this.props.budgetInstance[1]}</p>
                <Charges detailsArr={this.props.budgetInstance[2]}></Charges>
            </div>   
        )
    }
}

export class CalendarView extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          
        }
    }
    //onClick handler for sub charge subcomponent.
    handleChargeClick(){

    }
    renderDay(i){
        return(
            <CalendarDay budgetInstance={this.props.budget[i]}></CalendarDay>
        )
    }


  
    //TO DO - Convert budgetDays to a function sub component that can be clicked on to change modal view
    render(){
        if(this.props.budget !== null && this.props.modalScreen === "budget"){
            //Compensate offset for first day of theBudget by spoofing calendarDay divs ahead of 
            //Get current day of the week
            let weekday = new Date(this.props.budget[0][0]).getDay();
            let spacerArr = new Array(weekday).fill(null);
            const spacerDays = spacerArr.map((day, index) => <div key={'spacer_' + index} className="calendarDay"></div>);
            //const budgetDays = this.props.budget.map((day) => <div className="calendarDay" key={day[0]}><h2>{new Date(day[0]).getDate()}</h2><p>${day[1]}</p></div>);
        
            return(
              <div id="calendarContainer">
                {spacerDays}
                {this.renderDay(0)}
                {this.renderDay(1)}
                {this.renderDay(2)}
                {this.renderDay(3)}
                {this.renderDay(4)}
                {this.renderDay(5)}
                {this.renderDay(6)}
                {this.renderDay(7)}
                {this.renderDay(8)}
                {this.renderDay(9)}
                {this.renderDay(10)}
                {this.renderDay(11)}
                {this.renderDay(12)}
                {this.renderDay(13)}
                {this.renderDay(14)}
                {this.renderDay(15)}
                {this.renderDay(16)}
                {this.renderDay(17)}
                {this.renderDay(18)}
                {this.renderDay(19)}
                {this.renderDay(20)}
                {this.renderDay(21)}
                {this.renderDay(22)}
                {this.renderDay(23)}
                {this.renderDay(24)}
                {this.renderDay(25)}
                {this.renderDay(26)}
                {this.renderDay(27)}
                {this.renderDay(28)}
                {this.renderDay(29)}
              </div>
            )
          }else{
            return(
              ""
            )
          }
    }

  
  }