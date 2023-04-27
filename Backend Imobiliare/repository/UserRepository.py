from database import User, db

class UserRepository:

    def get_user(self,id):
        user = User.query.get(id)
        userData ={
            "name":user.name,
            "email":user.email,
            "password":user.password,
            "isAgent":user.isAgent,
            "preference":user.preference
        }
        return userData;

    def get_all_users(self):
        users = User.query.all()
        data = []
        for user in users:
            data.append({
                "id":user.id,
                "name":user.name,
                "email":user.email,
                "password":user.password,
                "isAgent":user.isAgent,
                "preference":user.preference
            })
        return data

    def add_user(self, name, email, password, isAgent, preference):
        user = User(name=name, email=email, password=password, isAgent=isAgent, preference=preference)
        db.session.add(user)
        db.session.commit()
        return True
    

    def update_user(self,id,name,email,password, preference):
        user = User.query.get(id)
        user.name = name
        user.email = email
        user.password = password
        user.preference = preference

        db.session.add(user)
        db.session.commit()

      
    def delete_user(self,id):
        user = User.query.get(id)
        db.session.delete(user)
        db.session.commit()
    
    def get_user_by_email_and_password(self,email,password):
        user = User.query.filter_by(email=email, password=password).first()
        return user