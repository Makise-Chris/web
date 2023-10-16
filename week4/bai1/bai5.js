function checkCashRegister(price, cash, cid) {
    const currencyUnits = [
      ["PENNY", 0.01],
      ["NICKEL", 0.05],
      ["DIME", 0.1],
      ["QUARTER", 0.25],
      ["ONE", 1],
      ["FIVE", 5],
      ["TEN", 10],
      ["TWENTY", 20],
      ["ONE HUNDRED", 100]
    ];
  
    let changeDue = cash - price;
    let change = [];
  
    let cashInDrawer = cid.reduce((acc, curr) => {
      acc.total += curr[1];
      acc[curr[0]] = curr[1];
      return acc;
    }, { total: 0 });
  
    if (changeDue > cashInDrawer.total) {
      return { status: "INSUFFICIENT_FUNDS", change: [] };
    }
  
    if (changeDue === cashInDrawer.total) {
      return { status: "CLOSED", change: cid };
    }
  
    for (let i = currencyUnits.length - 1; i >= 0; i--) {
      const currencyName = currencyUnits[i][0];
      const currencyValue = currencyUnits[i][1];
      let amountToReturn = 0;
  
      while (cashInDrawer[currencyName] > 0 && changeDue >= currencyValue) {
        changeDue -= currencyValue;
        cashInDrawer[currencyName] -= currencyValue;
        amountToReturn += currencyValue;
  
        changeDue = Math.round(changeDue * 100) / 100;
        cashInDrawer[currencyName] = Math.round(cashInDrawer[currencyName] * 100) / 100;
      }
  
      if (amountToReturn > 0) {
        change.push([currencyName, amountToReturn]);
      }
    }
  
    if (changeDue > 0) {
      return { status: "INSUFFICIENT_FUNDS", change: [] };
    }
  
    return { status: "OPEN", change: change };
}