// ****************************************************************
// ****************************************************************
// ********************** Fritz Gruppe ****************************
// ********************* Suliman Farzat ***************************
// ****************************************************************
// ****************************************************************


// TODO: Replace with your project's config object
var config = {
	apiKey: "AIzaSyAA2VR7khnL7wa5BAOTwA26QB_k1jRK8Ak",
	authDomain: "fritz-gruppe-153008.firebaseapp.com",
	databaseURL: "https://fritz-gruppe-153008.firebaseio.com",
	projectId: "fritz-gruppe-153008",
	storageBucket: "fritz-gruppe-153008.appspot.com",
	messagingSenderId: "647738158741"
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database().ref('Fritz_Tourenplanung/Fahrer');

//site		
const ulList = document.getElementById('listUl');
const liList = document.getElementById('listLi');
//fahrer 1
const fahrer1OnOff = document.getElementById('fahrer1OnOff');
var fahrer1 = document.querySelector('fahrer1');
var mafiF1 = document.querySelector('mafiF1');
var trailerF1 = document.querySelector('trailerF1');
var zeitF1 = document.querySelector('zeitF1');
//fahrer 2
const fahrer2OnOff = document.getElementById('fahrer2OnOff');
var fahrer2 = document.querySelector('fahrer2');
var mafiF2 = document.querySelector('mafiF2');
var trailerF2 = document.querySelector('trailerF2');
var zeitF2 = document.querySelector('zeitF2');
//fahrer 3
const fahrer3OnOff = document.getElementById('fahrer3OnOff');
var fahrer3 = document.querySelector('fahrer3');
var mafiF3 = document.querySelector('mafiF3');
var trailerF3 = document.querySelector('trailerF3');
var zeitF3 = document.querySelector('zeitF3');
//fahrer 4
const fahrer4OnOff = document.getElementById('fahrer4OnOff');
var fahrer4 = document.querySelector('fahrer4');
var mafiF4 = document.querySelector('mafiF4');
var trailerF4 = document.querySelector('trailerF4');
var zeitF4 = document.querySelector('zeitF4');

var fahrerName;
var selectedFahrer;
var radioChanged = 0;


//map
var markers = [];
var marker;
var heatmap;
var map;
var src = 'http://www.google.com/maps/d/kml?forcekml=1&mid=1UAmecXT0q4f7N-pYfbkhG5q9Euk';
var data = {
    sender: null,
    timestamp: null,
    lat: null,
    lng: null
  };
  

  
firebase.auth().signInAnonymously().catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;

  if (errorCode === 'auth/operation-not-allowed') {
    alert('You must enable Anonymous auth in the Firebase Console.');
  } else {
    console.error(error);
  }
});
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
		uid.name = 222;
	console.log(uid);
    // ...
  } else {
    // User is signed out.
    // ...
  }
  // ...
});

//var Ref = firebase.database().ref('Fritz_Tourenplanung/Fahrer/' + fahrerName );
var databaseSend = firebase.database().ref('Fritz_Tourenplanung/Fahrer/' + 'Fahrer 1');
var databaseRecive = firebase.database().ref('Fritz_Tourenplanung/Fahrer/' + 'Fahrer 1');


//send nachricht 
var sendChat =  function (snapshot, prevChildKey) { 
    var msg = snapshot.val();
	//if (snapshot.hasChild("recieve")){
	var msgTextElement = document.createElement("p");
	//msgTextElement.className = "white-text mb-0 p-2";
    msgTextElement.textContent  = msg.recieve;  //snapshot.child('recieve').key + '   ' + 
	msgTextElement.className = "card mdb-color lighten-2 text-center z-depth-2 mb-2 white-text";
	document.getElementById("sendChat").innerHTML =  msg.recieve.replace(/"/gi, " ") ;
	//document.getElementById("sendChat").appendChild(msgTextElement);
}

//nachricht bekommen 
var recieveChat = function (snapshot, prevChildKey) {
	var msg = snapshot.val();	
	var msgUsernameElement = document.createElement("b");
	var fahrerTextElement = document.createElement("p");
	//msgUsernameElement.className = "white-text mb-0 p-2";
    msgUsernameElement.textContent = msg.send;
	fahrerTextElement.textContent = snapshot.key;
	document.getElementById("recieveChat").innerHTML = snapshot.key + ':' + msg.send.replace(/"/gi, " ") //appendChild(msgUsernameElement);
    //var msgElement = document.createElement("div");
	//msgElement.appendChild(fahrerTextElement);
    //msgElement.appendChild(msgUsernameElement);
	//document.getElementById("recieveChat").appendChild(msgElement);
	//msgElement.className = "card info-color lighten-2 text-center z-depth-2 mb-2 white-text";
}	
  
//Fahrer Liste--->
var fahrerListe = function (snapshot, prevChildKey){
		const li = document.createElement('li');
		li.className = "list-group-item z-depth-2 mb-1";
		li.innerText = snapshot.key + ' : ' +snapshot.val();
		li.id = snapshot.key;	
		ulList.appendChild(li).Trailer;		
		fahrerOnChange();
	};
	

//chat option buttons fahrer 
$(document).ready( function (){
$('#mdb-select input').on('click', function(){
		radioChanged += 1;
		//alert($('input[name=group1]:checked', '#mdb-select').val()); 
		selectedFahrer = $('input[name=group1]:checked', '#mdb-select').val();
		document.getElementById('selectFahrer').innerHTML = selectedFahrer;
		document.getElementById('selectFahrer').style.color = "green";
		console.log(selectedFahrer);
		console.log(databaseSend);
database.child(selectedFahrer).on('child_added', fahrerListe); 
});
});		


database.on('child_changed', sendChat);
database.on('child_changed', recieveChat);

	

// since I can connect from multiple devices or browser tabs, we store each connection instance separately
// any time that connectionsRef's value is null (i.e. has no children) I am offline
var myConnectionsRef = firebase.database().ref('users/Farzat/connections');

// stores the timestamp of my last disconnect (the last time I was seen online)
var lastOnlineRef = firebase.database().ref('users/Farzat/lastOnline');

var connectedRef = firebase.database().ref('.info/connected');
	connectedRef.on('value', function(snap) {
  if (snap.val() === true) {
    // We're connected (or reconnected)! Do anything here that should happen only if online (or on reconnect)
    var con = myConnectionsRef.push();

    // When I disconnect, remove this device
    con.onDisconnect().remove();

    // Add this device to my connections list
    // this value could contain info about the device or a timestamp too
    con.set(true);

    // When I disconnect, update the last time I was seen online
    lastOnlineRef.onDisconnect().set(firebase.database.ServerValue.TIMESTAMP);
  }
});

	


var usernameInput = document.querySelector('#konto'); 
var textInput = document.querySelector('#fahrerChat'); 
var postButton = document.querySelector('#post');

postButton.addEventListener("click", function(snapshot) {
    var msgUser = usernameInput.value;
    var msgText = textInput.value;
	var recieve = '"' + msgText + '"';
	var postData = {
		username: msgUser,
		recieve: msgText,
		send: ''
	};
	if (radioChanged > 0) {
		//alert('Change function occurred ' + radioChanged + ' times.');
	
		/*database.set(msgUser + " says: " + msgText);*/
		//database.push({username:msgUser, recieve:msgText});
		if ( msgText  == ""){
				toastr.error('Bitte Text hinzufügen.', 'Textfeld ist Leer!')
		}else{
			// Get a key for a new Post.
			//var newPostKey = database.push().key;
			// Write the new post's data simultaneously in the posts list and the user's post list.
			var updates = {};
			updates['/' + selectedFahrer +'/recieve'] = recieve;
			updates['/user-posts/' + /*newPostKey +*/ new Date()] = postData;
			toastr.success('Die Nachricht wurde gesendet.' , 'Danke!', {timeOut: 4000});
			textInput.value = "";
			return database.update(updates);		
		}
	} else {
		alert('Bitte Radio button klicken.');
	}
	
    });

	




// Or you can save a line of code by using an inline function
// and on()'s return value.
//var recieveChat = database.on('value', function(dataSnapshot) { ... });
// Sometime later...
//var query = database.orderByChild('recieve').equalTo('joe');

//database.child('recieve').on('child_removed', recieveChat);
//database.off('child_changed', recieveChat);


/*

database.on('child_changed',  function (snapshot){	
	if (snapshot.ref.child('recieve').key) {
		recieveChat();
		console.log(snapshot.ref.child('recieve').key);
	}
	if (snapshot.ref.child('send').key) {
		database.on('child_changed',  sendChat);
		console.log(snapshot.ref.child('send').key);	
	}
	
});
//database.child("Fahrer 1").on('child_changed', startChat);
*/

function unixTime(unixtime) {
var timestamp = parseInt(data.Zeit);
    var u = new Date(unixtime);

      return ('0' + u.getUTCDate()).slice(-2) + 
			'.' + ('0' + u.getUTCMonth() + 11 ).slice(-2)+
			'.' + u.getUTCFullYear() +
			' ' + ('0' + u.getUTCHours()+13 ).slice(-2) +
			':' + ('0' + u.getUTCMinutes()).slice(-2) +
			':' + ('0' + u.getUTCSeconds()).slice(-2) +
			'.' + (u.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) 
    };






//liste	
var fahrerOnChange = function(snapshot, prevChildKey) {
	fahrerName = snapshot.key;
	var data = snapshot.val();
	var datum = unixTime(parseInt(data.Zeit))
	var trailerList= 
			"<b>"+snapshot.child('Trailer').key+" "+ snapshot.child('1').key + ": " +"</b>"+ data.Trailer[1].replace(/"/gi, " ") +
			"<b>"+snapshot.child('Trailer').key+" " + snapshot.child('2').key + ": " +"</b>"+ data.Trailer[2].replace(/"/gi, " ") +
			"<b>"+snapshot.child('Trailer').key+" " + snapshot.child('3').key + ": " +"</b>"+ data.Trailer[3].replace(/"/gi, " ") +
			"<b>"+snapshot.child('Trailer').key+" " + snapshot.child('4').key + ": " +"</b>"+ data.Trailer[4].replace(/"/gi, " ") +
			"<b>"+snapshot.child('Trailer').key+" " + snapshot.child('5').key + ": " +"</b>"+ data.Trailer[5].replace(/"/gi, " ") ;
		  
	if (fahrerName == "" || fahrerName == null)
		{
			alert("You must enter a name for your fahrerName!");
			return;
		}		  
		  

	switch (fahrerName) {
		case "Fahrer 1":
			if ( data.onOff == 'true'){
				fahrer1OnOff.className = "green accent-4 view admin-up";
				fahrer1.innerHTML = snapshot.key + ' ist online'; 
				}else{
				fahrer1OnOff.className = "red accent-4 view admin-up";
				fahrer1.innerHTML = snapshot.key + ' ist offline';
				}
			mafiF1.innerText = data.Mafi.replace(/"/gi, " ");
			zeitF1.innerHTML = datum;
			trailerF1.innerHTML = trailerList;
			//console.log(data.Trailer);
			//fahrer1OnOff.innerHTML = data.onOff;
			var date = (data.Zeit).substring(0, 13) ;

	//console.log(date.trim())
	//var timestamp = parseInt(data.Zeit);
	//var ts = new Date(timestamp);
    //console.log(ts.toUTCString());
	console.log(unixTime(parseInt(data.Zeit)))

			break;
		case "Fahrer 2":
			if ( data.onOff == 'true'){
				fahrer2OnOff.className = "green accent-4 view admin-up";
				fahrer2.innerHTML = snapshot.key + ' ist online'; }else{
				fahrer2OnOff.className = "red accent-4 view admin-up";
				fahrer2.innerHTML = snapshot.key + ' ist offline';}
			mafiF2.innerText = data.Mafi.replace(/"/gi, " ");
			zeitF2.innerHTML = datum;	
			trailerF2.innerHTML = trailerList;
			break;
		case "Fahrer 3":
			if ( data.onOff == 'true'){
				fahrer3OnOff.className = "green accent-4 view admin-up";
				fahrer3.innerHTML = snapshot.key + ' ist online'; }else{
				fahrer3OnOff.className = "red accent-4 view admin-up";
				fahrer3.innerHTML = snapshot.key + ' ist offline';}
			mafiF3.innerText = data.Mafi.replace(/"/gi, " ");
			zeitF3.innerHTML = datum;	
			trailerF3.innerHTML = trailerList;
			break;
		case "Fahrer 4":
			if ( data.onOff == 'true'){
				fahrer4OnOff.className = "green accent-4 view admin-up";
				fahrer4.innerHTML = snapshot.key + ' ist online'; }else{
				fahrer4OnOff.className = "red accent-4 view admin-up";
				fahrer4.innerHTML = snapshot.key + ' ist offline';}
			mafiF4.innerText = data.Mafi.replace(/"/gi, " ");
			zeitF4.innerHTML = datum;	
			trailerF4.innerHTML = trailerList;	
	}
	//ulChange.innerText = snapshot.key;
		 
  };

 
database.on('child_changed', fahrerOnChange); 
  
console.log(fahrerName);
  
  

  
  
  
  
  
  
  
  
  
// map start 
function makeInfoBox(controlDiv, map) {
    // Set CSS for the control border.
    var controlUI = document.createElement('div');
    controlUI.style.boxShadow = 'rgba(0, 0, 0, 0.298039) 0px 1px 4px -1px';
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '4px solid #78909c';
    controlUI.style.borderRadius = '2px';
    controlUI.style.marginBottom = '22px';
    controlUI.style.marginTop = '15px';
    controlUI.style.textAlign = 'center';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    var controlText = document.createElement('div');
    controlText.style.color = 'rgb(25,25,25)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '100%';
    controlText.style.padding = '8px';
    controlText.textContent = 'Fritz Gruppe Toutenplannung';
    controlUI.appendChild(controlText);
}

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {
          lat: 49.1833848,
          lng: 9.17934696
        },
        zoom: 18,
        styles: [{
                featureType: 'poi',
                stylers: [{
                    visibility: 'off'
                }] // Turn off POI.
            },
            {
                featureType: 'transit.station',
                stylers: [{
                    visibility: 'off'
                }] // Turn off bus, train stations etc.
            }
        ],
        disableDoubleClickZoom: false,
        streetViewControl: false,
    });
	
/*
    //my map hier 
    var kmlLayer = new google.maps.KmlLayer(src, {
        suppressInfoWindows: true,
        preserveViewport: false,
        map: map
    });
    kmlLayer.addListener('click', function(event) {
        var content = event.featureData.infoWindowHtml;
        var testimonial = document.getElementById('capture');
        testimonial.innerHTML = content;
    });*/
    var infoBoxDiv = document.createElement('div');
    makeInfoBox(infoBoxDiv, map);
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(infoBoxDiv);
    
	map.addListener('click', function(e) {
			  data.lat = e.latLng.lat();
			  data.lng = e.latLng.lng();
			  //addToFirebase(data);
			});
			
	// Create a heatmap.
	var	heatmap = new google.maps.visualization.HeatmapLayer({
		data: [],
		map: map,
		radius: 16
	});	 

	
//var data= [];
/*
var pos = new google.maps.LatLng({
                lat: data.lat,
                lng: data.lng
            });
	var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
		var marker = new google.maps.Marker({
			position: pos,
			animation: google.maps.Animation.DROP,
			map: map,
			icon: image,
			//title: data,
			//id: childKey
		});	
		marker.setMap(map);*/

// Add marker on user click
   /* map.addListener('click', function(e) {
        firebase.push({
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
        });
    });*/

    //function autoUpdate() {
        /* navigator.geolocation.getCurrentPosition(function(position) {  
					var newPoint = new google.maps.LatLng(position.coords.latitude, 
														  position.coords.longitude);

					if (marker) {
					  // Marker already created - Move it
					  marker.setPosition(newPoint);
					}
					else {
					  // Marker does not exist - Create it
					  marker = new google.maps.Marker({
						position: newPoint,
						map: map
					  });
					}

					// Center the map on the new position
					map.setCenter(newPoint);
				  }); */
			

     /* var driversMap = {};
        var markersMap = {};
		

        //change firebase
        database.on("child_changed", function(snapshot, prevChildKey) {
			// 10 minutes before current time.
			var startTime = new Date().getTime() - (5000);
			// Get latitude and longitude from Firebase.
            var childKey = snapshot.key;
            var childData = snapshot.val();
            driversMap[childKey] = childData;

            // Create a google.maps.LatLng object for the position of the marker.
            // A LatLng object literal (as above) could be used, but the heatmap
            // in the next step requires a google.maps.LatLng object.
            //--var latLng = new google.maps.LatLng(newPosition.lat, newPosition.lng);
			
            var latLng = new google.maps.LatLng({
                lat: parseFloat(driversMap[childKey].lat),
                lng: parseFloat(driversMap[childKey].lng)
            });
			
            // Place a marker at that location.
            var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
            var marker = new google.maps.Marker({
                position: latLng,
                animation: google.maps.Animation.DROP,
                map: map,
                icon: image,
                title: driversMap[childKey].info,
                id: childKey
            });
			marker.setMap(map);
			// Create a heatmap.
            var heatmap = new google.maps.visualization.HeatmapLayer({
                data: [],
                map: map,
                radius: 16
            });	  	  
			
			



            //info by click
            var contentString = '<h1>' + driversMap[childKey].chat + '</h1>' +
                 childData;
            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });
            marker.addListener('click', function() {
                infowindow.open(map, marker);
				var inhalt = document.getElementById('fahrer');
					inhalt.innerHTML = contentString;
            });

            markersMap[marker.id] = marker;
            heatmap.getData().push(latLng);
            /*setTimeout(function() {
                marker.setMap(null);
            }, 10000);*/ //remove maker after 1 sec
            /*setTimeout(function() {
                heatmap.setMap(null);
            }, 20000);//remove heatmap after 10 sec
		

        });
	*/						  
			  // Remove old data from the heatmap when a point is removed from firebase.
			/*database.on('child_removed', function(snapshot, prevChildKey) {
			  var heatmapData = heatmap.getData();
			  var i = 0;
			  while (snapshot.val().lat != heatmapData.getAt(i).lat()
				|| snapshot.val().lng != heatmapData.getAt(i).lng()) {
				i++;
			  }
			  heatmapData.removeAt(i);
			});*/
/*setTimeout(function() {
	firebase.on("child_added",function(snapshot, prevChildKey){				
		var newPosition = snapshot.val();
		var point = new google.maps.LatLng(newPosition.lat, newPosition.lng);
		var elapsed = new Date().getTime() - newPosition.timestamp;
		
		var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
		var marker = new google.maps.Marker({
				position: point,
				animation: google.maps.Animation.DROP,
				map: map,
				icon: image,
				//title: data,
			});
		//setTimeout(function(){marker.setMap(null);}, 2000);
		heatmap.getData().push(point);
		//markersArray.push(marker);
	});
}, 3000);*/
 
	/*database.on("child_added",function test(snapshot, prevChildKey){
		var newPosition = snapshot.val();
		var point = new google.maps.LatLng(newPosition.lat, newPosition.lng);
		var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
		var marker = new google.maps.Marker({
			position: point,
			animation: google.maps.Animation.DROP,
			map: map,
			//icon: image,
			//title: data,
		});
		heatmap.getData().push(point);
		
		//window. setInterval(function() {marker.setMap(null);}, 2000);
		//window.setTimeout(function() {marker.setMap(map);}, 2200);
		//clearInterval(function() {marker.setMap(null);}, 3000);

	});*/
    //var startTime = new Date().getTime() - (10 * 1000);

	database.on('child_changed', function(snapshot, prevChildKey) {
		var Ref = firebase.database().ref('Fritz_Tourenplanung/Fahrer/' + fahrerName );
		var newPosition = snapshot.val();
		var point = new google.maps.LatLng(newPosition.lat, newPosition.lng);
		var elapsed = new Date().getTime() - newPosition.Zeit;
		
		//var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
		var marker = new google.maps.Marker({
			position: point,
			//animation: google.maps.Animation.DROP,
			map: map,
		});
		//heatmap.getData().push(point);
		//var expirySeconds = Math.max(5000 - elapsed, 0);
		
		Ref.child('lat').remove();
			
		Ref.on('child_removed', function(snapshot, prevChildKey) {
		console.log('gelöscht');
		marker.setMap(null);
		//setTimeout(function () { heatmap.setMap(null); console.log(heatmap); }, 5000);
        });

		Ref.on("child_added", function(snapshot, prevChildKey){
			console.log('added');
			marker.setMap(map);
			//heatmap.getData().push(point)
			//setTimeout(function () { heatmap.getData().push(point); console.log(heatmap); }, 7000);
			});

	});
	 

	// Remove old data from the heatmap when a point is removed from firebase.
   /* database.on('child_removed', function(oldChildSnapshot) {
        window.setTimeout(function() {marker.setMap(null);}, 200)
		console.log(snapshot.val());
    });*/
	

   

	


	//initFirebase(heatmap);
}
// google.maps.event.addDomListener(window, 'load', initMap);










//add firebase
/*function initFirebase(heatmap) {
	var startTime = new Date().getTime() - (60 * 10 * 1000);
	
	
}*/


/*function getTimestamp(addClick) {
        // Reference to location for saving the last click time.
        var refer = database.child('/last_message/' + data.sender);
//firebase.database().ref('/Fritz_Tourenplanung');
        refer.onDisconnect().remove();  // Delete reference from firebase on disconnect.

        // Set value to timestamp.
        refer.set(firebase.database.ServerValue.TIMESTAMP, function(err) {
          if (err) {  // Write to last message was unsuccessful.
            console.log(err);
          } else {  // Write to last message was successful.
            refer.once('value', function(snap) {
              addClick(snap.val());  // Add click with same timestamp.
            }, function(err) {
              console.warn(err);
            });
          }
        });
      }

function addToFirebase(data) {
	 getTimestamp(function(timestamp) {
          // Add the new timestamp to the record data.
          data.timestamp = timestamp;
          var refer = database.child('meineKlicks').push(data, function(err) {
            if (err) {  // Data was not written to firebase.
              console.warn(err);
            }
        });		
		});
      }


*/

















(function(angular) {
  'use strict';
angular.
  module('ngAria_ngModelExample', ['ngAria']).
  directive('customCheckbox', customCheckboxDirective).
  directive('showAttrs', showAttrsDirective);

function customCheckboxDirective() {
  return {
    restrict: 'E',
    require: 'ngModel',
    transclude: true,
    template:
        '<span class="icon" aria-hidden="true"></span> ' +
        '<ng-transclude></ng-transclude>',
    link: function(scope, elem, attrs, ctrl) {
      // Overwrite necessary `NgModelController` methods
      ctrl.$isEmpty = isEmpty;
      ctrl.$render = render;

      // Bind to events
      elem.on('click', function(event) {
        event.preventDefault();
        scope.$apply(toggleCheckbox);
      });
      elem.on('keypress', function(event) {
        event.preventDefault();
        if (event.keyCode === 32 || event.keyCode === 13) {
          scope.$apply(toggleCheckbox);
        }
      });

      // Helpers
      function isEmpty(value) {
        return !value;
      }
      
      function render() {
        elem[ctrl.$viewValue ? 'addClass' : 'removeClass']('checked');
      }
 
      function toggleCheckbox() {
        ctrl.$setViewValue(!ctrl.$viewValue);
        ctrl.$render();
      }
    }
  };
}

function showAttrsDirective($timeout) {
  return function(scope, elem, attrs) {
    var pre = document.createElement('pre');
    elem.after(pre);

    scope.$watchCollection(function() {
      return Array.prototype.slice.call(elem[0].attributes).reduce(function(aggr, attr) {
        if (attr.name !== attrs.$attr.showAttrs) aggr[attr.name] = attr.value;
        return aggr;
      }, {});
    }, function(newValues) {
      $timeout(function() {
        pre.textContent = angular.toJson(newValues, 2);
      });
    });
  };
}
})(window.angular);