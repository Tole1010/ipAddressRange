let ipAdrese = document.querySelector("#ipAdrese");
let table = document.querySelector("table");

function onExtractIp() {
  let ipAdreseArray = ipAdrese.value.split(",");
  let ipAdreseInt = [];

  ipAdreseArray.forEach((el) => {
    let splitEl = el.split("-").map((item) => {
      let trimmedItem = item.trim();
      return ipToNum(trimmedItem);
    });
    if (!isNaN(splitEl[0]) && !isNaN(splitEl[1])) {
      ipAdreseInt.push(splitEl);
    }
  });

  let sortedArray = ipAdreseInt.sort(function (a, b) {
    return a[0] - b[0];
  });

  let resultArray = [];

  for (let j = 0; j < sortedArray.length; j++) {
    if (!valueExistsInArray(sortedArray[j][0], resultArray)) {
      let startNum = sortedArray[j][0];
      let endNum = sortedArray[j][1];
      for (let i = j; i < sortedArray.length; i++) {
        if (
          sortedArray[i][0] >= startNum &&
          sortedArray[i][0] <= endNum + 1 &&
          sortedArray[i][1] > endNum
        ) {
          endNum = sortedArray[i][1];
        }
      }
      resultArray.push([startNum, endNum]);
    }
  }
  let result = [];

  resultArray.forEach((el) => {
    result.push([numToIp(el[0]), numToIp(el[1])]);
  });

  deleteTableRows(table);
  populateTableBody(result, table);
}

function ipToNum(ip) {
  return ip
    .split(".")
    .map(parseFloat)
    .reduce((total, part) => total * 256 + part);
}

function numToIp(num) {
  let ip = num % 256;

  for (let i = 3; i > 0; i--) {
    num = Math.floor(num / 256);
    ip = (num % 256) + "." + ip;
  }

  return ip;
}

function valueExistsInArray(val, arr) {
  return arr.some((el) => {
    return val >= el[0] && val <= el[1];
  });
}

function populateTableBody(arr, table) {
  let tableBody = table.querySelector("tbody");
  arr.forEach((el) => {
    let newTd = document.createElement("td");
    newTd.innerHTML = `${el[0]}-${el[1]}`;
    let newTr = document.createElement("tr");
    newTr.appendChild(newTd);
    tableBody.appendChild(newTr);
  });
}

function deleteTableRows(table) {
  let tableBody = table.querySelector("tbody");

  while (tableBody.lastElementChild) {
    tableBody.removeChild(tableBody.lastElementChild);
  }
}

function onClear() {
  ipAdrese.value = "";
  deleteTableRows(table);
}
