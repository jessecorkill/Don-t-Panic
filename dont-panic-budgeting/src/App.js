import React from 'react';
import logo from './logo.svg';
import './App.css';
import {ApolloClient, InMemoryCache, HttpLink, ApolloLink, ApolloProvider, useQuery, gql, createHttpLink} from '@apollo/client'
import axios from 'axios';
import {Budget} from './budgetHandler.js';

//Function Component for Top Navigation
function NavButton(props){
  const self = this;
  return(
    <div id="nav_menu">
      <button onClick={props.onClick}>Navigation Toggle</button>
      <div className={props.navState}>
        <div className="profile">
          <h5>Your Name Here</h5>
          <p>Not you?</p><button >Sign out!</button>
        </div>
        <ul>
          <li><button onClick={props.editNav}>Edit Budget</button></li>
          <li><button onClick={props.budgetNav}>Budget Outlook</button></li>
        </ul>
      </div>

    </div>
  )
} 

//Function Component for Login View
function LoginView(props){
  return(
    <div id="loginView" >
      <form className="" onSubmit="">
        <label>
          Username:
          <input type="text" value=""></input>
        </label>
        <label>
          Password:
          <input type="password" value=""></input>
        </label>
        <input type="submit" value="Submit" />
      </form>


    </div>
  )
}

//Funciton Component for Editing Budget
class BudgetView extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      balanceField: 0,
    }
    this.handleBalChange = this.handleBalChange.bind(this);
  }
  
    handleBalChange(event){
      this.setState({
        balanceField: event.target.value
      })
    }


 
    render(){
      if(this.props.modalScreen === 'edit'){
        return(
          <div className="" id="editView" >
          <form className="" onSubmit="">
            <input type="submit" value="Submit" />
          </form>
          <form className="" onSubmit={this.props.setBal}>
            <label>
              Current Balance
              <input onChange={this.handleBalChange} type="number" value={this.state.balanceField}></input>
            </label>
            <input type="submit" value="Submit" />
          </form>
          </div>
        );
      }
  }
  
}


//Function Component for Calendar View
function CalendarView(props){
  const theBudget = props.budget;

  //TO DO - Convert budgetDays to a function sub component that can be clicked on to change modal view
  
  if(props.budget !== null && props.modalScreen === "budget"){
    //To DO - Compensate offset for first day of theBudget by spoofing calendarDay divs ahead of 
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

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: true,
      modalScreen: 'budget',
      navState: 'hidden',
      userName: 'jcorkill',
      password: '',
      balance: 375,
      budgetObj: null,
      budgetParsed: null,


    }

  }
  componentDidMount(){
      console.log('App component mounted')
      //if data is available, fetch data
      const client = new ApolloClient({
        uri: 'https://budget.caylaslifemusic.com/graphql',
        cache: new InMemoryCache(),
        credentials: 'same-origin',
        headers: {
          'content-type': 'application/json',
          'Method': 'POST',
        }
      })

      client
      .query({
        query: gql`
        query NewQuery($title: String = "${this.state.userName}") {
          budgets(where: {title: $title}) {
            nodes {
              budgetFields {
                expenses {
                  amount
                  chargeDay
                  expenseName
                  frequency
                  weekDay
                }
                income {
                  amount
                  chargeDay
                  expenseName
                  frequency
                  weekDay
                }
              }
            }
          }
        }
        `
      })
      .then(result =>       
        this.passBudget(this, result)
      );
  }
  //passes response to the budgetHandler.js
  passBudget(self, result){
    const budgetParsed = new Budget;
    self.setState({
      budgetParsed: budgetParsed.budgetThirtyDays(self.state.balance, result.data.budgets.nodes[0].budgetFields)
    })      
  }


  //function for handling nav click
  handleNavClick(self){
    //check state of nav menu
    if(self.state.navState === "hidden"){
      self.setState({
        navState: "show",
      })
    }else{
      self.setState({
        navState: "hidden",
      })
    }
  }
  //
  handleBudgetOverlook(self){
    self.setState({
      modalScreen: "budget",
    })
  }
  handleBudgetEdit(self){
    self.setState({
      modalScreen: "edit",
    })
  }
  handleBalanceSet(self, event){
    self.setState({
      balance: event.target.value,
    })
  }

  render(){
    return(
      <div className="App">
        <NavButton navState={this.state.navState} editNav={() => this.handleBudgetEdit(this)} budgetNav={() => this.handleBudgetOverlook(this)} onClick={() => this.handleNavClick(this)}></NavButton>
        <CalendarView modalScreen={this.state.modalScreen} budget={this.state.budgetParsed}></CalendarView>
        <BudgetView modalScreen={this.state.modalScreen} setBal={() => this.handleBalanceSet(this)} bal={this.state.balance}></BudgetView>
        
      </div>
      
    );
  }

}

export default App;
