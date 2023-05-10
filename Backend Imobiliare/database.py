from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import LargeBinary
from sqlalchemy.dialects.mysql import ENUM

db = SQLAlchemy()

class User(db.Model): 
    __tablename__ = "user"

    id = db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String(30),nullable=False)
    email = db.Column(db.String(80),nullable=False)
    password = db.Column(LargeBinary(),nullable=False)
    isAgent = db.Column(db.Boolean,nullable=False)
    preference = db.Column(db.String(30),ENUM('Apartamente', 'Case', 'Garsoniere', name='preference'))

class Rent(db.Model):
    __tablename__ = "rents"

    id = db.Column(db.Integer,primary_key=True)
    address = db.Column(db.String(30),nullable=False)
    description = db.Column(db.String(80),nullable=False)
    price = db.Column(db.String(30),nullable=False)
    area = db.Column(db.String(30),nullable=False)
    rooms = db.Column(db.Integer,nullable=False)
    phone = db.Column(db.String(30),nullable=False)
    type = db.Column(db.String(30),ENUM('Apartamente', 'Case', 'Garsoniere', name='type'))


class Sale(db.Model):
    __tablename__ = "sales"

    id = db.Column(db.Integer,primary_key=True)
    address = db.Column(db.String(30),nullable=False)
    description = db.Column(db.String(80),nullable=False)
    price = db.Column(db.String(30),nullable=False)
    area = db.Column(db.String(30),nullable=False)
    rooms = db.Column(db.Integer,nullable=False)
    phone = db.Column(db.String(30),nullable=False)
    type = db.Column(db.String(30),ENUM('Apartamente', 'Case', 'Garsoniere', name='type'))

class Appointment(db.Model):
    __tablename__ = "appointments"

    id = db.Column(db.Integer, primary_key=True)
    imobil_id = db.Column(db.Integer, nullable=False)
    address = db.Column(db.String(30),nullable=False)
    description = db.Column(db.String(80),nullable=False)
    price = db.Column(db.String(30),nullable=False)
    area = db.Column(db.String(30),nullable=False)
    rooms = db.Column(db.Integer,nullable=False)
    phone = db.Column(db.String(30),nullable=False)
    type = db.Column(db.String(30),ENUM('Apartamente', 'Case', 'Garsoniere', name='type'))
    date = db.Column(db.Date, nullable=False)
    time = db.Column(db.Time, nullable=False)
    is_rent = db.Column(db.Boolean, nullable=False)