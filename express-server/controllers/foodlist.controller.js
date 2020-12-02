const foodlistService = require('../services/foodlist.service')


module.exports = {
  getList,
  updateList
};


function getList(req, res, next) {
  foodlistService.getList(req.query.username)
    .then(list => res.json(list))
    .catch(err => next(err));
}

function updateList(req, res, next) {
  foodlistService.updateList(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

