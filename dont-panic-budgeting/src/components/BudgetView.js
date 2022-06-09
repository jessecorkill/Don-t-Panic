import React from "react";

//Component for interacting with individual budget items
function BudgetItems(props){
    const expenseItems = props.budgetObj.expenses.map(() => <form onSubmit=""><label>Test<input onChange=""></input></label></form>)
    const incomeItems = props.budgetObj.income.map(() => <form onSubmit=""><label>Test<input onChange=""></input></label></form>)
    return(
        <div className="expense_items">
            <h3>Edit Expense Items</h3>
            {expenseItems}
            <h3>Edit Income Items</h3>
            {incomeItems}
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
    }
    componentDidMount(){
        //Fetch 
    }
    
      handleBalChange(event){
        this.setState({
          balanceField: event.target.value
        })
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
            <BudgetItems budgetObj={this.props.budgetObj} />
            </div>
          );
        }
    }    
  }