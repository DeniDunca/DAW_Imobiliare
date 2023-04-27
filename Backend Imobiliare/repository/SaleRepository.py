from database import Sale, db

class SaleRepository:

    def get_sale(self,id):
        sale = Sale.query.get(id)
        saleData ={
            "address":sale.address,
            "description":sale.description,
            "price":sale.price,
            "area":sale.area,
            "rooms":sale.rooms,
            "phone":sale.phone,
            "type":sale.type
        }
        return saleData;

    def get_all_sales(self):
        sales = Sale.query.all()
        data = []
        for sale in sales:
            data.append({
                "id":sale.id,
                "address":sale.address,
                "description":sale.description,
                "price":sale.price,
                "area":sale.area,
                "rooms":sale.rooms,
                "phone":sale.phone,
                "type":sale.type
            })
        return data

    def add_sale(self, address, description, price, area, rooms,phone, type):
        sale = Sale(address=address, description=description, price=price, area=area,rooms=rooms, phone=phone, type=type)
        db.session.add(sale)
        db.session.commit()
        return True
    

    def update_sale(self,id, address, description, price, area, rooms,phone, type):
        sale = Sale.query.get(id)
        sale.address = address
        sale.description = description
        sale.price = price
        sale.area = area
        sale.rooms = rooms
        sale.phone = phone
        sale.type = type

        db.session.add(sale)
        db.session.commit()

      
    def delete_sale(self,id):
        sale = Sale.query.get(id)
        db.session.delete(sale)
        db.session.commit()