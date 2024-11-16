class DeleteUser {
    constructor(userRepository) {
      this.userRepository = userRepository;
    }
  
    async execute(userId) {e
      const existingUser = await this.userRepository.findById(userId);
      if (!existingUser) {
        throw new Error('User not found');
      }
  
      
      return await this.userRepository.delete(userId);
    }
  }
  
  module.exports = DeleteUser;
  