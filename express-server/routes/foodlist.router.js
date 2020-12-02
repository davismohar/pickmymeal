var express = require('express');
var router = express.Router();
const foodlistController = require('../controllers/foodlist.controller');

router.get('/getlist', foodlistController.getList);
router.post('/updatelist', foodlistController.updateList);

module.exports = router;
