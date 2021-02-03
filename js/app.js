// Creating object to store data api
let myData = {};
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
// map api with setTimeout to insure data loading
setTimeout(function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 38.1231701, lng: -122.2523552 },
    zoom: 8,
  });
  setMarkers(map);
}, 100);

function setMarkers(map) {
  for (let i = 0; i <= 110; i++) {
    const incident = myData[i];
    new google.maps.Marker({
      position: { lat: Number(incident.geocoding.lat), lng: Number(incident.geocoding.long) },
      map,
      title: incident.title,
    });
  }
};