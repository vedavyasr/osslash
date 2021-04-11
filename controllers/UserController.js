const models = require("../models");

class UserController {
    /**
     * 
     * @returns all users
     */
  static async getAllUsers() {
    try {
      const { rows, count } = await models.User.findAndCountAll({});
      return { rows, count };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserController;
