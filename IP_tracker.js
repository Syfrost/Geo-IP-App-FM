document.addEventListener('DOMContentLoaded', () => {
    const ipAddressInput = document.getElementById('ipAddress');
    const searchButton = document.querySelector('button');
    const ipShow = document.getElementById('ipShow');
    const locationShow = document.getElementById('locationShow');
    const timezoneShow = document.getElementById('timezoneShow');
    const ispShow = document.getElementById('ispShow');

    // Initialiser la carte Leaflet
    const map = L.map('map').setView([0, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    let marker;

    function updateMap(lat, lon) {
        if (marker) {
            map.removeLayer(marker);
        }
        marker = L.marker([lat, lon]).addTo(map);
        map.setView([lat, lon], 13);
    }

    async function fetchIPData(ip) {
        const response = await fetch(`http://ip-api.com/json/${ip}`);
        const data = await response.json();

        if (data.status === "fail") {
            alert("IP address not found");
            return;
        }

        // Mettre à jour les informations
        ipShow.textContent = data.query;
        locationShow.textContent = `${data.city}, ${data.regionName}, ${data.country}`;
        timezoneShow.textContent = `GMT ${data.timezone}`;
        ispShow.textContent = data.isp;

        updateMap(data.lat, data.lon);
    }

    searchButton.addEventListener('click', () => {
        searchButton.addEventListener('click', (event) => {
            event.preventDefault();
            fetchIPData(ipAddressInput.value);
        });
        fetchIPData(ipAddressInput.value);
    });
});