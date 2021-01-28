const mapper = require('automapper-js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const sgMail = require('@sendgrid/mail');

const { SENDGRID_API_KEY } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

const { UserDto } = require('../dtos');

async function sendMail(to, userName, link) {
  const msg = {
    to: to,
    from: 'irene.ortiz@gmail.com',
    subject: 'Training Tracking Account Creation',
    text: `Hello ${userName}: An account on 10 Pearls Training Tracking System has been created for you.  Please enter this link ${link} to set your password.  You should need to change passwor at first time.`,
    html: `Hello <strong>${userName}</strong>: An account on 10 Pearls Training Tracking System has been created for you.  Please enter this link ${link} to set your password.  <strong>You should need to change password at first time.</strong>`,
  };
  await sgMail.send(msg);
}

class UserController {
  constructor({ UserService, UtilsService }) {
    this._userService = UserService;
    this._utilsService = UtilsService;
  }

  async getUsers(req, res) {
    let users = await this._userService.getAllWithSetting();
    users = users.map((user) => mapper(UserDto, user));
    return res.send({
      payload: users,
    });
  }

  async getUser(req, res) {
    const { id } = req.params;
    let user = await this._userService.getWithSetting(id);
    if (!user) {
      return res.status(404).send();
    }
    user = mapper(UserDto, user);
    return res.send({
      payload: user,
    });
  }

  async createUser(req, res) {
    const { body } = req;

    const { email, password } = req.body;

    try {
      const isAdmin = await this._utilsService.isAdmin(req.user.id);
      if (!isAdmin) {
        return res.status(400).json({
          errors: [
            { msg: 'User logged does not have access to this operation.' },
          ],
        });
      }
      // Validates user exists by email
      let userFound = await this._userService.getUsersByEmail(email);

      if (userFound) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      let encrPassword = await bcrypt.hash(password, salt);

      const createdUser = await this._userService.create({
        ...body,
        password: encrPassword,
      });

      const user = mapper(UserDto, createdUser);
      const link = `${req.protocol}://${req.header('x-forwarded-host')}/changepassword/${createdUser.id}`
      await sendMail(email, createdUser.firstName, link);
      return res.status(201).send({
        payload: user,
      });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server error');
    }
  }

  async updateUser(req, res) {
    const { body } = req;
    const { id } = req.params;
    const { password } = req.body;

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    let encrPassword = await bcrypt.hash(password, salt);

    await this._userService.update(id, {
      ...body,
      password: encrPassword,
    });
    return res.status(204).send();
  }

  async deleteUser(req, res) {
    const { id } = req.params;

    await this._userService.delete(id);
    return res.status(204).send();
  }
  
  async forgotPassword(req, res) {
    const { email } = req.params;

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
      const link = `${req.protocol}://${req.header('x-forwarded-host')}/changepassword/${userFound[0].id}`
      const msg = {
        to: email,
        from: 'irene.ortiz@gmail.com',
        subject: 'Training Tracking Password Reset',
        text: `Hello ${userFound[0].firstName}: Please enter this link ${link} to reset your password.`,
        html: `Hello <strong>${userFound[0].firstName}</strong>: Please enter this link ${link} to reset your password.`,
      };
      await sgMail.send(msg);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server error');
    }
  }
}

module.exports = UserController;
