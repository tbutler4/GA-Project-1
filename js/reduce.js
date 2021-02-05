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
  //Returning tally for variable on line 52
  return tally;
}
