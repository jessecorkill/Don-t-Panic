export class Budget{
  constructor(){

  }
  budgetThirtyDays(todaysBal, budgetObj){
    var expenses = budgetObj.expenses;
    var income = budgetObj.income;
    //Balance Prediction Var
  
  //Array for storing predicted balances for each day in 30 iterations
  let predictedBal = new Array(30).fill(0);
  //Array for storing associated Date() for each day in 30 iterations
  let assocDates = new Array(30).fill(null);
  //Array for storing details of what transpired on the predicted day
  let assocDetails = Array.from({ length: 30 }, () => []);
  
  //Insert todaysBal into first day of our new array
  predictedBal[0] = todaysBal;
  
  //Get current Date
  const today = new Date();
  
  //Loop through next 30 Days of expenses & income
  for (var index = 0; index < 30; index++) {
    //Get the day
    var date = new Date(today);
    date.setDate(date.getDate() + index);
    //Record the Date obj in the assocDates array
    assocDates[index] = date;
    console.log(index);
  
    //Prime this day's balance with yesterday's balance, unless it is the first day.
    if (index !== 0) {
      //Previous day's balance
      var prevDay = predictedBal[index - 1];
      predictedBal[index] = prevDay;
    }
    //Check budget for income
    income.forEach((element) => {
      if (element.chargeDay == date.getDate() && element.frequency != "w") {
        console.log("Iteration Day & Iterated Element's Day Match");
        //Monthly Income
        if (element.frequency === "m") {
          //Made money this day, so we add to this day's balance
          predictedBal[index] = predictedBal[index] + element.amount;
          // Log element's description value to the description Array (compensate for muliple entries on a day)
          assocDetails[index].push(element.expenseName + " +" + element.amount + " ");
        } else if (element.frequency === "b") {
          //Bi-Weekly or Salary Income
          //push expense to current iteration's day
          predictedBal[index] = predictedBal[index] + element.amount;
          assocDetails[index].push(element.expenseName + " +" + element.amount + " ");
          //Add same balance to the predictedBal 15 indexes over
          //If there is, at least, 15 days left to predict, push expense to arrays.
          if (index <= 14) {
            //push expense to 14 days (two weeks) in future
            predictedBal[index + 14] = predictedBal[index + 14] + element.amount;
            assocDetails[index + 14].push(element.expenseName + " +" + element.amount + " ");
          } else {
            console.log("Charge fell outside of 30 day prediction");
          }
        } else {
        }
      } else if (element.frequency === "w") {
        //Get the targeted day of the week
        let targetDay = element.weekDay;
        //Check if this day's weekday matches the targetDay
        if (date.getDay() === targetDay) {
          predictedBal[index] = predictedBal[index] + element.amount;
          assocDetails[index].push(element.expenseName + " +" + element.amount + " ");
        }
      } else {
        //Element did not match index
      }
    });
    //Check budget for expenses
    expenses.forEach((element) => {
      //if the element's day is the same as the current iteration's day, start working
      if (element.chargeDay == date.getDate() && element.frequency != "w") {
        console.log("Iteration Day & Iterated Element's Day Match");
        //Monthly Income
        if (element.frequency === "m") {
          //Made money this day, so we add to this day's balance
          predictedBal[index] = predictedBal[index] - element.amount;
          // Log element's description value to the description Array (compensate for muliple entries on a day)
          assocDetails[index].push(element.expenseName + " -" + element.amount + " ");
        } else if (element.frequency === "b") {
          //Bi-Weekly or Salary Income
          //push expense to current iteration's day
          predictedBal[index] = predictedBal[index] - element.amount;
          assocDetails[index].push(element.expenseName + " -" + element.amount + " ");
          //Add same balance to the predictedBal 15 indexes over
          //If there is, at least, 15 days left to predict, push expense to arrays.
          if (index <= 14) {
            //push expense to 14 days (two weeks) in future
            predictedBal[index + 14] = predictedBal[index + 14] - element.amount;
            assocDetails[index + 14].push(element.expenseName + " -" + element.amount + " ");
          } else {
            console.log("Charge fell outside of 30 day prediction");
            console.log(element.expenseName);
          }
        } else {
        }
      } else if (element.frequency === "w") {
        //Get the targeted day of the week
        let targetDay = element.weekDay;
        //Check if this day's weekday matches the targetDay
        if (date.getDay() === targetDay) {
          predictedBal[index] = predictedBal[index] - element.amount;
          assocDetails[index].push(element.expenseName + " -" + element.amount + " ");
        }
      } else {
        //Element did not match index
      }
    });
  }
  console.log('Associated Dates');
  console.log(assocDates);
  console.log('Predicted Bal');
  console.log(predictedBal);
  console.log('Associcated Details');
  console.log(assocDetails);
  let data = Array.from({ length: 30 }, () => []);
  for (var i = 0; i < 30; i++) {
    data[i].push(assocDates[i]);
    data[i].push(predictedBal[i]);
    data[i].push(assocDetails[i]);
  }
  var dataString = JSON.stringify(data);
  console.log(JSON.stringify(data));
  return data;
  }
  

}