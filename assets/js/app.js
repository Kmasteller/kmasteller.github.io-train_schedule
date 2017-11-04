// Firebase Tie-In
var config = {
    apiKey: "AIzaSyBQ8JHETNzWX0t89P9qii0CxCFIrWCxG84",
    authDomain: "kenneths-project-68514.firebaseapp.com",
    databaseURL: "https://kenneths-project-68514.firebaseio.com",
    projectId: "kenneths-project-68514",
    storageBucket: "kenneths-project-68514.appspot.com",
    messagingSenderId: "890547824532"
  };
  firebase.initializeApp(config);

// Setting variable for db to speak with
var db = firebase.database();

// Global Variables
var train = "";
var dest = "";
var firstTime = "";
var freq = "";
var minutesAway = "";
var nextArrival = "";

var ref = db.ref();
ref.orderByKey().on("child_added", function(snapshot) {
 	console.log(snapshot.val());

 	train = snapshot.val().trainName;
	dest = snapshot.val().destination;
	firstTime = snapshot.val().firstTrainTime;
	freq = snapshot.val().frequency;

 	var nowTime = moment().format("HH:mm");
	console.log(nowTime);

	var timeConverted = moment(firstTime, "HH:mm");

	var diff = moment().diff(moment(timeConverted), "minutes");
	console.log(diff);

	var remainder = diff % freq;
	console.log(remainder);

	minutesAway = freq - remainder;
	console.log(minutesAway);

	nextArrival = moment().add(minutesAway, "minutes").format("HH:mm");
	console.log(nextArrival);

 	var newRow = $("<tr>");

	newRow.append("<td>" + snapshot.val().trainName + "</td>");
	newRow.append("<td>" + snapshot.val().destination + "</td>");
	newRow.append("<td>" + snapshot.val().frequency + "</td>");
	newRow.append("<td>" + nextArrival + "</td>");
	newRow.append("<td>" + minutesAway + "</td>");

	$("#train-table").prepend(newRow);
});


// console.log(moment().format("HH:mm"));

$("#submit").on("click", function(event) {

	event.preventDefault();

	train = $("#train-name").val().trim();
	dest = $("#destination").val().trim();
	firstTime = $("#firstTrainTime").val().trim();
	freq = $("#frequency").val().trim();
	// IGNORE THIS CODE THAT IS COMMENTED OUT
	// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	// console.log(train);
	// console.log(dest);
	// console.log(firstTime);
	// console.log(freq);

	// var nowTime = moment().format("HH:mm");
	// console.log(nowTime);

	// var timeConverted = moment(firstTime, "HH:mm");

	// var diff = moment().diff(moment(timeConverted), "minutes");
	// console.log(diff);

	// var remainder = diff % freq;
	// console.log(remainder);

	// minutesAway = freq - remainder;
	// console.log(minutesAway);

	// nextArrival = moment().add(minutesAway, "minutes").format("HH:mm");
	// console.log(nextArrival);

	// var newRow = $("<tr>");

	// newRow.append("<td>" + train + "</td>");
	// newRow.append("<td>" + dest + "</td>");
	// newRow.append("<td>" + freq + "</td>");
	// newRow.append("<td>" + nextArrival + "</td>");
	// newRow.append("<td>" + minutesAway + "</td>");

	// $("#train-table").prepend(newRow);
	// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	db.ref().push({
		trainName: train,
		destination: dest,
		firstTrainTime: firstTime,
		frequency: freq,
		nextArrival: nextArrival,
		minutesAway: minutesAway
});

});

// Failed code snippets below
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// db.ref().on("child_added", function(snapshot) {



 	// console.log(snapshot.val());
	// var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
	// console.log(nowTime);
	// console.log(firstTimeConverted);
	// firstTrainTime = moment().diff(firstTrainTime, "HH:mm");
	// var trainCycleCount = ((nowTime - firstTrainTime) / frequency);
	// var nextCycle = Math.ceil(trainCycleCount) * frequency;
	// var nextArrival = firstTrainTime + nextCycle;
	// var minutesAway = nowTime - nextArrival;
	// console.log(nextCycle);
	// console.log(nextArrival);
	// console.log(minutesAway);

	// Change the HTML


	// Error Handling
// 	}, function(errorObject) {
// 		console.log("The read failed: " + errorObject.code);
// });
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++