// Fetch function that returns all california incidents then sends JSON data to grabObj function
const response = () => { 
  fetch('https://api.846policebrutality.com/api/incidents?filter%5Bstate%5D=California') 
  .then((data) => {
    return data.json();
  })
  .then((json) =>{  
    var posts = json;
    // posts.data is just the information minus the extra metadata
    let obj = posts.data;
    grabObj(obj);
  });
}
// Calling fetch function
response()
// Creating an array to pass in the data
var arr = [];
// Taking Json data and storing each index in myData object through a loop
const grabObj = (obj) => {
  for (var index in Object.entries(obj)){
      arr.push(Object.entries(obj)[index][1])  
  }
};

