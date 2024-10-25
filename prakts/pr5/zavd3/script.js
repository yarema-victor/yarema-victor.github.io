document.addEventListener('DOMContentLoaded', () => {
    getMyLocation();
});

let map;
let markers = [];

function getMyLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(displayLocation, displayError);
    } else {
        alert("Oops, no geolocation support");
    }
}

function displayLocation(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    if (!map) {
        map = L.map('map').setView([latitude, longitude], 15);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        }).addTo(map);
    }

    addMarker(latitude, longitude, `You are at Latitude: ${latitude}, Longitude: ${longitude}<br>Time: ${new Date().toLocaleString()}`);
}

function displayError(error) {
    const errorTypes = {
        0: "Unknown error",
        1: "Permission denied by user",
        2: "Position is not available",
        3: "Request timed out"
    };
    let errorMessage = errorTypes[error.code];
    let div = document.getElementById("location");
    div.innerHTML = errorMessage;
}

function addMarker(lat, lng, message) {
    const marker = L.marker([lat, lng]).addTo(map)
        .bindPopup(message)
        .openPopup();
    markers.push(marker);
}

document.getElementById('submitCoords').addEventListener('click', function() {
    const latInput = parseFloat(document.getElementById('latitude').value);
    const lngInput = parseFloat(document.getElementById('longitude').value);
    if (!isNaN(latInput) && !isNaN(lngInput)) {
        addMarker(latInput, lngInput, `Coordinates: ${latInput}, ${lngInput}<br>Time: ${new Date().toLocaleString()}`);
        map.setView([latInput, lngInput], 15);
    } else {
        alert('Please enter valid coordinates.');
    }
});

document.getElementById('scrollToCoords').addEventListener('click', function() {
    const latInput = parseFloat(document.getElementById('latitude').value);
    const lngInput = parseFloat(document.getElementById('longitude').value);
    if (!isNaN(latInput) && !isNaN(lngInput)) {
        map.setView([latInput, lngInput], 15);
    } else {
        alert('Please enter valid coordinates.');
    }
});
