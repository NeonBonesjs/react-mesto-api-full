const CORS_WHITELIST = [
  'http://api.mesto-neonbones.nomoredomainsclub.ru',
  'http://mesto-neonbones.nomoredomainsclub.ru',
];

const corsOption = {
  credentials: true,
  origin: function checkCorsList(origin, callback) {
    if (CORS_WHITELIST.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

module.exports = corsOption;
