 import { check, sleep } from "k6";
 import http from "k6/http";
 import { Rate } from "k6/metrics";
 import * as data from './body.json';

let url = 	"http://10.227.200.51:8080";
//collect all errors in one metric
let errorRate = new Rate("API errors");
let params = { headers: { "Content-Type": "application/json"}};

 export let options = {
  // simulate rampup of traffic from 1 to 200 users over 5 minutes.
  stages: [
    { duration: "5m", target: 200 },
  ]
};

 let authenticate = function(user, password){
  let authUserRes = http.post(`${url}/login?username=${user}&password=${password}`);
     if (!check(authUserRes, { "Login Successful": (r) => r.status === 200})) {
    errorRate.add(1);
  }
};


export default function() {
    authenticate("client", "test");
    let bodyCreateOrder = data;
    let createOrderResponse = http.post(`${url}/api/orders/`,JSON.stringify(bodyCreateOrder), params);
    //get id of the created Order
    let id = createOrderResponse.json(['id']);
    // check if the authentication was successful, or increase error metric
     if (!check(createOrderResponse, { "Order Created": (r) => r.status === 200})) {
    errorRate.add(1);
  }
    authenticate("employee","test");
    //create updated values for ACCEPT order
    let updateJson = {"id": `${id}`,"status": "ACCEPTED"};
    let acceptOrderResponse = http.put(`${url}/api/orders/${id}`,JSON.stringify(updateJson), params);
    if (!check(acceptOrderResponse, { "Order Updated": (r) => r.status === 200})) {
    errorRate.add(1);
  }}

 


