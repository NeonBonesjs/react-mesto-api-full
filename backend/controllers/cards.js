const { default: mongoose } = require('mongoose');
const Card = require('../models/cards');
const NotFoundError = require('../error/NotFoundError');
const ValidationError = require('../error/ValidationError');
const CustomError = require('../error/CustomError');

module.exports.getCard = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send({ cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then(({
      // eslint-disable-next-line no-shadow
      likes, _id, name, link, owner, createdAt,
    }) => res.status(201).send({
      likes, _id, name, link, owner, createdAt,
    }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new ValidationError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
      }
      return next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(new NotFoundError('Карточка с указанным _id не найдена.'))
    .then((card) => {
      if (String(card.owner) !== req.user._id) {
        throw new CustomError('Недостаточно прав', 403);
      }
      return card.remove()
        .then(() => res.send({ message: 'Карточка удалена' }));
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new ValidationError('Некорректный _id карточки'));
      }
      return next(err);
    });
};

function changeLikeStatus(req, res, next, param) {
  Card.findByIdAndUpdate(req.params.cardId, param, { new: true })
    .populate(['owner', 'likes'])
    .orFail(new NotFoundError('Запрашиваемая карточка не найденa'))
    .then(({
      likes, _id, name, link, owner, createdAt,
    }) => res.send({
      likes, _id, name, link, owner, createdAt,
    }))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new ValidationError('Некорректный _id карточки'));
      }
      return next(err);
    });
}

module.exports.likeCard = (req, res, next) => {
  changeLikeStatus(req, res, next, { $addToSet: { likes: req.user._id } });
};

module.exports.dislikeCard = (req, res, next) => {
  changeLikeStatus(req, res, next, { $pull: { likes: req.user._id } });
};
