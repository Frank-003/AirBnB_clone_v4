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

app = Flask(__name__)

@app.route('/4-hbnb', methods=['GET'])
def hbnb():
    states = storage.all(State).values()
    amenities = storage.all(Amenity).values()
    return render_template('4-hbnb.html', states=states, amenities=amenities)

@app.route('/api/v1/places_search', methods=['POST'])
def places_search():
    data = request.get_json()
    if data is None:
        data = {}
    places = storage.all(Place).values()
    if 'amenities' in data:
        places = [place for place in places if all(amenity in [a.id for a in place.amenities] for amenity in data['amenities'])]
    places_list = [place.to_dict() for place in places]
    return jsonify(places_list)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)

