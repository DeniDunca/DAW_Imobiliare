
class SaleService:
    def __init__(self,saleRepository):
        self.saleRepository = saleRepository

    def get_sale(self,id):
        return self.saleRepository.get_sale(id)
    
    def get_all_sales(self):
        return self.saleRepository.get_all_sales()
    
    def add_sale(self, address, description, price, area,rooms,phone, type):
        return self.saleRepository.add_sale(address, description, price, area,rooms, phone, type)

    def update_sale(self,id,address,description,price,area,rooms,phone,type):
        self.saleRepository.update_sale(id,address,description,price,area, rooms, phone, type)

    def delete_sale(self, id):
        self.saleRepository.delete_sale(id)
   