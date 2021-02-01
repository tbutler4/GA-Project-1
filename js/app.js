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