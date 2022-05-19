import React from 'react';
import logo from './logo.svg';
import './App.css';

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

//Function Component for Creating Budget View
function BudgetCalendarView(props){
  
}


//Function Component for Calendar View

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: true,
      modalScreen: 'edit',
      navState: 'hidden',

    }

  }
  componentDidMount(){
      //if data is available, fetch data 
      
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
      </div>
      
    );
  }

}

export default App;
