const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require("./iss");

const { nextISSTimesForMyLocation } = require('./iss');
// fetch ip test
// fetchMyIP((error, ip, status) => {
//   if(error) {
//     console.log("It Didn't Work! ", error)
//     console.log("Status: ", status);
//     return "It Didn't Work! ", error
//   }
//   console.log("It Worked! Returned IP: ", ip, )
//   console.log("Status: ", status);
// });

// fetchCoordsByIP("173.252.55.11", (error, locationObj, status) => {
//   if (error) {
//     console.log(
//       `It Didn't Work! Error: Success status was ${error.success}. Message was: ${error.message} `
//     );
//     console.log("Status: ", status);
//     return error;
//   } else {
//     console.log(locationObj);
//     return locationObj;
//   }
// });

// fetchISSFlyOverTimes(
//   { latitude: "43.8374576", longitude: "43.8374576" },
//   (error, passes) => {
//     if (error) {
//       console.log("ZADDY HELP ME: ", error);
//       return error
//     } else {
//       console.log("---YAAAAS SLAAAAY---");
//       console.log("Passes: ", passes)
//       return passes
//     }
//   }
// );

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});