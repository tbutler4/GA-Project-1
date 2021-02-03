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
// calling fetch function
response()
// Creating an array to pass in the data
var arr = [];
// Taking Json data and storing each index in myData object through a loop
const grabObj = (obj) => {
  for (var index in Object.entries(obj)){
      arr.push(Object.entries(obj)[index][1])  
  }
};

// reduce function from https://gist.github.com/quangnd/572c6d410cb6512b7f252af0f2eb7cae
var initialValue = {}
var reducer = function(tally, obj) {
  if (!tally[obj["city"]]) {
    tally[obj["city"]] = {
      "count":1,
      "city":obj.city,
      "geocoding":{
        "lat":obj.geocoding.lat,
        "long":obj.geocoding.long,
      },
      "title":obj.title,
      "links":[`https://api.846policebrutality.com/api/incidents/${obj.id}`],
    };
  } else {
    tally[obj["city"]]["count"] += 1;;
    tally[obj["city"]]["links"].push(`https://api.846policebrutality.com/api/incidents/${obj.id}`);
  }
  return tally;
}


setTimeout(function waiting(){
  var newResult = arr.reduce(reducer, initialValue) 
  // console.log(newResult)
// map api with setTimeout to insure data loading
const initMap = () => {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 38.1231701, lng: -122.2523552 },
    zoom: 8,
  });
  //Calling function to display markers and passing it the new map
  setMarkers(map);
};
initMap();
// Function to display markers kept seperate from initMap to avoid looping errors
function setMarkers(map) {
  // Marker sizes are expressed as a Size of X,Y where the origin of the image
  // (0,0) is located in the top left of the image.
  // Origins, anchor positions and coordinates of the marker increase in the X
  // direction to the right and in the Y direction down.
  const image = {
    url:
      "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
    // This marker is 20 pixels wide by 32 pixels high.
    size: new google.maps.Size(20, 32),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    anchor: new google.maps.Point(0, 32),
  };
    // Shapes define the clickable region of the icon. The type defines an HTML
  // <area> element 'poly' which traces out a polygon as a series of X,Y points.
  // The final coordinate closes the poly by connecting to the first coordinate.
  const shape = {
    coords: [1, 1, 1, 20, 18, 20, 18, 1],
    type: "poly",
  };
  console.log(newResult)
  for (const key in newResult) {
    const incident = newResult[key];
    // for(let i=0;i<incident.links.length;i++){console.log(incident.links[i], key)}
    const contentString =
      `<div id="content">
      <h1 id="test">test<h1>
      <h1>${incident.city}</h1>
      <h2> ${incident.title}(${incident.count} Incident/s)</h2> 
      <a href="${incident.links[0]}">Click Here To Learn More</a>

      </div>`;
    // console.log(incident)
    const infowindow = new google.maps.InfoWindow({
      content: contentString,
    });
    const marker = new google.maps.Marker({
      position: { lat: Number(incident.geocoding.lat), lng: Number(incident.geocoding.long) },
      map,
      icon: image,
      shape: shape,
    });
    marker.addListener("click", () => {
      infowindow.open(map, marker);
    });
  }
};
},500)





    // new google.maps.Marker({
    //   position: { lat: Number(myData.geocoding.lat), lng: Number(incident.geocoding.long) },
    //   map,
    //   title: myData.title,
    // })