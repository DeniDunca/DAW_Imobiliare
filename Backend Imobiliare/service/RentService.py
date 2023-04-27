
class RentService:
    def __init__(self,rentRepository):
        self.rentRepository = rentRepository

    def get_rent(self,id):
        return self.rentRepository.get_rent(id)
    
    def get_all_rents(self):
        return self.rentRepository.get_all_rents()
    
    def add_rent(self, address, description, price, area,rooms,phone, type):
        return self.rentRepository.add_rent(address, description, price, area,rooms, phone, type)

    def update_rent(self,id,address,description,price,area,rooms,phone,type):
        self.rentRepository.update_rent(id,address,description,price,area, rooms, phone, type)

    def delete_rent(self, id):
        self.rentRepository.delete_rent(id)
   