![Banner](images/Implementing%20CORS.png)

<h4 align='center'>NOTE: I used the previous project in week 11 making RESTful API.</h4>

<h5 align='center'>Link for previous week 11 assignment :</h5>

<p align='center'>
<a href="https://week-11-sanhendrindp-production.up.railway.app/">week-11-sanhendrindp-production.up.railway.app/</a>
</p>

# Introduction

CORS stands for Cross-Origin Resource Sharing. It is a security feature implemented by web browsers to control and restrict web page scripts or applications running at one origin (domain) from making requests to a different origin (domain).

In this assignment, I try to implementing CORS in my previous RESTful API in week 11. The CORS that I implemented will run on a local server, which is **port: 7000** and **port: 8000**. I will also implement x-request-id in the response header, and setup helmet as protection against common web vulnerabilities.

# Set x-request-id in response header

In folder middleware, I created a new middleware called **requestIdMiddlware**.

  <p align="center">
    <img src="images/requestIdMiddleware.PNG"> 
  </p>

In that code, I install **UUID** package that is used for the uniqueness of an identifier when generated in x-request-id header.

```
npm i uuid
```

If the x-request-id header exists in the incoming request, it will sets the x-request-id header in the response to the value of the existing header using res.setHeader().

In summary, it will sets the generated UUID as the x-request-id header in the response. This middleware ensures that each incoming request is associated with a unique x-request-id, either by using an existing one or generating a new one.

Then in folder app.js, i call requestIdMiddleware to all my routes especially for root route ("/"). So this will ensure that any requests passing through these routes will be modified or get the appropriate x-request-id.

  <p align="center">
    <img src="images/Applying requestIdMiddleware.PNG"> 
  </p>

# Implementing CORS

## Global CORS

In this setup, i implement a global CORS on app.js that will run on front-end in **port: 7000** and **port: 8000**.

  <p align="center">
    <img src="images/Cors Global.PNG"> 
  </p>

This means, when request from front-end is in port: 7000 and port: 8000, it will be allowed by CORS for all methods which is GET, POST, PUT, DELETE. Then I tried to implement CORS pre-flight and added method OPTIONS and handle the responds for all routes with **app.options('\*')**.

## Independent CORS

For this setup, i implement independent CORS in folder routes for product-routes.js and order-routes.js.

  <p align="center">
    <img src="images/Cors Independent for ClientX.PNG"> 
  </p>

In product-routes.js, i define **client-x** will get allowed by CORS to request get all products with method GET. This will run on port: 7000 in front-end.

  <p align="center">
    <img src="images/Cors Independent for ClientY.PNG"> 
  </p>

In order-routes.js, i define **client-y** will get allowed by CORS to request get all orders. This will run on port: 8000 in front-end.

## Testing

  <p align="center">
    <img src="images/Fetch on PORT 7000.PNG" width="800"> 
    <br>
    <em>Fetching request in port: 7000 will allowed by CORS.</em>
  </p>
    <br>
  <p align="center">
    <img src="images/Fetch on PORT 8000.PNG" width="800"> 
    <br>
    <em>Fetching request in port: 8000 will allowed by CORS.</em>
  </p>
    <br>
  <p align="center">
    <img src="images/Fetch on PORT 6500.PNG" width="800"> 
    <br>
    <em>Fetching request in port: 6500 will not allowed by CORS.</em>
  </p>
