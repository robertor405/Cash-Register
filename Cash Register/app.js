function checkCashRegister(price, cash, cid) {
  // Calculate the amount of change needed, multiplied by 100 to avoid floating-point precision issues
  let change = cash * 100 - price * 100; // in this example it would be 100 * 100 - 3.26 * 100 which equals 9674
 
  // Calculate the total amount in the cash register (cid), multiplied by 100 to avoid floating-point precision issues
  let cidTotal = 0; // cash in drawer
  for (let elem of cid) { // elem is the amount and variety of change in drawer
    cidTotal += elem[1] * 100; // elem[1] is the array of change in cid, and * 100 multiplies everything by 100
  }

  // Check if the change needed is greater than the total amount in the cash register
  if (change > cidTotal) { // if the change is greater than the amount in the cash register return insufficient funds
    return { status: "INSUFFICIENT_FUNDS", change: [] }; //returns no change available
    
  }
  
  // Check if the change needed is equal to the total amount in the cash register
  else if (change === cidTotal) { // if change is equal to the amount in the register status is closed and the whole amount of cid is given back
    return { status: "CLOSED", change: cid };
  }
  // If neither of the above conditions is met, calculate the change
  else {
    let answer = [];

    // Reverse the cid array to start with the highest denominations first
    cid = cid.reverse(); // largest change to smallest

    // Object mapping money units to their corresponding value in cents
    // each is multiplies by 100
    let moneyUnits = {
      "ONE HUNDRED": 10000,
      "TWENTY": 2000,
      "TEN": 1000,
      "FIVE": 500,
      "ONE": 100,
      "QUARTER": 25,
      "DIME": 10,
      "NICKEL": 5,
      "PENNY": 1,
    };

    // Iterate through each element in the cid array
    for (let elem of cid) {
      // Create a holder array to store the currency name and the amount of currency used for change
      let holder = [elem[0], 0]; // amount in the array of hundreds, twentys, pennies, etc...
  

      // Convert the amount in the cid to cents
      elem[1] = elem[1] * 100; // the amount of each in pennies * 100 example: 10000 make a one hundred bill
      

      // While there is still change needed and there is still currency of the current denomination in the cid
      while (change >= moneyUnits[elem[0]] && elem[1] > 0) {
        // Reduce the change and the amount in the cid by the value of the current currency
        change -= moneyUnits[elem[0]];
        elem[1] -= moneyUnits[elem[0]];
        console.log(elem[1] -= moneyUnits[elem[0]])

        // Add the value of the current currency to the holder array
        holder[1] += moneyUnits[elem[0]] / 100;
      }
      

      // If there was some currency used for change, add the holder array to the answer array
      if (holder[1] > 0) {
        answer.push(holder);
      }
    }

    // If there is still change remaining, it means there is insufficient currency in the cash register
    if (change > 0) {
      return { status: "INSUFFICIENT_FUNDS", change: [] };
    }

    // Return the answer array with the status "OPEN"
    return { status: "OPEN", change: answer };
  }
}


  checkCashRegister(
    3.26,
    100,
    [
      ["PENNY", 1.01],
      ["NICKEL", 2.05],
      ["DIME", 3.1],
      ["QUARTER", 4.25],
      ["ONE", 90],
      ["FIVE", 55],
      ["TEN", 20],
      ["TWENTY", 60],
      ["ONE HUNDRED", 100],
    ]
  )
