document.addEventListener('DOMContentLoaded', function () {
    const amenities = {};
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

    document.querySelector('.filters button').addEventListener('click', function () {
        const selectedAmenities = Object.keys(amenities);
        fetch('/api/v1/places_search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amenities: selectedAmenities })
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

