# Weather-App
Welcome all of you to this Repo of Weather APP.

In this Weather APP we build using 
1- HTML
2- CSS
3- Boxicons CSS Library
4- Vanilla Javascript
5- Open Weather MAP API

This readme documents covers how this weather app project function performs with the help of Open Weather API integration.

We select all the CSS classes mentioned in HTML File & assign them a variable to perform function by using querySelector.
By Selecting the input tag of html we added a function using Event Listener. The Function is when you enter your location in the input & by clicking the Enter the function start getting details of weather.
if the input field is empty & you hit enter the Function is not performed.

Now Moving Forward to the next Button, which retrieve your device location. Incase, you want to get weather details according to your current device location. After Pressing the button, it first checks that your browser support the geo-location. if your browser doesn't support geo-location then it generates an alert regarding that your "browser is not supported for geo-location". or if your browser supports the gro-location. then, it retrivering your location details in form of latitude and longitude.
