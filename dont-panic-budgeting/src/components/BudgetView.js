import React from "react";
import {ApolloClient, InMemoryCache, HttpLink, ApolloLink, ApolloProvider, useQuery, gql, createHttpLink, Mutation} from '@apollo/client';

//Component for interacting with individual budget items
function BudgetFields(props){
    const expenseItems = props.budgetObj.expenses.map((expense, index) => 
      <div key={index + "expenseFields"} className="budgetField">
        <label>Label
          <input name={index + 'expense' + 'Name'} onChange="" placeholder={expense.expenseName}></input>
        </label>
        <label>Amount
          <input name={index + 'expense' + 'Amount'} onChange="" placeholder={expense.amount}></input>
        </label>
        <label>Frequency
          <input name={index + 'expense' + 'Frequency'} onChange="" placeholder={expense.frequency}></input>
        </label>
        <label>Weekday
          <input name={index + 'expense' + 'WeekDay'} onChange="" placeholder={expense.weekDay}></input>
        </label>
    </div>)
    const incomeItems = props.budgetObj.income.map((income, index) => 
      <div key={index + "incomeFields"} className="budgetField">
        <label>Label
          <input name={index + 'income' + 'Name'} onChange="" placeholder={income.expenseName}></input>
        </label>
        <label>Amount
          <input name={index + 'income' + 'Amount'} onChange="" placeholder={income.amount}></input>
        </label>
        <label>Frequency
          <input name={index + 'income' + 'Frequency'} onChange="" placeholder={income.frequency}></input>
        </label>
        <label>Weekday
          <input name={index + 'income' + 'WeekDay'} onChange="" placeholder={income.weekDay}></input>
        </label>
      </div>)
    return(
        <div className="expense_items">
            <h3>Edit Expense Items</h3>
            <form className="budgetForm" onSubmit={props.his}>
              {expenseItems}
              <input type="submit" value="Update Expenses"></input>
            </form>

            <h3>Edit Income Items</h3>
            <form className="budgetForm" onSubmit={props.his}>
              {incomeItems} 
              <input type="submit" value="Update Income" ></input>
            </form>

        </div>
        
    )
}

//Component for Editing Budget
export class BudgetView extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        balanceField: 0,
      }
      this.handleBalChange = this.handleBalChange.bind(this);
      this.setBalance = this.setBalance.bind(this);
      this.handleIncomeSubmit = this.handleIncomeSubmit.bind(this);
    }
    componentDidMount(){
        //Fetch 

    }
      handleIncomeSubmit(event){
        event.preventDefault();
        //Synthesize the budget object and the new updated budget data
        let oldBudget = this.props.budgetObj;
        const target = event.target;
        
        console.log(target);


        this.props.updateBudget();
      }
      handleBalChange(event){
        this.setState({
          balanceField: event.target.value
        })
      }
      hitEndpoint(){
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
                'Authorization': 'Basic ' + btoa(this.props.un + ':' + this.props.pw),
              }
            })

            client
            .query({
              query: gql`
              mutation UPDATE_BUDGET_FIELDS {
                updateBudget(input: {clientMutationId: "My Update", title: "jcorkill", id: "9"}) {
                  budget {
                    budgetFields {
                      fieldGroupName
                      expenses {
                        amount
                        chargeDay
                        expenseName
                        fieldGroupName
                        frequency
                        weekDay
                      }
                      income {
                        amount
                        chargeDay
                        expenseName
                        fieldGroupName
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
      //invoke the funciton passed form Parent Component with new data - Maybe Redundant?
      setBalance(event){
        event.preventDefault();
        this.props.setBal(this.state.balanceField)
      }
   
      render(){
        if(this.props.modalScreen === 'edit'){
          return(
            <div className="" id="editView" >  
            <form className="" onSubmit={this.setBalance}>
              <label>
                Current Balance
                <input onChange={this.handleBalChange} type="number" value={this.state.balanceField}></input>
              </label>
              <input type="submit" value="Submit" />
            </form>
            <BudgetFields budgetObj={this.props.budgetObj} his={this.handleIncomeSubmit} />
            </div>
          );
        }
    }    
  }