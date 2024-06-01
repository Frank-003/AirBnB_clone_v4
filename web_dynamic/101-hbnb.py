#!/usr/bin/python3
"""
Flask App that integrates with AirBnB static HTML Template
"""
from flask import Flask, render_template, jsonify, request
from models import storage
from models.state import State
from models.city import City
from models.amenity import Amenity
from models.place import Place
from models.review import Review

app = Flask(__name__)

@app.route('/101-hbnb', methods=['GET'])
def hbnb():
    states = storage.all(State).values()
    amenities = storage.all(Amenity).values()
    return render_template('101-hbnb.html', states=states, amenities=amenities)

@app.route('/api/v1/places_search', methods=['POST'])
def places_search():
    data = request.get_json()
    if data is None:
        data = {}
    places = storage.all(Place).values()

    if 'amenities' in data:
        places = [place for place in places if all(amenity in [a.id for a in place.amenities] for amenity in data['amenities'])]

    if 'states' in data:
        places = [place for place in places if place.city.state_id in data['states']]

    if 'cities' in data:
        places = [place for place in places if place.city_id in data['cities']]

    places_list = [place.to_dict() for place in places]
    return jsonify(places_list)

@app.route('/api/v1/places/<place_id>/reviews', methods=['GET'])
def place_reviews(place_id):
    place = storage.get(Place, place_id)
    if not place:
        return jsonify([]), 404
    reviews = [review.to_dict() for review in place.reviews]
    return jsonify(reviews)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)

