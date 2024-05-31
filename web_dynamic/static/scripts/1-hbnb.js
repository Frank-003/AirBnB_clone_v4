$(document).ready(function() {
    const selectedAmenities = {};

    $('.amenities input[type="checkbox"]').change(function() {
        const amenityId = $(this).attr('data-id');
        const amenityName = $(this).attr('data-name');

        if (this.checked) {
            selectedAmenities[amenityId] = amenityName;
        } else {
            delete selectedAmenities[amenityId];
        }

        const amenityList = Object.values(selectedAmenities).join(', ');
        $('#selected_amenities').text(amenityList);
    });
});

