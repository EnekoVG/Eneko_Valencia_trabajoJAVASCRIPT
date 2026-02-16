let options={
    enableHighAccuracy: true,
    timeout: 1000,
    maximunAge: 0
}

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(success, error, options);
}else{
    alert("Los servicios de geolocalización no están disponibles");
}

function success(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    let map = L.map('map', { 
        center: [latitude, longitude],
        zoom: 14
    })

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'My openStreetMap'
    }).addTo(map);

    let control = L.Routing.control({
        waypoints: [
            L.latLng(latitude, longitude),
            L.latLng(42.810291,-1.633004)
        ],
        language: 'es'
    }).addTo(map);
}

function error(){
    let map = L.map('map').setView([42.810291,-1.633004], 18);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'My Map'
    }).addTo(map);

    L.marker([42.810291,-1.633004]).addTo(map)
        .bindPopup('Encuentranos aqui.')
        .openPopup();
}