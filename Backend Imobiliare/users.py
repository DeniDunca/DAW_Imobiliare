from flask import Blueprint, request,jsonify
from flask_cors import CORS
from repository.UserRepository import UserRepository
from service.UserService import UserService
from cryptography.fernet import Fernet

users = Blueprint("users",__name__,url_prefix="/users")
CORS(users)

userRepository = UserRepository()
userService = UserService(userRepository)

# Generate a key to encrypt and decrypt the password
key = b'MziBw-wkCYF4FVygFvd5FL7yREVCvqc99Z5ie8wZw20='
fernet = Fernet(key)

@users.get('get/<id>')
def get_user(id):
    data = userService.get_user(id)
    return jsonify(data)

@users.get('getAll')
def get_all_users():
    data = userService.get_all_users()
    return jsonify(data)

@users.post('/add')
def add_user():
    name = request.json['name']
    email = request.json['email']
    password = request.json['password']
    isAgent = request.json['isAgent']
    preference = request.json['preference']
  
    # Encrypt the password before storing it in the database
    encrypted_password = fernet.encrypt(password.encode())

    if userService.add_user(name,email,encrypted_password,isAgent, preference):
        return jsonify({
        'message':'User added successfully'
    }),201 #CREATED
    
    return jsonify({
        'message':'Make sure the data is valid'
    })

@users.post('/update')
def update_user():
    id = request.json['id']
    name = request.json['name']
    email = request.json['email']
    password = request.json['password']
    preference = request.json['preference']

    # Encrypt the password before updating the user
    encrypted_password = fernet.encrypt(password.encode())

    userService.update_user(id,name,email,encrypted_password, preference)

    return jsonify({
        'message':'User updated successfully'
    })


@users.delete('/delete/<id>')
def delete_user(id):
    userService.delete_user(id)

    return jsonify({
        'message':'User deleted successfully'
    }),200 #OK

@users.post("/login")
def login():
    email = request.json.get('email','')
    password = request.json.get('password','')
    
    user = userService.get_user_by_email(email)

    if user:
        #Decrypt the password before checking if it matches the entered password
        decrypted_password = fernet.decrypt(user.password).decode()
        if password == decrypted_password:
            return jsonify({
                    'userId':user.id,
                    'name':user.name,
                    'email':user.email,
                    'isAgent':user.isAgent,
                    'preference':user.preference
                }), 201

    
    return jsonify({
        'error':'Wrong credentials'
    }), 401
        

