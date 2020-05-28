const mapper = require('automapper-js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { JWT_SECRET } = process.env;

const { UserDto } = require('../dtos');

class AuthController {
  constructor({ UserService }) {
    this._userService = UserService;
  }

  async getUser(req, res) {
    try {
      let user = await this._userService.get(req.user.id);
      if (!user) {
        return res.status(404).send();
      }
      user = mapper(UserDto, user);
      return res.send({
        payload: user,
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error.');
    }
  }

  async authUser(req, res) {
    const { body } = req;

    const { email, password } = req.body;

    try {
      // Validates user exists by email
      let userFound = await this._userService.getUsersByEmail(email);

      if (!userFound) {
        return res.status(400).json({
          errors: [
            {
              msg:
                'The email entered does not exist in our records, please validate and try again.',
            },
          ],
        });
      }

      // Desencrypt password
      const isMatch = await bcrypt.compare(password, userFound[0].password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials.' }] });
      }

      const user = mapper(UserDto, userFound[0]);

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        return res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server error');
    }
  }
}

module.exports = AuthController;
