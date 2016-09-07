// TO DO: 
//  * Format the Next Arrival date (firsttrain) using momentjs so it has the appropriate format
// not sure where to set it, in input? or in text update
// * Also may beed to remove the 'time' type off of the firstTrain 
// * How to take a user input time and then use it with momentJs and also how make it a number it is currently NaN


// Config of firebase
  var config = {
    apiKey: "AIzaSyBakPK9xpACE6hUqVx37cfxPl0IOq6Lr_Y",
    authDomain: "trainscheduler-8a040.firebaseapp.com",
    databaseURL: "https://trainscheduler-8a040.firebaseio.com",
    storageBucket: "trainscheduler-8a040.appspot.com",
  };
  firebase.initializeApp(config);

 var database = firebase.database();

// Current time
 var currentTime = moment();
 console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

 // // the next train arrival time
 // var nextTrain = moment().add(timeTillNextTrain, "minutes");
 // console.log("Next Arrival Time: " + moment(nextTrain).format("hh:mm"));

getDatabase();

$('#addTrain').on('click', function(){
	var trainName = $('#trainName').val().trim();
	var destination = $('#destination').val().trim();
	var firstTrain = $('#firstTrain').val();
	var frequency = $('#frequency').val();

	console.log(trainName, destination, firstTrain, frequency);

	// Puts the first train time into a usable number and pushed back a year to make sure it happens before current time
	var firstTimeConverted = moment(firstTrain,"hh:mm").subtract(1, "years");
		console.log("This is the first train converted:" + firstTimeConverted);

	// Difference between the times
	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	console.log("DIFFERENCE IN TIME: " + diffTime);

	// Take the difference
	var timeRemainder = diffTime % frequency;
	console.log("This is the remainder: "+ timeRemainder);

	// Minute until the train
	var timeTillNextTrain = frequency - timeRemainder; 
	console.log("MINUTES TILL TRAIN: " + timeTillNextTrain);


	
	database.ref().push({
		trainName: trainName,
		destination: destination,
		firstTrain: firstTrain,
		frequency: frequency,
		timeTillNextTrain: timeTillNextTrain,
		created: firebase.database.ServerValue.TIMESTAMP,
		modified: firebase.database.ServerValue.TIMESTAMP

	});
	$('input').val("");


});

function getDatabase(){
	database.ref().on("child_added", function(snapshot) {
		var databaseObject = snapshot.val();
		console.log("This is a snapshot of database: " + JSON.stringify(snapshot.val()));

		var row= "";
		row += "<tr>"+
				"<td>" + databaseObject.trainName + "</td>" + 
				"<td>" + databaseObject.destination + "</td>" +
				"<td>" + databaseObject.frequency + "</td>" +
				// "<td>" + nextTrain + "</td>" +
				"<td>" + databaseObject.timeTillNextTrain + "</td>" +
				"</tr>";

		$('#tbody').append(row);

	});	
}




