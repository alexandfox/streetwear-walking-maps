function initMap() {
	var directionsService = new google.maps.DirectionsService;
	var directionsDisplay = new google.maps.DirectionsRenderer;
	var displayMap = new google.maps.Map(document.getElementById('view-map'), {
		zoom: 6,
		center: {lat: 41.85, lng: -87.65}
	});
	directionsDisplay.setMap(displayMap);
	calculateAndDisplayRoute(directionsService, directionsDisplay)
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
	const mapJSON = document.getElementById("map-object").value;
	const mapObject = JSON.parse(mapJSON)
	console.log(mapObject)

	directionsService.route(mapObject.map, function(response, status) {
		if (status === 'OK') {
			directionsDisplay.setDirections(response);
			var route = response.routes[0];
			console.log("nice")
		} else {
			window.alert('Directions request failed due to ' + status);
		}
	});
}

initMap()

/* 
	origin: {'placeId': this.originPlaceId},
	destination: {'placeId': this.destinationPlaceId},
*/