from flask import Blueprint, request,jsonify
from flask_cors import CORS
from repository.AppointmentRepository import AppointmentRepository
from service.AppointmentService import AppointmentService

appointments = Blueprint("appointments",__name__,url_prefix="/appointments")
CORS(appointments)

appointmentRepository = AppointmentRepository()
appointmentService = AppointmentService(appointmentRepository)

@appointments.get('get/<id>')
def get_appointment(id):
    data = appointmentService.get_appointment(id)
    if data:
        appointment = data[0]
        appointment['time'] = appointment['time'].strftime('%H:%M')
        appointment['date'] = appointment['date'].strftime('%Y-%m-%d')
        return jsonify(appointment)
    else:
        return jsonify({
            'message': 'Appointment not found'
        }), 404 #NOT FOUND

@appointments.get('getAll')
def get_all_appointments():
    data = appointmentService.get_all_appointments()
    if data:
        for appointment in data:
            appointment['time'] = appointment['time'].strftime('%H:%M')
            appointment['date'] = appointment['date'].strftime('%Y-%m-%d')
        return jsonify(data)
    else:
        return jsonify({
            'message': 'No appointments found'
        }), 404 #NOT FOUND
    
@appointments.get('getAll/<imobil_id>/<is_rent>')
def get_all_appointments_by_imobil_id_and_is_rent(imobil_id, is_rent):
    data = appointmentService.get_all_appointments_by_imobil_id_and_is_rent(imobil_id, is_rent)
    if data:
        for appointment in data:
            appointment['time'] = appointment['time'].strftime('%H:%M')
            appointment['date'] = appointment['date'].strftime('%Y-%m-%d')
        return jsonify(data)
    else:
        return jsonify({
            'message': 'No appointments found'
        }), 404 #NOT FOUND


@appointments.get('/check/<imobil_id>/<is_rent>/<date>/<time>')
def check_appointment(imobil_id, is_rent, date, time):
    next_date, next_time = appointmentService.check_appointment_existence(imobil_id, is_rent, date, time)

    if next_date: 
        return jsonify({
            'message': 'The date is not free. This is the closest free date and time:',
            'closest_date': next_date,
            'closest_time': next_time
        }), 200  # Conflict
    else:
        return jsonify({
            'message': 'Appointment made for:',
            'date': date,
            'time': time
        }), 200  # OK



@appointments.post('/add')
def add_appointment():
    imobil_id = request.json['imobil_id']
    address = request.json['address']
    description = request.json['description']
    price = request.json['price']
    area = request.json['area']
    rooms = request.json['rooms']
    phone = request.json['phone']
    type = request.json['type']
    date = request.json['date']
    time = request.json['time']
    is_rent = request.json['is_rent']
  
    if appointmentService.add_appointment(imobil_id,address,description,price,area,rooms,phone, type, date, time, is_rent):
        return jsonify({
        'message':'Appointment added successfully'
    }),201 #CREATED
    
    return jsonify({
        'message':'Make sure the data is valid'
    })

@appointments.post('/update')
def update_appointment():
    id = request.json['id']
    imobil_id = request.json['imobil_id']
    address = request.json['address']
    description = request.json['description']
    price = request.json['price']
    area = request.json['area']
    rooms = request.json['rooms']
    phone = request.json['phone']
    type = request.json['type']
    date = request.json['date']
    time = request.json['time']
    is_rent = request.json['is_rent']

    appointmentService.update_appointment(id,imobil_id,address,description,price,area,rooms,phone, type, date, time, is_rent)

    return jsonify({
        'message':'Appointment updated successfully'
    })


@appointments.delete('/delete/<id>')
def delete_appointment(id):
    appointmentService.delete_appointment(id)

    return jsonify({
        'message':'Appointment deleted successfully'
    }),200 #OK

