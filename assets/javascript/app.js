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



getDatabase();

$('#addTrain').on('click', function(){
	var trainName = $('#trainName').val().trim();
	var destination = $('#destination').val().trim();
	var firstTrain = $('#firstTrain').val();
	var frequency = $('#frequency').val();

	console.log(trainName, destination, firstTrain, frequency);

	database.ref().push({
		trainName: trainName,
		destination: destination,
		firstTrain: firstTrain,
		frequency: frequency,
		created: firebase.database.ServerValue.TIMESTAMP,
		modified: firebase.database.ServerValue.TIMESTAMP

	});
	$('input').val("");


});

function getDatabase(){
	database.ref().on("child_added", function(snapshot) {
		var databaseObject = snapshot.val();
		console.log("This is a snapshot of database: " + JSON.stringify(snapshot.val()));

		// Set the firstTrain input to have a standard format
		// var formatFrequency = moment(frequency).format(h:mm);
		// console.log("This is correct firstTrain input: " + formatFrequency);


		// gets current date (need to get the time from this though)
		var currentTime = moment().format();

		// set the Minutes Away using relative time (current time diff of first train)
		// Need to convert this difference of time to minutes.
		var minutesAway = moment(databaseObject.firstTrain).diff(currentTime, "minutes");
		console.log("This is first train time: " + JSON.stringify(databaseObject.firstTrain));


	




		var row= "";
		row += "<tr>"+
				"<td>" + databaseObject.trainName + "</td>" + 
				"<td>" + databaseObject.destination + "</td>" +
				"<td>" + databaseObject.frequency + "</td>" +
				"<td>" + databaseObject.firstTrain + "</td>" +
				"<td>" + minutesAway + "</td>" +
				"</tr>";

		$('#tbody').append(row);

	});	
}




