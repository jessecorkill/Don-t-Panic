import React from 'react';
import logo from './logo.svg';
import './App.css';
import {ApolloClient, InMemoryCache, HttpLink, ApolloLink, ApolloProvider, useQuery, gql, createHttpLink} from '@apollo/client'
import 
// import Budget from './budgetHandler';

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
  if(props.budget !== null){
    const budgetDays = theBudget.map((day) => <div className="calendarDay" key={day[0]}><h2>{new Date(day[0]).getDate()}</h2><p>${day[1]}</p></div>);

    return(
      <div id="calendarContainer">
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
      budget: null,


    }

  }
  componentDidMount(){
      console.log('component mounted')
      //if data is available, fetch data
      //To DO: fetch data from server
      const budget = require("./myBudget.json");
      if(budget !== null){
        this.setState({
          budget: budget,
        })
      }
      const link = new createHttpLink({
        uri: 'https://budget.caylaslifemusic.com',
        credentials: 'same-origin',
        headers: {
          'content-type': 'application/json',
          'Method': 'GET',
        }
      })
      // enable cors
      var express = require('express')
    var cors = require('cors')
    var app = express()
      var corsOptions = {
        origin: '<insert uri of front-end domain>',
        credentials: true // <-- REQUIRED backend setting
      };

      app.use(cors(corsOptions));
      const client = new ApolloClient({
        cache: new InMemoryCache(),
        link,
      });
      // const client = ...

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
      .then(result => console.log(result));

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
        <CalendarView budget={this.state.budget}></CalendarView>
        
      </div>
      
    );
  }

}

export default App;
