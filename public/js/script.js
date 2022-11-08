// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {
  console.log("project2 JS imported successfully!");
});

function openNav() {
  document.getElementById("myNav").style.width = "100%";
}

function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}

const overlay = document.getElementById("preloader");

window.addEventListener("load", function () {
  setTimeout(function () {
    overlay.style.opacity = "0";
    overlay.style.transition = "0.3s ease-out";
    overlay.style.display = "none";
  }, 1000);
});

/* AUTOCOMPLETE */
/*let autocomplete;
function initAutocomplete() {
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById("autocomplete"),
    {
      types: ["restaurant"],
      componentRestrictions: { country: ["PT"] },
      fields: ["place_id", "geometry", "name"],
    }
  );
  autocomplete.addListener("place_changed", onPlaceChanged);
}

function onPlaceChanged() {
  let place = autocomplete.getPlace();
  console.log(place);
  if (!place.geometry) {
    document.getElementById("autocomplete").placeholder = "Enter a place";
  } else {
    document.getElementById("autocomplete").value = place.name;
    document.getElementById("placeId").value = place.place_id;
  }
}*/

/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 38.711921844488735, lng: -9.124157359756076 },
    zoom: 10,
    mapTypeControl: true,
  });
  const card = document.getElementById("pac-card");
  const input = document.getElementById("autocomplete");
  //const biasInputElement = document.getElementById("use-location-bias");
  //const strictBoundsInputElement = document.getElementById("use-strict-bounds");
  const options = {
    fields: ["place_id", "geometry", "name", "photo", "formatted_address"],
    //photo: results[i].photos[0].getUrl({ maxWidth: 100, maxHeight: 100 }),
    componentRestrictions: { country: ["PT"] },
    types: ["restaurant"],
  };

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(card);

  const autocomplete = new google.maps.places.Autocomplete(input, options);

  // Bind the map's bounds (viewport) property to the autocomplete object,
  // so that the autocomplete requests use the current map bounds for the
  // bounds option in the request.
  autocomplete.bindTo("bounds", map);

  const infowindow = new google.maps.InfoWindow();
  const infowindowContent = document.getElementById("infowindow-content");

  infowindow.setContent(infowindowContent);

  const marker = new google.maps.Marker({
    map: map,
    anchorPoint: new google.maps.Point(0, -29),
  });

  autocomplete.addListener("place_changed", () => {
    infowindow.close();
    marker.setVisible(false);

    const place = autocomplete.getPlace();

    if (!place.geometry || !place.geometry.location) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
      console.log(place.formatted_address);
      document.getElementById("autocomplete").value = place.name;
      document.getElementById("placeId").value = place.place_id;
      document.getElementById("country").value =
        place.formatted_address.types[0];
      document.getElementById("imgRestaurant").style.display = "block";
      document.getElementById("imgRestaurant").src = place.photos[0].getUrl({
        maxWidth: 500,
        maxHeight: 500,
      });
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }

    marker.setPosition(place.geometry.location);
    marker.setVisible(true);
    //infowindowContent.children["place-name"].textContent = place.name;
    //infowindowContent.children["place-address"].textContent = place.formatted_address;
    infowindow.open(map, marker);
  });
  /*
  // Sets a listener on a radio button to change the filter type on Places
  // Autocomplete.
  function setupClickListener(id, types) {
    const radioButton = document.getElementById(id);

    radioButton.addEventListener("click", () => {
      autocomplete.setTypes(types);
      input.value = "";
    });
  }

  setupClickListener("changetype-all", []);
  biasInputElement.addEventListener("change", () => {
    if (biasInputElement.checked) {
      autocomplete.bindTo("bounds", map);
    } else {
      // User wants to turn off location bias, so three things need to happen:
      // 1. Unbind from map
      // 2. Reset the bounds to whole world
      // 3. Uncheck the strict bounds checkbox UI (which also disables strict bounds)
      autocomplete.unbind("bounds");
      autocomplete.setBounds({ east: 180, west: -180, north: 90, south: -90 });
      strictBoundsInputElement.checked = biasInputElement.checked;
    }

    input.value = "";
  });
  strictBoundsInputElement.addEventListener("change", () => {
    autocomplete.setOptions({
      strictBounds: strictBoundsInputElement.checked,
    });
    if (strictBoundsInputElement.checked) {
      biasInputElement.checked = strictBoundsInputElement.checked;
      autocomplete.bindTo("bounds", map);
    }

    input.value = "";
  });*/
}

window.initMap = initMap;
