document.addEventListener('DOMContentLoaded', (event) => {
    fetch('http://0.0.0.0:5001/api/v1/places_search/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    })
    .then(response => response.json())
    .then(data => {
        const placesSection = document.querySelector('.places');
        data.forEach(place => {
            const article = document.createElement('article');
            
            const titleBox = document.createElement('div');
            titleBox.className = 'title_box';
            const title = document.createElement('h2');
            title.textContent = place.name;
            const priceByNight = document.createElement('div');
            priceByNight.className = 'price_by_night';
            priceByNight.textContent = `$${place.price_by_night}`;
            titleBox.appendChild(title);
            titleBox.appendChild(priceByNight);
            
            const information = document.createElement('div');
            information.className = 'information';
            const maxGuest = document.createElement('div');
            maxGuest.className = 'max_guest';
            maxGuest.textContent = `${place.max_guest} Guests`;
            const numberRooms = document.createElement('div');
            numberRooms.className = 'number_rooms';
            numberRooms.textContent = `${place.number_rooms} Bedrooms`;
            const numberBathrooms = document.createElement('div');
            numberBathrooms.className = 'number_bathrooms';
            numberBathrooms.textContent = `${place.number_bathrooms} Bathrooms`;
            information.appendChild(maxGuest);
            information.appendChild(numberRooms);
            information.appendChild(numberBathrooms);
            
            const description = document.createElement('div');
            description.className = 'description';
            description.textContent = place.description;

            article.appendChild(titleBox);
            article.appendChild(information);
            article.appendChild(description);
            
            placesSection.appendChild(article);
        });
    })
    .catch(error => console.log('Error:', error));
});

