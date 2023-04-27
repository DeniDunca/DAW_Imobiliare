
class UserService:
    def __init__(self,userRepository):
        self.userRepository = userRepository

    def get_user(self,id):
        return self.userRepository.get_user(id)
    
    def get_all_users(self):
        return self.userRepository.get_all_users()
    
    def add_user(self, name, email, password, isAgent, preference):
        return self.userRepository.add_user(name, email, password, isAgent, preference)

    def update_user(self,id,name,email,password,preference):
        self.userRepository.update_user(id,name,email,password,preference)

    def delete_user(self, id):
        self.userRepository.delete_user(id)

    def get_user_by_email_and_password(self,email,password):
        return self.userRepository.get_user_by_email_and_password(email,password)
   