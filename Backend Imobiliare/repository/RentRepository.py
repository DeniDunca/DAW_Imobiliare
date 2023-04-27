from database import Rent, db

class RentRepository:

    def get_rent(self,id):
        rent = Rent.query.get(id)
        rentData ={
            "address":rent.address,
            "description":rent.description,
            "price":rent.price,
            "area":rent.area,
            "rooms":rent.rooms,
            "phone":rent.phone,
            "type":rent.type
        }
        return rentData;

    def get_all_rents(self):
        rents = Rent.query.all()
        data = []
        for rent in rents:
            data.append({
                "id":rent.id,
                "address":rent.address,
                "description":rent.description,
                "price":rent.price,
                "area":rent.area,
                "rooms":rent.rooms,
                "phone":rent.phone,
                "type":rent.type
            })
        return data

    def add_rent(self, address, description, price, area, rooms,phone, type):
        rent = Rent(address=address, description=description, price=price, area=area,rooms=rooms, phone=phone, type=type)
        db.session.add(rent)
        db.session.commit()
        return True
    

    def update_rent(self,id, address, description, price, area, rooms,phone, type):
        rent = Rent.query.get(id)
        rent.address = address
        rent.description = description
        rent.price = price
        rent.area = area
        rent.rooms = rooms
        rent.phone = phone
        rent.type = type

        db.session.add(rent)
        db.session.commit()

      
    def delete_rent(self,id):
        rent = Rent.query.get(id)
        db.session.delete(rent)
        db.session.commit()