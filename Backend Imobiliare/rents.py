from flask import Blueprint, request,jsonify
from flask_cors import CORS
from repository.RentRepository import RentRepository
from service.RentService import RentService

rents = Blueprint("rents",__name__,url_prefix="/rents")
CORS(rents)

rentRepository = RentRepository()
rentService = RentService(rentRepository)

@rents.get('get/<id>')
def get_rent(id):
    data = rentService.get_rent(id)
    return jsonify(data)

@rents.get('getAll')
def get_all_rents():
    data = rentService.get_all_rents()
    return jsonify(data)

@rents.post('/add')
def add_rent():
    address = request.json['address']
    description = request.json['description']
    price = request.json['price']
    area = request.json['area']
    rooms = request.json['rooms']
    phone = request.json['phone']
    type = request.json['type']
  
    if rentService.add_rent(address,description,price,area,rooms,phone, type):
        return jsonify({
        'message':'Rent added successfully'
    }),201 #CREATED
    
    return jsonify({
        'message':'Make sure the data is valid'
    })

@rents.post('/update')
def update_rent():
    id = request.json['id']
    address = request.json['address']
    description = request.json['description']
    price = request.json['price']
    area = request.json['area']
    rooms = request.json['rooms']
    phone = request.json['phone']
    type = request.json['type']

    rentService.update_rent(id,address,description,price,area,rooms,phone, type)

    return jsonify({
        'message':'Rent updated successfully'
    })


@rents.delete('/delete/<id>')
def delete_rent(id):
    rentService.delete_rent(id)

    return jsonify({
        'message':'Rent deleted successfully'
    }),200 #OK
