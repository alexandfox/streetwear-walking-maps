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
	console.log(mapObject.neighborhood)

	directionsService.route(map, function(response, status) {
		if (status === 'OK') {
			directionsDisplay.setDirections(response);
			var route = response.routes[0];
			var summaryPanel = document.getElementById('directions-panel');
			summaryPanel.innerHTML = '';
			// For each route, display summary information.
			for (var i = 0; i < route.legs.length; i++) {
				var routeSegment = i + 1;
				summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
						'</b><br>';
				summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
				summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
				summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
			}
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