const userService = require("../services/userservice");

// Defining methods for the userController
module.exports = {
  authenticate: function authenticate(req, res, next) {
      console.log("userController.authenticate()");
    userService
      .authenticate(req.body)
      .then(user =>
        user
          ? res.json(user)
          : res
              .status(400)
              .json({ message: "Username or password is incorrect" })
      )
      .catch(err => next(err));
  },

  register: function register(req, res, next) {
    console.log("userController.register()");
        userService
      .create(req.body)
      .then(() => res.json({}))
      .catch(err => next(err));
  },

  getAll: function getAll(req, res, next) {
    userService
      .getAll()
      .then(users => res.json(users))
      .catch(err => next(err));
  },

  getCurrent: function getCurrent(req, res, next) {
    userService
      .getById(req.user.sub)
      .then(user => (user ? res.json(user) : res.sendStatus(404)))
      .catch(err => next(err));
  },

  getById: function getById(req, res, next) {
    userService
      .getById(req.params.id)
      .then(user => (user ? res.json(user) : res.sendStatus(404)))
      .catch(err => next(err));
  },

  update: function update(req, res, next) {
    userService
      .update(req.params.id, req.body)
      .then(() => res.json({}))
      .catch(err => next(err));
  },

  _delete: function _delete(req, res, next) {
    userService
      .delete(req.params.id)
      .then(() => res.json({}))
      .catch(err => next(err));
  }
};
