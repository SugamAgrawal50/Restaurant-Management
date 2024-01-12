const express = require('express')
const router = express.Router()
const app = express();
const dishController = require("../controllers/dishController");
const auth = require('../middleware/auth')
const checkValid = require('../middleware/validate');

router.get('/',[auth ], dishController.getAllDishes);
router.get('/:dishName',[auth, checkValid ] , dishController.getDishByID);
router.post('/',[auth, checkValid ] , dishController.addDishes);
router.delete('/:dishName',[auth, checkValid ] , dishController.deleteDish);
router.put('/',[auth, checkValid ] , dishController.updateDish);
router.post('/buy',[auth, checkValid ] , dishController.purchaseDish);

module.exports = router

