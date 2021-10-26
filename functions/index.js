const functions = require("firebase-functions");
const https = require("http");

// ############## DUMMY LIVE ####################
exports.getItems = functions.https.onRequest((request, response) => {
  // var user = WL.Server.getActiveUser();
  console.log(">> /rest2/fits/aitaiRequest/items/");
  console.log("USER: ");

  const data = {
    UserMark: "USER",
    Sdate: request.query.seriDate,
    khkbn: request.query.khkbn,
    baicd: request.query.baicd,
    ebuncd: request.query.ebuncd,
  };

  const input = {
    host: "quiet-wave-01307.herokuapp.com",
    path: "/rest2/fits/aitaiRequest/items/items",
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    json: true, // <--Very important!!!
    body: JSON.stringify(data),
  };

  const req = https.request(input, function(res) {
    const bodyChunks = [];
    res.on("data", function(chunk) {
      bodyChunks.push(chunk);
    }).on("end", function() {
      const body = Buffer.concat(bodyChunks);

      response.writeHead(200, {
        "Content-Type": "application/json; charset=utf-8",
        "Content-Length": body.length,
      });

      response.write(body);
      response.end();
    });
  });

  req.on("error", function(e) {
    console.log("ERROR: " + e.message);
  });
  // req.write(data);
  req.end();
});


// ############## APP BASE : DIRECT CALL FUNCTIONS ####################
exports.CALLbyApp_central_only = functions
    .https.onCall((data, context) => {
      return "Hello from : CALLbyApp_central_only ";
    });

exports.CALLbyApp_asia_only = functions
    .region("asia-northeast1")
    .https.onCall((data, context) => {
      return "Hello from : CALLbyApp_asia_only ";
    });

exports.CALLbyApp_asia_central = functions
    .region("asia-northeast1", "asia-northeast2", "us-central1")
    .https.onCall((data, context) => {
      return "Hello from : CALLbyApp_asia_central ";
    });

// ############## HTTP BASE : HTTP CALL FUNCTIONS ####################
exports.CALLByHttp_central_only = functions
    .https.onRequest((req, res) => {
      res.send("Hello from --> CALLByHttp_central_only");
    });

exports.CALLByHttp_asia_only = functions
    .region("asia-northeast1")
    .https.onRequest((req, res) => {
      res.send("Hello from --> CALLByHttp_asia_only");
    });

exports.CALLByHttp_asia_central = functions
    .region("asia-northeast1", "asia-northeast2", "us-central1")
    .https.onRequest((req, res) => {
      res.send("Hello from CALLByHttp_asia_central");
    });

// ############## GENERAL ####################

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
