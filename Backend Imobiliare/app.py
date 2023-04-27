from database import db
import os
from flask import Flask
from users import users
from rents import rents
from sales import sales

def create_app():

    app = Flask(__name__)
    app.config.from_mapping(
        SECRET_KEY=os.environ.get("dev"),
        SQLALCHEMY_DATABASE_URI=os.environ.get("SQLALCHEMY_DB_URI"),
        SQLALCHEMY_TRACK_MODIFICATIONS=False,
       
    )

    db.app=app
    db.init_app(app)
    with app.app_context():
        db.create_all()
        #db.drop_all()
    app.register_blueprint(users)
    app.register_blueprint(rents)
    app.register_blueprint(sales)
    
    return app