import React from 'react';
import logo from './logo.svg';
import './App.css';
import {ApolloClient, InMemoryCache, HttpLink, ApolloLink, ApolloProvider, useQuery, gql, createHttpLink} from '@apollo/client';
import {BudgetView} from './components/BudgetView.js';
import {Budget} from './budgetHandler';
import {CalendarView} from './components/CalendarView.js';
import LoginView from './components/LoginView.js';
import {NavButton} from './components/NavButton.js';
import CreateCredentials from './components/CreateCredentials.js';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: true,
      modalScreen: 'login',
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
    this.handleLoginEdit = this.handleLoginEdit.bind(this);    
    this.handleBalanceSet = this.handleBalanceSet.bind(this);
    this.handleLoginNew = this.handleLoginNew.bind(this);
    this.fetchBudget = this.fetchBudget.bind(this);
    this.updateBudget = this.updateBudget.bind(this);
  }
  componentDidMount(){
      console.log('App component mounted')
      this.fetchBudget()
  }
  //fetch data from API
  fetchBudget(){
    // //todo: check if user is logged in
    // if(this.state.loggedIn === true){
    //     //if data is available, fetch data
    //     const client = new ApolloClient({
    //       uri: 'https://budget.caylaslifemusic.com/graphql',
    //       cache: new InMemoryCache(),
    //       credentials: 'same-origin',
    //       headers: {
    //         'content-type': 'application/json',
    //         'Method': 'POST',
    //         'Authorization': 'Basic ' + btoa(this.state.userName + ':' + this.state.password),
    //       }
    //     })
  
    //     client
    //     .query({
    //       query: gql`
    //       query NewQuery($title: String = "${this.state.userName}") {
    //         budgets(where: {title: $title}) {
    //           nodes {
    //             budgetFields {
    //               expenses {
    //                 amount
    //                 chargeDay
    //                 expenseName
    //                 frequency
    //                 weekDay
    //               }
    //               income {
    //                 amount
    //                 chargeDay
    //                 expenseName
    //                 frequency
    //                 weekDay
    //               }
    //             }
    //           }
    //         }
    //       }
    //       `
    //     })
    //     .then(result =>       
    //       this.passBudget(result)
    //     );
    // }else{
    //   alert("You must login first!");
    //   //todo: switch modalScreen to Login component
    // }

  }

  //passes response to the budgetHandler.js
  passBudget(result){
    const budgetParsed = new Budget;
    this.setState({
      budgetObj: result.data.budgets.nodes[0].budgetFields,
      budgetParsed: budgetParsed.budgetThirtyDays(this.state.balance, result.data.budgets.nodes[0].budgetFields)
    })      
  }
  updateBudget(newBudget){
    this.setState({
      budgetParsed: newBudget
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
  handleLoginNew(){
    this.setState({
      modalScreen: "newLogin",
    })
  }
  handleLoginEdit(){
    this.setState({
      modalScreen: "login",
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
        <CreateCredentials modalScreen={this.state.modalScreen}></CreateCredentials>
        <NavButton navState={this.state.navState} editNav={this.handleBudgetEdit} budgetNav={this.handleBudgetOverlook} loginNav={this.handleLoginEdit} onClick={this.handleNavClick}></NavButton>
        <LoginView navState={this.state.navState} editNav={this.handleBudgetEdit} budgetNav={this.handleBudgetOverlook} modalScreen={this.state.modalScreen} newLoginNav={this.handleLoginNew}></LoginView>
        <CalendarView modalScreen={this.state.modalScreen} budget={this.state.budgetParsed}></CalendarView>
        <BudgetView modalScreen={this.state.modalScreen} setBal={this.handleBalanceSet} bal={this.state.balance} budgetObj={this.state.budgetObj} updateBudget={this.updateBudget} un={this.userName} pw={this.password}></BudgetView>
        
      </div>
      
    );
  }

}

export default App;
