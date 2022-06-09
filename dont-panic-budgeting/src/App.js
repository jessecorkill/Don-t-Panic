import React from 'react';
import logo from './logo.svg';
import './App.css';
import {ApolloClient, InMemoryCache, HttpLink, ApolloLink, ApolloProvider, useQuery, gql, createHttpLink} from '@apollo/client';
import {BudgetView} from './components/BudgetView.js';
import {Budget} from './budgetHandler';
import {CalendarView} from './components/CalendarView.js';
import {LoginView} from './components/LoginView.js';
import {NavButton} from './components/NavButton.js';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: true,
      modalScreen: 'budget',
      navState: 'hidden',
      userName: 'jcorkill',
      password: 'Mupp3th@t3r',
      balance: 375,
      budgetObj: null,
      budgetParsed: null,


    }
    //Bind Component Funcitons
    this.passBudget = this.passBudget.bind(this);
    this.handleNavClick = this.handleNavClick.bind(this);
    this.handleBudgetOverlook = this.handleBudgetOverlook.bind(this);
    this.handleBudgetEdit = this.handleBudgetEdit.bind(this);
    this.handleBalanceSet = this.handleBalanceSet.bind(this);
    this.fetchBudget = this.fetchBudget.bind(this);
  }
  componentDidMount(){
      console.log('App component mounted')
      this.fetchBudget()
  }
  //fetch data from API
  fetchBudget(){
    //todo: check if user is logged in
    if(this.state.loggedIn === true){
        //if data is available, fetch data
        const client = new ApolloClient({
          uri: 'https://budget.caylaslifemusic.com/graphql',
          cache: new InMemoryCache(),
          credentials: 'same-origin',
          headers: {
            'content-type': 'application/json',
            'Method': 'POST',
            'Authorization': 'Basic ' + btoa(this.state.userName + ':' + this.state.password),
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
          this.passBudget(result)
        );
    }else{
      alert("You must login first!");
      //todo: switch modalScreen to Login component
    }

  }

  //passes response to the budgetHandler.js
  passBudget(result){
    const budgetParsed = new Budget;
    this.setState({
      budgetParsed: budgetParsed.budgetThirtyDays(this.state.balance, result.data.budgets.nodes[0].budgetFields)
    })      
  }


  //function for handling nav click
  handleNavClick(){
    //check state of nav menu
    if(this.state.navState === "hidden"){
      this.setState({
        navState: "show",
      })
    }else{
      this.setState({
        navState: "hidden",
      })
    }
  }
  //
  handleBudgetOverlook(){
    this.setState({
      modalScreen: "budget",
    })
  }
  handleBudgetEdit(){
    this.setState({
      modalScreen: "edit",
    })
  }
  handleBalanceSet(amnt){
    console.log("Balance Set")
    this.setState({
      balance: amnt,
    })
    this.fetchBudget();
  }

  render(){
    return(
      <div className="App">
        <NavButton navState={this.state.navState} editNav={this.handleBudgetEdit} budgetNav={this.handleBudgetOverlook} onClick={this.handleNavClick}></NavButton>
        <CalendarView modalScreen={this.state.modalScreen} budget={this.state.budgetParsed}></CalendarView>
        <BudgetView modalScreen={this.state.modalScreen} setBal={this.handleBalanceSet} bal={this.state.balance}></BudgetView>
        
      </div>
      
    );
  }

}

export default App;
