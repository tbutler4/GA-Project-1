// Creating object to store data api
let myData = {};
console.log('mydaya 1:',myData)
// Taking Json data and storing each index in myData object through a loop
const grabObj = (obj) => {
  obj.forEach((element, i) => {
    let myIndex = i;
    let num = myIndex.toString();
    if (obj.length == 0){
      console.log("error")
      return 1
    }
    myData[`${num}`] = element
  });
  console.log('mydaya 2:',myData)
  return myData;
};
// fetch function that returns all california incidents then sends JSON data to grabObj function
const response = () => { 
  fetch('https://api.846policebrutality.com/api/incidents?filter%5Bstate%5D=California') 
  .then((data) => {
    return data.json();
  })
  .then((json) =>{  
    var posts = json;
    let obj = posts.data;
    grabObj(obj);
  });
}
// calling fetch fucntion
response()
// looping through myData with setTimeout to insure data loading
setTimeout(function(){ 
  //looping over known amount of entries
  for (let i = 0; i < 111; i++) {
    // myData has no length so I must call bracket notation of i to reach entry
    const data = myData[i];
    //creating table for grabing and appending
    const table = document.getElementById('table');
    // creating table row for individual entries
    const tableRow = document.createElement("TR");
    // creating and supplying table data entries with information
    const tableDataC = document.createElement("TD");
    tableDataC.innerText = data.city
    const tableDataD = document.createElement("TD");
    tableDataD.innerText = data.date.slice(0,10)
    const tableDataT = document.createElement("TD");
    tableDataT.innerText = data.title
    const tableDataL = document.createElement("TD");
    let linkString = ''
    for(let j = 0; j < data.links.length; j++){
      const a = document.createElement("a");
      a.setAttribute("href", data.links[j]);
      linkString += (data.links[j] + '\n')
    }
    tableDataL.innerHTML = linkString
    const tableDataTa = document.createElement("TD");
    let tagString = ''
    for(let j = 0; j < data.tags.length; j++){
      tagString += (data.tags[j] + '\n')
    }
    tableDataTa.innerHTML = tagString
    tableRow.appendChild(tableDataC);
    tableRow.appendChild(tableDataD);
    tableRow.appendChild(tableDataT);
    tableRow.appendChild(tableDataL);
    tableRow.appendChild(tableDataTa);
    table.appendChild(tableRow);   
  }
}, 50);