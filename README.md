# GA-Project-1
### Switch branches to view bronze/silver/gold submission
![Image of App](https://user-images.githubusercontent.com/37936292/106972166-28169c80-6705-11eb-8701-8d8f7d25a996.png)


## Technologies Used
### https://2020pb.com/ -> API : https://github.com/949mac/846-backend/
### Google Maps API https://developers.google.com/maps/documentation/javascript/examples/marker-simple

## Welcome to Family Watch where families and individuals can check on Police Brutality near them.
## This app accomplishes peace of mind when travelling or finding a place to live for those who visit. My goal of this project is to show the possibility of a large scale version which will bring together communities and bring more awareness by having factual evidence.

# Wireframe
![Family Watch](https://user-images.githubusercontent.com/37936292/106974060-e7208700-6708-11eb-94c7-7f8d169b1b62.png)

## Hurdles
### Using Google's infoWindow pop up created a barrier between DOM Manipulation and the pop up window. This was slowing down generating specific API data to show in the pop up. I instead created a string to append the specific data and used that inside as a template literal.
### Using an Event Listener to toggle night mode I was able to change the style of the map based on a listener in local storage. During this problem I learned that the listenrer sets the callback at the time of creation and not during click if specified. So I put my conditional statement inside the callback function.
### Google maps API is strict in specifying a url and creating a billing profile for using maps. Going through documentation and online suggestions really helped in narrowing down which solution was right for me.
