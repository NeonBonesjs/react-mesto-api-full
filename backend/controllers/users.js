/* eslint-disable no-shadow */
const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');
const User = require('../models/users');
const NotFoundError = require('../error/NotFoundError');
const ValidationError = require('../error/ValidationError');
const CustomError = require('../error/CustomError');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch(next);
};

function getUserData(id, req, res, next) {
  User.findById(id)
    .orFail(new NotFoundError('Пользователь по указанному _id не найден.'))
    .then((user) => res.send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      _id: user._id,
      email: user.email,
    }))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new ValidationError('Некорректный _id пользователя'));
      }
      return next(err);
    });
}

module.exports.getUserById = (req, res, next) => {
  getUserData(req.params.userId, req, res, next);
};

module.exports.getThisUserInfo = (req, res, next) => {
  getUserData(req.user._id, req, res, next);
};

module.exports.createUser = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    }))
    .then((user) => {
      res.status(201).send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        _id: user._id,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new ValidationError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
      }
      if (err.name === 'MongoServerError' && err.code === 11000) {
        return next(new CustomError('Пользователь с таким email уже существует', 409));
      }
      return next(err);
    });
};

function changeUserData(req, res, next, object) {
  // const object = req.body;
  User.findByIdAndUpdate(req.user._id, object, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      }
      res.send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        _id: user._id,
      });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new ValidationError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
      }
      if (err instanceof mongoose.Error.CastError) {
        return next(new ValidationError('Некорректный _id пользователя'));
      }
      return next(err);
    });
}

module.exports.changeUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  changeUserData(req, res, next, { name, about });
};

module.exports.changeUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  changeUserData(req, res, next, { avatar });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res
        .send({ token });
    })
    .catch(next);
};
