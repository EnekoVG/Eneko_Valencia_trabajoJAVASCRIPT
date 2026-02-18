const article = document.getElementById('modelContainer');

fetch('../assests/data/modelos.json')
    .then(response => response.json())
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