const request = require("request");

const fetchMyIP = function (callback) {
  request("https://api.ipify.org?format=json", (error, response, body) => {
    //console.log("ERROR: ", error);
    //console.log("StatusCode: ", response.statusCode);
    //console.log("BODY: ", body);
    if (error) {
      return callback(error, null, response.statusCode);
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null, response.statusCode);
      return;
    }

    const ip = JSON.parse(body).ip;

    callback(null, ip, response.statusCode);
  });
};

const fetchCoordsByIP = function (ip, callback) {
  request(`http://ipwho.is/${ip}`, (error, response, body) => {
    if (error) {
      return callback(error, null, response.statusCode);
    }

    const data = JSON.parse(body);
    if (!data.success) {
      callback(data, null, response.statusCode);
      return;
    }

    callback(
      null,
      { latitude: `${data.latitude}`, longitude: `${data.latitude}` },
      response.statusCode
    );
  });
};

const fetchISSFlyOverTimes = function (locationObj, callback) {
  request(
    `https://iss-flyover.herokuapp.com/json/?lat=${locationObj.latitude}&lon=${locationObj.longitude}`,
    (error, response, body) => {
      //console.log("error: ", error);
      //console.log("response: ", response);
      //console.log("body: ", body)
      console.log(response.statusCode)

      if (body === "invalid coordinates") {
        callback("invalid coordinates", null , response.statusCode)
        return "invalid coordinates"
      }
      if (error) {
        callback(error, null, response.statusCode);
        return;
      }
      //this does nothing in any oth these examples becasue with an invalid url it still returns a code
      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching ISS pass time: ${body}`;
        callback(Error(msg), null, response.statusCode);
        return;
      }

      const data = JSON.parse(body).response;
      //console.log("DATA: ", data.response);

      callback(null, data, response.statusCode);
    }
  );
};

const nextISSTimesForMyLocation = function (callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIP(ip, (error, locationObj) => {
      if (error) {
        return callback(error,null);
      }
      fetchISSFlyOverTimes(locationObj,(error, passes) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, passes)
      })
    })
  })


}

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };
