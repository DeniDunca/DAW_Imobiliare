
class AppointmentService:
    def __init__(self,appointmentRepository):
        self.appointmentRepository = appointmentRepository

    def get_appointment(self,id):
        return self.appointmentRepository.get_appointment(id)
    
    def get_all_appointments(self):
        return self.appointmentRepository.get_all_appointments()
    
    def get_all_appointments_by_imobil_id_and_is_rent(self, imobil_id, is_rent):
        return self.appointmentRepository.get_all_appointments_by_imobil_id_and_is_rent(imobil_id, is_rent)
    
    def check_appointment_existence(self,imobil_id, is_rent, date, time):
        return self.appointmentRepository.check_appointment_existence(imobil_id,is_rent,date,time)
    
    def add_appointment(self,imobil_id, address, description, price, area,rooms,phone, type, date, time, is_rent):
        return self.appointmentRepository.add_appointment(imobil_id,address, description, price, area,rooms, phone, type, date, time, is_rent)

    def update_appointment(self,imobil_id,id,address,description,price,area,rooms,phone,type, date, time, is_rent):
        self.appointmentRepository.update_appointment(id,imobil_id,address,description,price,area, rooms, phone, type, date, time, is_rent)

    def delete_appointment(self, id):
        self.appointmentRepository.delete_appointment(id)
   