const { User } = require("../models/");
const bcryptjs = require("bcryptjs");
const { generateToken } = require("../helpers/jwt");

class UserControlller {
  static async register(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;

      const user = await User.create({
        username,
        email,
        password,
        phoneNumber,
        address,
      });

      res.status(201).json({
        id: user.id,
        email: user.email,
      });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: { email },
      });

      if (user) {
        const isPasswordValid = bcryptjs.compareSync(password, user.password);

        if (isPasswordValid) {
          const payload = {
            id: user.id,
            email: user.email,
          };

          const access_token = generateToken(payload);

          res.status(200).json({ access_token });
        } else {
          throw { name: "Invalid credentials" };
        }
      } else {
        throw { name: "Invalid credentials" };
      }
    } catch (err) {
      next(err);
    }
  }
  static async getUser(req, res, next) {
    try {
      const { id } = req.user;
      const findUser = await User.findByPk(id);

      res.status(200).json(findUser);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserControlller;
