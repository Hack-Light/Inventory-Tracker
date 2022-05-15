const { create } = require('../models/item');

const express = require('express'),
	router = express.Router(),
	{
		createItem,
		deleteItem,
		editItem,
		getAllItems,
		getCreatePage,
		getEditPage,
	} = require('../controllers/item'),
	{ createWareHouse, getWareHouse } = require('../controllers/warehouse');

// home route
router.get('/', getAllItems);

// item routes
router.get('/item/new', getCreatePage);
router.post('/item/new', createItem);
router.get('/item/update/:_id', getEditPage);
router.put('/item/update/:_id', editItem);
router.delete('/item/delete/:_id', deleteItem);

// warehouse routes
router.get('/warehouse/new', getWareHouse);
router.post('/warehouse/new', createWareHouse);

module.exports = router;
