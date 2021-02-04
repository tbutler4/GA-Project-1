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

// Reduce function from https://gist.github.com/quangnd/572c6d410cb6512b7f252af0f2eb7cae
var initialValue = {}
var reducer = function(tally, obj) {
  if (!tally[obj["city"]]) {
    // Creating an object with the data
    tally[obj["city"]] = {
      // If obj isnt created we create the object
      "count":1,
      "city":obj.city,
      "geocoding":{
        "lat":obj.geocoding.lat,
        "long":obj.geocoding.long,
      },
      "title":obj.title,
      "links": { 1 : {"link":`https://api.846policebrutality.com/api/incidents/${obj.id}`,"title":obj.title}} 
    };
      // Else if obj created we append an abbject included title and API link to obj.links
  } else {
    tally[obj["city"]]["count"] += 1;;
    tally[obj["city"]]["links"][tally[obj["city"]]["count"]] = {"link":`https://api.846policebrutality.com/api/incidents/${obj.id}`,"title":obj.title}    //.push(`https://api.846policebrutality.com/api/incidents/${obj.id}`);
  }
  return tally;
}

setTimeout(function waiting(){
  // Set var to implement reduce function above
  const newResult = arr.reduce(reducer, initialValue) 
  // Google Map api https://developers.google.com/maps/documentation/javascript/examples/marker-simple
  let initMap = () => {
    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 38.1231701, lng: -122.2523552 },
      zoom: 8,
      styles: [],
    });
    // Calling function to display markers and passing it the new map
    setMarkers(map);
  };
  initMap();


const dark = [
      { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
      {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#263c3f" }],
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#6b9a76" }],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#38414e" }],
      },
      {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: "#212a37" }],
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9ca5b3" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#746855" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#1f2835" }],
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{ color: "#f3d19c" }],
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: "#2f3948" }],
      },
      {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#17263c" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#515c6d" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#17263c" }],
      },
    ]

const light = []


// Starting query for night mode switch
const modeSwitch = document.querySelector("#toggle")
localStorage.setItem('listener', "false");

modeSwitch.addEventListener(
  "click", function switchMode(){
    if(localStorage.getItem('listener') === "false"){
      initMap = () => {
        localStorage.clear();
        map = new google.maps.Map(document.getElementById("map"), {
          center: { lat: 38.1231701, lng: -122.2523552 },
          zoom: 8,
          styles: dark,
        });
        // Calling function to display markers and passing it the new map
        setMarkers(map);
        console.log("log#1",localStorage.getItem('listener'))
      } 
      initMap();
      localStorage.setItem('listener', "true");
    }else{
      initMap = () => {
        localStorage.setItem('listener', "false");
        map = new google.maps.Map(document.getElementById("map"), {
          center: { lat: 38.1231701, lng: -122.2523552 },
          zoom: 8,
          styles: light,
        });
        // Calling function to display markers and passing it the new map
        setMarkers(map);
        console.log("log#2",localStorage.getItem('listener'))
      }
      initMap();
      localStorage.setItem('listener', "false");
    }
  })

// Function to display markers kept seperate from initMap to avoid looping errors
function setMarkers(map) {
  // Marker sizes are expressed as a Size of X,Y where the origin of the image
  // (0,0) is located in the top left of the image.
  // Origins, anchor positions and coordinates of the marker increase in the X
  // direction to the right and in the Y direction down.
  const image = {
    url:
    /Users/terrencebutler/Documents/GA/sei-0119/Project-1/GA-Project-1/assets/danger.png
      ("../assets/danger.png"),
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
  // Looping through data object
  for (const key in newResult) {
    // Grabbing lopoed object entry
    const incident = newResult[key];
    // Creating empty arr
    const tempArr = []
    // Looping through object entry links
    for(const link in incident.links){
      // Pushing a tag string with ending br tag into empty arr
      tempArr.push(`<a href="${incident.links[link].link}">${incident.links[link].title}</a></br>`)
    }
    // Concatenating arr of strings
    let concatString = tempArr.join('')
    // Setting content string for google map info window 
    let contentString =
      `<div id="content">
      <h1>${incident.city}</h1>
      <h2 class="testH"> Click Below to Learn More (${incident.count} Incident/s)</h2> 
      ${concatString}
      </div>`;
    // Creating Info Window https://developers.google.com/maps/documentation/javascript/examples/infowindow-simple
    const infowindow = new google.maps.InfoWindow({
      content: contentString,
    });
    // Creating Markers https://developers.google.com/maps/documentation/javascript/examples/icon-complex
    const marker = new google.maps.Marker({
      position: { lat: Number(incident.geocoding.lat), lng: Number(incident.geocoding.long) },
      map,
      icon: image,
      shape: shape,
    });
    // Adding listener to google Marker
    marker.addListener("click", () => {
      infowindow.open(map, marker);
    });
  }
};
},500)
