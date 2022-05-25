export class Budget{
  constructor(){

  }
  budgetThirtyDays(todaysBal, budgetObj){
    var expenses = budgetObj.expenses;
    var income = budgetObj.income;
    //Balance Prediction Var
  
  //Array for storing predicted balances for each day in 30 iterations
  let predictedBal = new Array(31).fill(30);
  //Array for storing associated Date() for each day in 30 iterations
  let assocDates = new Array(31).fill(null);
  //Array for storing details of what transpired on the predicted day
  let assocDetails = Array.from({ length: 31 }, () => []);
  
  //Insert todaysBal into first day of our new array
  predictedBal[0] = todaysBal;
  
  //Get current Date
  const today = new Date();
  
  //Loop through next 30 Days of expenses & income
  for (var index = 0; index <= 30; index++) {
    //Get the day
    var date = new Date(today);
    date.setDate(date.getDate() + index);
    //Record the Date obj in the assocDates array
    assocDates[index] = date;
  
    //Prime this day's balance with yesterday's balance, unless it is the first day.
    if (index !== 0) {
      //Previous day's balance
      var prevDay = predictedBal[index - 1];
      predictedBal[index] = prevDay;
    }
    //Check budget for income
    income.forEach((element) => {
      if (element[2] === date.getDate() && element[0] !== "w") {
        //Monthly Income
        if (element[0] === "m") {
          //Made money this day, so we add to this day's balance
          predictedBal[index] = predictedBal[index] + element[3];
          // Log element's description value to the description Array (compensate for muliple entries on a day)
          assocDetails[index].push(element[1]);
        } else if (element[0] === "b") {
          //Bi-Weekly or Salary Income
          predictedBal[index] = predictedBal[index] + element[3];
          assocDetails[index].push(element[1]);
          //Add same balance to the predictedBal 15 indexes over
          //Has the date currently passed? If so target fifteen days behind the current index
          if (today.getDate() > date.getDate()) {
            predictedBal[index - 16] = predictedBal[index - 16] + element[3];
            assocDetails[index - 16].push(element[1]);
          } else {
            predictedBal[index + 15] = predictedBal[index + 15] + element[3];
            assocDetails[index + 15].push(element[1]);
          }
        } else {
        }
      } else if (element[0] === "w") {
        //Get the targeted day of the week
        let targetDay = element[2];
        //Check if this day's weekday matches the targetDay
        if (date.getDay() === targetDay) {
          predictedBal[index] = predictedBal[index] + element[3];
          assocDetails[index].push(element[1]);
        }
      } else {
        //Element did not match index
      }
    });
    //Check budget for expenses
    expenses.forEach((element) => {
      if (element[2] === date.getDate() && element[0] !== "w") {
        //Monthly Income
        if (element[0] === "m") {
          //Made money this day, so we add to this day's balance
          predictedBal[index] = predictedBal[index] - element[3];
          // Log element's description value to the description Array (compensate for muliple entries on a day)
          assocDetails[index].push(element[1]);
        } else if (element[0] === "b") {
          //Bi-Weekly or Salary Income
          predictedBal[index] = predictedBal[index] - element[3];
          assocDetails[index].push(element[1]);
          //Add same balance to the predictedBal 15 indexes over
          //Has the date currently passed? If so target fifteen days behind the current index
          if (today.getDate() > date.getDate()) {
            predictedBal[index - 16] = predictedBal[index - 16] - element[3];
            assocDetails[index - 16].push(element[1]);
          } else {
            predictedBal[index + 15] = predictedBal[index + 15] - element[3];
            assocDetails[index + 15].push(element[1]);
          }
        } else {
        }
      } else if (element[0] === "w") {
        //Get the targeted day of the week
        let targetDay = element[2];
        //Check if this day's weekday matches the targetDay
        if (date.getDay() === targetDay) {
          predictedBal[index] = predictedBal[index] - element[3];
          assocDetails[index].push(element[1]);
        }
      } else {
        //Element did not match index
      }
    });
  }
  let data = Array.from({ length: 31 }, () => []);
  for (var index = 0; index <= 30; index++) {
    data[index].push(assocDates[index]);
    data[index].push(predictedBal[index]);
    data[index].push(assocDetails[index]);
  }
  console.log(data);
  var dataString = JSON.stringify(data);
  return dataString;
  }
  

}