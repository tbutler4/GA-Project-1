// Creating Google Map API with setTimout to insure other data loads
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
  // Starting query for night mode switch
  const modeSwitch = document.querySelector("#toggle")
  //accessing local storage to create a listener
  localStorage.setItem('listener', "false");
  //adding event listener to html switch
  modeSwitch.addEventListener(
  // creating ternary operator on click function that switches night and day theme
  "click", function switchMode(){
    localStorage.getItem('listener') === "false" ?
      initMap = () => {
      localStorage.setItem('listener', "true");
        map = new google.maps.Map(document.getElementById("map"), {
          center: { lat: 38.1231701, lng: -122.2523552 },
          zoom: 8,
          styles: dark,
        });
        // Calling function to display markers and passing it the new map
        setMarkers(map);
      }
      :
      initMap = () => {
        localStorage.setItem('listener', "false");
        map = new google.maps.Map(document.getElementById("map"), {
          center: { lat: 38.1231701, lng: -122.2523552 },
          zoom: 8,
          styles: light,
        });
        // Calling function to display markers and passing it the new map
        setMarkers(map);
      }
      initMap();
  })
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
    // Looping through data object
    for (const key in newResult) {
      // Grabbing lopoed object entry
      const incident = newResult[key];
      // Creating empty arr
      const tempArr = []
      // Looping through object entry links
      for(const link in incident.links){
        // Pushing a tag string with ending br tag into empty arr
        tempArr.push(`&#8250; <a href="${incident.links[link].link}">${incident.links[link].title}</a></br>`)
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
