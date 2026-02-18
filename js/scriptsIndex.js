const article = document.getElementById('modelContainer');

fetch('./assests/data/modelos.json')
    .then((response) => {
        if (response.ok) {
            return response.json();
        }
        throw new Error("Error " + response.status + " al llamar al API: " + response.statusText);
    })
    .then(data => {
        console.log(data);

        data.forEach(car => {
            article.innerHTML += `
            <div class="carCard">
                <img src=${car.image} alt="${car.model}" style="width:100px; height:100px;">
                <h3>${car.model}</h3>
                <p>Año de Producción: ${car.production}</p>
                <p>Kilometraje: ${car.mileage}</p>
            </div>
            `
        });   
    })
    .catch((error) => {
        console.error(error)
    });