from database import Appointment, db
from datetime import datetime, timedelta

class AppointmentRepository:

    def get_appointment(self,id):
        appointment = Appointment.query.get(id)
        appointmentData ={
            "imobil_id":appointment.imobil_id,
            "address":appointment.address,
            "description":appointment.description,
            "price":appointment.price,
            "area":appointment.area,
            "rooms":appointment.rooms,
            "phone":appointment.phone,
            "type":appointment.type,
            "date":appointment.date,
            "time":appointment.time,
            "is_rent":appointment.is_rent
        }
        return appointmentData;

    def get_all_appointments(self):
        appointments = Appointment.query.all()
        data = []
        for appointment in appointments:
            data.append({
                "id":appointment.id,
                "imobil_id":appointment.imobil_id,
                "address":appointment.address,
                "description":appointment.description,
                "price":appointment.price,
                "area":appointment.area,
                "rooms":appointment.rooms,
                "phone":appointment.phone,
                "type":appointment.type,
                "date":appointment.date,
                "time":appointment.time,
                "is_rent":appointment.is_rent
            })
        return data
    
    def get_all_appointments_by_imobil_id_and_is_rent(self,imobil_id, is_rent):
        appointments = Appointment.query.filter_by(imobil_id=imobil_id, is_rent=is_rent).all()
        data = []
        for appointment in appointments:
            data.append({
                "id": appointment.id,
                "imobil_id": appointment.imobil_id,
                "address": appointment.address,
                "description": appointment.description,
                "price": appointment.price,
                "area": appointment.area,
                "rooms": appointment.rooms,
                "phone": appointment.phone,
                "type": appointment.type,
                "date": appointment.date,
                "time": appointment.time,
                "is_rent": appointment.is_rent
            })
        return data

    
    def check_appointment_existence(self, imobil_id, is_rent, date, time):
        existing_appointment = Appointment.query.filter_by(
            imobil_id=imobil_id, is_rent=is_rent,
            date=datetime.strptime(date, '%Y-%m-%d'),
            time=datetime.strptime(time, '%H:%M').time()
        ).first()

        if existing_appointment:
            # Calculate next available date and time
            next_appointment = Appointment.query.filter_by(
                imobil_id=imobil_id, is_rent=is_rent
            ).filter(
                Appointment.date > existing_appointment.date
            ).filter(
                Appointment.date == existing_appointment.date,
                Appointment.time > existing_appointment.time
            ).order_by(Appointment.date, Appointment.time).first()

            if next_appointment:
                next_date = next_appointment.date.strftime('%Y-%m-%d')
                next_time = next_appointment.time.strftime('%H:%M')
            else:
                # Calculate next available date and time
                curr_date = existing_appointment.date
                curr_time = datetime.strptime(
                    existing_appointment.time.strftime('%H:%M'), '%H:%M'
                )
                next_date = None
                next_time = None

                while True:
                    # Increment date and time by 60 minutes
                    curr_time += timedelta(minutes=60)

                    if curr_time > datetime.strptime('18:00', '%H:%M'):
                        # Increment date to the next weekday and reset time to 08:00:00
                        curr_date += timedelta(days=(7 - curr_date.weekday()) % 7 + 1)
                        curr_time = datetime.strptime('08:00', '%H:%M')

                    if curr_date.strftime('%Y-%m-%d') == date and curr_time.strftime('%H:%M') == time:
                        continue

                    # Check if the calculated date and time are available
                    is_available = not Appointment.query.filter_by(
                        imobil_id=imobil_id, is_rent=is_rent,
                        date=curr_date, time=curr_time.time()
                    ).first()

                    if is_available:
                        next_date = curr_date.strftime('%Y-%m-%d')
                        next_time = curr_time.time().strftime('%H:%M')
                        break

                # If there is no next available appointment, suggest a date and time one week after the existing appointment
                if not next_date:
                    next_date = (existing_appointment.date + timedelta(days=7)).strftime('%Y-%m-%d')
                    next_time = '08:00'

            return next_date, next_time

        else:
            return None, None

    def add_appointment(self,imobil_id, address, description, price, area, rooms,phone, type, date, time, is_rent):
        appointment = Appointment(imobil_id=imobil_id, address=address, description=description, price=price, area=area,rooms=rooms, phone=phone, type=type, date=date, time=time, is_rent=is_rent)
        db.session.add(appointment)
        db.session.commit()
        return True
    

    def update_appointment(self,id, imobil_id, address, description, price, area, rooms,phone, type, date, time, is_rent):
        appointment = Appointment.query.get(id)
        appointment.imobil_id = imobil_id
        appointment.address = address
        appointment.description = description
        appointment.price = price
        appointment.area = area
        appointment.rooms = rooms
        appointment.phone = phone
        appointment.type = type
        appointment.date = date
        appointment.time = time
        appointment.is_rent = is_rent

        db.session.add(appointment)
        db.session.commit()

      
    def delete_appointment(self,id):
        appointment = Appointment.query.get(id)
        db.session.delete(appointment)
        db.session.commit()