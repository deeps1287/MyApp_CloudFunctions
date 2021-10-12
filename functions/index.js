const functions = require("firebase-functions");
const https = require("http");

exports.helloWorld = functions.https.onRequest((req, res) => {
  res.send("Hello from Firebase to Deepak !");
});

exports.productSearch = functions.https.onRequest((request, response) => {
  const UserMark=request.query.UserMark;
  const Khkbn=request.query.Khkbn;
  const Searchkey=request.query.Searchkey;
  const latitude=request.query.latitude;
  const longitude=request.query.longitude;


  const options = {
    host: "quiet-wave-01307.herokuapp.com",
    // path: "/rest/fits",
    path: "/rest/fits?UserMark="+UserMark+
                        "&Khkbn="+Khkbn+
                        "&Searchkey="+ Searchkey+
                        "&latitude="+ latitude+
                        "&longitude="+ longitude,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };


  const req = https.request(options, function(res) {
    console.log("STATUS: " + res.statusCode);
    console.log("HEADERS: " + JSON.stringify(res.headers));
    const bodyChunks = [];
    res.on("data", function(chunk) {
      bodyChunks.push(chunk);
    }).on("end", function() {
      const body = Buffer.concat(bodyChunks);
      console.log("BODY: " + body);
      // response.send("" + body);
      response.writeHead(200, {
        "Content-Length": body.length,
        "Content-Type": "application/json",
      });
      response.write(body);
      response.end();
    });
  });

  req.on("error", function(e) {
    console.log("ERROR: " + e.message);
  });

  req.end();
});

// Function : Dummy for testing
// Created by - Deepak , date - 20211008
exports.productDetail = functions.https.onRequest((request, response) => {
  const Searchkey=request.query.Searchkey;
  const Skucode=request.query.Skucode;

  const options = {
    host: "quiet-wave-01307.herokuapp.com",
    // path: "/rest/fits1",
    path: "/rest/fits1?Searchkey="+Searchkey+
                       "&Skucode="+Skucode,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };


  const req = https.request(options, function(res) {
    console.log("STATUS: " + res.statusCode);
    console.log("HEADERS: " + JSON.stringify(res.headers));
    const bodyChunks = [];
    res.on("data", function(chunk) {
      bodyChunks.push(chunk);
    }).on("end", function() {
      const body = Buffer.concat(bodyChunks);
      console.log("BODY: " + body);
      // response.send("" + body);
      response.writeHead(200, {
        "Content-Length": body.length,
        "Content-Type": "application/json",
      });
      response.write(body);
      response.end();
    });
  });

  req.on("error", function(e) {
    console.log("ERROR: " + e.message);
  });

  req.end();
});
