const User = require('./user');
const { isValidEmail, isValidName, isValidPassword } = require('convos-validator');
const hashPassword = require('../utils/hashPassword');

async function getUser(_id) {
  return await User.findById(_id).exec();
}

async function isUniqueEmail(email) {
  return await getUser(email).then(result => (result == null));
}

const user_ctrl = {
  register: (req, res) => {
    const { _id, name, password } = req.body;

    // final check before creating account
    let isValid = isValidEmail(_id) && isValidName(name) && isValidPassword(password);

    isUniqueEmail(_id)
      .then(result => {
        if (isValid && result) {
          const user = { _id, name, groups: [], ...hashPassword(password) };
          User.create(user, (err, result) => {
            if (!err) {
              req.session._id = _id;
            }

            res.send({ result });
          });
          return;
        }

        res.json({ result: false });
      });
  },

  checkEmail: (req, res) => {
    isUniqueEmail(req.query._id)
      .then(result => res.json({ result }));
  },

  login: (req, res) => {
    const { _id, password } = req.body;
    getUser(_id)
      .then(user => hashPassword(password, user.salt).password === user.password)
      .then(result => {
        if (result) {
          req.session._id = _id;
        }
        res.json({ result });
      });
  },

  getUser: (req, res) => {
    getUser(req.session._id).then(user => {
      if (user) {
        res.json({
          _id: user._id,
          name: user.name,
        });
      } else {
        res.json({});
      }
    });
  },

  updatePassword: (req, res) => {
    const { _id, password } = req.body;
    User.updateOne({ _id }, { ...hashPassword(password) }, (err) => res.json({ result: !err }));
  },

  updateName: (req, res) => {
    const { _id, name } = req.body;
    User.updateOne({ _id }, { name }, (err) => res.json({ result: !err }));
  }
};

module.exports = user_ctrl;
