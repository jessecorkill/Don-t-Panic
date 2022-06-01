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
          <li><button >Edit Budget</button></li>
          <li><button onClick={props.budgetNav}>Budget Outlook</button></li>
        </ul>
      </div>

    </div>
  )
} 

//Function Component for Login View
function LoginView(props){
  return(
    <div id="loginView">
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


//Function Component for Calendar View
function CalendarView(props){
  const theBudget = props.budget;

  //TO DO - Convert budgetDays to a function sub component that can be clicked on to change modal view
  
  if(props.budget !== null){
    //To DO - Compensate offset for first day of theBudget by spoofing calendarDay divs ahead of 
    //Get current day of the week
    let weekday = new Date(theBudget[0][0]).getDay();
    let spacerArr = new Array(weekday).fill(null);
    const fillDays = spacerArr.map((day) => <div className="calendarDay"></div>);
    const budgetDays = theBudget.map((day) => <div className="calendarDay" key={day[0]}><h2>{new Date(day[0]).getDate()}</h2><p>${day[1]}</p><p>{day[2]}</p></div>);

    return(
      <div id="calendarContainer">
        {fillDays}
        {budgetDays}
      </div>
    )
  }else{
    return(
      <h3>You have to make a budget first!</h3>
    )
  }

}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: true,
      modalScreen: 'edit',
      navState: 'hidden',
      userName: '',
      password: '',
      balance: 342,
      budgetObj: null,
      budgetParsed: null,


    }

  }
  componentDidMount(){
      console.log('component mounted')
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
        query NewQuery {
          budgets(where: {title: "jcorkill"}) {
            nodes {
              budgetFields {
                uploadJson {
                  mediaItemUrl
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

  passBudget(self, result){

    let rawBudgetUrl = result.data.budgets.nodes[0].budgetFields.uploadJson.mediaItemUrl;
    //fetch JSON from url via axios
    axios({
      method: 'get',
      url: rawBudgetUrl,
      responseType: 'json',
    })
    .then(function (response){           
      console.log(response.data);
      const budgetParsed = new Budget;

      self.setState({
        budgetParsed: budgetParsed.budgetThirtyDays(self.state.balance, response.data)
      })

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

  render(){
    return(
      <div className="App">
        <NavButton navState={this.state.navState} budgetNav={()=> this.handleBudgetOverlook(this)} onClick={() => this.handleNavClick(this)}></NavButton>
        <CalendarView budget={this.state.budgetParsed}></CalendarView>
        
      </div>
      
    );
  }

}

export default App;
