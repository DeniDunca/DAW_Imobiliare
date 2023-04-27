from flask import Blueprint, request,jsonify
from flask_cors import CORS
from repository.SaleRepository import SaleRepository
from service.SaleService import SaleService

sales = Blueprint("sales",__name__,url_prefix="/sales")
CORS(sales)

saleRepository = SaleRepository()
saleService = SaleService(saleRepository)

@sales.get('get/<id>')
def get_sale(id):
    data = saleService.get_sale(id)
    return jsonify(data)

@sales.get('getAll')
def get_all_sales():
    data = saleService.get_all_sales()
    return jsonify(data)

@sales.post('/add')
def add_sale():
    address = request.json['address']
    description = request.json['description']
    price = request.json['price']
    area = request.json['area']
    rooms = request.json['rooms']
    phone = request.json['phone']
    type = request.json['type']
  
    if saleService.add_sale(address,description,price,area,rooms,phone, type):
        return jsonify({
        'message':'Sale added successfully'
    }),201 #CREATED
    
    return jsonify({
        'message':'Make sure the data is valid'
    })

@sales.post('/update')
def update_sale():
    id = request.json['id']
    address = request.json['address']
    description = request.json['description']
    price = request.json['price']
    area = request.json['area']
    rooms = request.json['rooms']
    phone = request.json['phone']
    type = request.json['type']

    saleService.update_sale(id,address,description,price,area,rooms,phone, type)

    return jsonify({
        'message':'Sale updated successfully'
    })


@sales.delete('/delete/<id>')
def delete_sale(id):
    saleService.delete_sale(id)

    return jsonify({
        'message':'Sale deleted successfully'
    }),200 #OK
