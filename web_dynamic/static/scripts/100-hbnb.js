document.addEventListener('DOMContentLoaded', function () {
    const amenities = {};
    const locations = { states: [], cities: [] };

    document.querySelectorAll('.amenities input[type="checkbox"]').forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            if (this.checked) {
                amenities[this.dataset.id] = this.dataset.name;
            } else {
                delete amenities[this.dataset.id];
            }
            const amenityNames = Object.values(amenities).join(', ');
            document.querySelector('.amenities h4').textContent = amenityNames;
        });
    });

    document.querySelectorAll('input[type="checkbox"]').forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            const type = this.closest('ul').classList.contains('amenities') ? 'amenities' : 'locations';
            if (type === 'locations') {
                const locationType = this.closest('li').parentElement.classList.contains('cities') ? 'cities' : 'states';
                if (this.checked) {
                    locations[locationType].push(this.dataset.id);
                } else {
                    const index = locations[locationType].indexOf(this.dataset.id);
                    if (index > -1) {
                        locations[locationType].splice(index, 1);
                    }
                }
                const locationNames = Object.values(locations.states).concat(Object.values(locations.cities)).join(', ');
                document.querySelector('.filters h4').textContent = locationNames;
            }
        });
    });

    document.querySelector('.filters button').addEventListener('click', function () {
        const selectedAmenities = Object.keys(amenities);
        const selectedStates = locations.states;
        const selectedCities = locations.cities;

        fetch('/api/v1/places_search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amenities: selectedAmenities, states: selectedStates, cities: selectedCities })
        })
        .then(response => response.json())
        .then(data => {
            const placesSection = document.querySelector('.places');
            placesSection.innerHTML = '';
            data.forEach(place => {
                const article = document.createElement('article');
                article.innerHTML = `
                    <div class="title_box">
                        <h2>${place.name}</h2>
                        <div class="price_by_night">$${place.price_by_night}</div>
                    </div>
                    <div class="information">
                        <div class="max_guest">${place.max_guest} Guests</div>
                        <div class="number_rooms">${place.number_rooms} Bedrooms</div>
                        <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
                    </div>
                    <div class="description">
                        ${place.description}
                    </div>`;
                placesSection.appendChild(article);
            });
        });
    });
});

