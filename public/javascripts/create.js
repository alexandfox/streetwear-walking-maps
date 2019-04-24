// DOM objects
const placesList = document.getElementById("places-list")
const timeDisplay = document.getElementById("total-time")

function addPlaceToList(placeID, placeName) {
  var newPlace = document.createElement("li")
  newPlace.setAttribute("class", "column draggable")
  newPlace.setAttribute("id", placeID)
  newPlace.textContent = placeName
  placesList.appendChild(newPlace)
}

function placeDivToEndpoint(div) {
  var placeID = div.getAttribute("id")
  return {'placeId': placeID}
}

function placeDivToWaypoint(div) {
  var placeID = div.getAttribute("id")
  return {location: {'placeId': placeID}}
}

// new map with places
function initialize() {
  const ironhackBCN = {       // update to user's city
    lat: 41.3977381,
    lng: 2.190471916
  };

  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var markers = [];
  var map = new google.maps.Map(document.getElementById('new-map'),
    {
      zoom: 5,
      center: ironhackBCN
    });

  var defaultBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(-33.8902, 151.1759),
    new google.maps.LatLng(-33.8474, 151.2631));
  map.fitBounds(defaultBounds);

  // Create the search box and link it to the UI element.
  var input = document.getElementById('search-place-input');
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  var searchBox = new google.maps.places.SearchBox(input);

  // Listen for the event fired when the user selects an item from the
  // pick list. Retrieve the matching places for that item.
  google.maps.event.addListener(searchBox, 'places_changed', function () {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }
    for (var i = 0, marker; marker = markers[i]; i++) {
      marker.setMap(null);
    }

    // For each place, get the icon, place name, and location.
    markers = [];
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, place; place = places[i]; i++) {
      var image = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      var marker = new google.maps.Marker({
        map: map,
        // icon: image,
        title: place.name,
        position: place.geometry.location
      });

      markers.push(marker);
      bounds.extend(place.geometry.location);
    }
    map.fitBounds(bounds);

    var infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);

    function setMarkerForm(infowindow, place, placeID) {
      return new Promise((res, rej) => {
        infowindow.setContent(`<form action="/addPlace" method="POST" class="place-details" id="add-${placeID}"><strong>` + place.name + '</strong><br>' +
        // 'Place ID: ' + place.place_id + '<br>' +
        place.formatted_address + '<br>' +
        place.rating + '<br>' +
        `<button type="submit">Add Stop</button></form>` +
        '</div>');
        res();
      }) 
    }

    places.forEach(place => {
      service.getDetails(place, function (place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          markers.forEach((marker, index) => {
            var placeID = places[index].place_id
            google.maps.event.addListener(marker, 'click', function () {
              infowindow.open(map, this);
              setMarkerForm(infowindow, places[index], placeID).then(res => {
                console.log(document.querySelector(".place-details"))
                var addForms = document.querySelectorAll(".place-details");addForms.forEach( form => form.onsubmit = function(event) {
                  event.preventDefault();
                  addPlaceToList(placeID, places[index].name)
                })
              })
            })
          });
        }
      })
    })
  });

  // Bias the SearchBox results towards places that are within the bounds of the
  // current map's viewport.
  google.maps.event.addListener(map, 'bounds_changed', function () {
    var bounds = map.getBounds();
    searchBox.setBounds(bounds);
  });

  // DIRECTIONS
  directionsDisplay.setMap(map);

  document.getElementById('update-directions').addEventListener('click', function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  });
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  var stopsList = document.querySelectorAll(".draggable")
  var origin = placeDivToEndpoint(stopsList[0])
  var destination = placeDivToEndpoint(stopsList[stopsList.length-1])
  // console.log("stopsList[0] is: ", stopsList[0])
  // console.log("stopsList[stopsList.length-1] ", stopsList[stopsList.length-1])

  // var waypts = [{location: {'placeId': "ChIJHTQ2_qWMGGARK_lj8y-fYRE"}},
	// 		{location: {'placeId': "ChIJCzp6MKGMGGARHw84njJix8c"}}];
  var waypts = [];
  stopsList.forEach( (divElem, index) => {
    if (index>0 && index < (stopsList.length -1)) {
      // console.log("new stop: ", divElem)
      waypoint = placeDivToWaypoint(divElem)
      waypts.push(waypoint);
      // console.log("stops: ", waypts)
    }
  })

  directionsService.route({
    origin: origin,
    destination: destination,
    waypoints: waypts,
    optimizeWaypoints: false,
    travelMode: 'WALKING'
  }, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
      var totalTime = 0;
      response.routes[0].legs.forEach( leg => {
        totalTime += leg.duration.value
      })

      var timeInMinutes = Math.round(totalTime/60)
      timeDisplay.textContent = timeInMinutes;
      console.log("route response: ", response)
      var route = response.routes[0];
      // var summaryPanel = document.getElementById('directions-panel');
      // summaryPanel.innerHTML = '';
      // For each route, display summary information.
      // for (var i = 0; i < route.legs.length; i++) {
      //   var routeSegment = i + 1;
      //   summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
      //       '</b><br>';
      //   summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
      //   summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
      //   summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
      // }
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

google.maps.event.addDomListener(window, 'load', initialize);





var dragSrcEl = null;

function handleDragStart(e) {
  // Target (this) element is the source node.
  dragSrcEl = this;

  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.outerHTML);

  this.classList.add('dragElem');
}
function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault(); // Necessary. Allows us to drop.
  }
  this.classList.add('over');

  e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

  return false;
}
function handleDragEnter(e) {
  // this / e.target is the current hover target.
}

function handleDragLeave(e) {
  this.classList.remove('over');  // this / e.target is previous target element.
}

function handleDrop(e) {
  // this/e.target is current target element.

  if (e.stopPropagation) {
    e.stopPropagation(); // Stops some browsers from redirecting.
  }

  // Don't do anything if dropping the same column we're dragging.
  if (dragSrcEl != this) {
    // Set the source column's HTML to the HTML of the column we dropped on.
    //alert(this.outerHTML);
    //dragSrcEl.innerHTML = this.innerHTML;
    //this.innerHTML = e.dataTransfer.getData('text/html');
    this.parentNode.removeChild(dragSrcEl);
    var dropHTML = e.dataTransfer.getData('text/html');
    this.insertAdjacentHTML('beforebegin', dropHTML);
    var dropElem = this.previousSibling;
    addDnDHandlers(dropElem);

  }
  this.classList.remove('over');
  return false;
}

function handleDragEnd(e) {
  // this/e.target is the source node.
  this.classList.remove('over');

  /*[].forEach.call(cols, function (col) {
    col.classList.remove('over');
  });*/
}

function addDnDHandlers(elem) {
  elem.addEventListener('dragstart', handleDragStart, false);
  elem.addEventListener('dragenter', handleDragEnter, false)
  elem.addEventListener('dragover', handleDragOver, false);
  elem.addEventListener('dragleave', handleDragLeave, false);
  elem.addEventListener('drop', handleDrop, false);
  elem.addEventListener('dragend', handleDragEnd, false);

}
var cols = document.querySelectorAll('#places-list .column');
[].forEach.call(cols, addDnDHandlers);

