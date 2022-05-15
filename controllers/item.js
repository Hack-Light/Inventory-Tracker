let Item = require('../models/item');
let WH = require('../models/warehouse');

exports.getAllItems = async (req, res, next) => {
	try {
		let items = await Item.find({ is_deleted: false })
			.select('trackID description itemSize destination warehouse')
			.populate('warehouse', 'state country', WH);

		return res.status(200).json({
			status: true,
			data: items,
		});
		// res.render('index', items);
	} catch (error) {
		console.log(error);
	}
};

exports.getEditPage = async (req, res, next) => {
	let { _id } = req.params;

	try {
		let items = await Item.findOne({ is_deleted: false, trackID: _id })
			.select(
				'name description itemSize destination warehouse recipientName destination',
			)
			.populate('warehouse', 'warehouseID -_id', WH);

		let wh = await WH.find().select('name warehouseID -_id');

		return res.status(200).json({
			status: true,
			item: items,
			warehouses: wh,
		});
		// res.render('index', items);
	} catch (error) {
		console.log(error);
	}
};

exports.getCreatePage = async (req, res, next) => {
	try {
		let wh = await WH.find().select('name warehouseID -_id');

		return res.status(200).json({
			status: true,
			data: wh,
		});
		// res.render('index', items);
	} catch (error) {
		console.log(error);
	}
};

exports.createItem = async (req, res, next) => {
	let {
		name,
		description,
		recipient_name,
		recipient_tel,
		destination,
		warehouse_id,
		item_size,
	} = req.body;
	try {
		if (
			!name ||
			!recipient_name ||
			!recipient_tel ||
			!warehouse_id ||
			!item_size
		) {
			return;
		}

		// get selected warehouse
		let wh = await WH.findOne({ warehouseID: warehouse_id });

		let data = {
			name,
			description,
			destination,
			warehouse: wh._id,
			itemSize: item_size,
			recipientTel: recipient_tel,
			recipientName: recipient_name,
		};

		let newItem = await Item.create(data);

		wh.inventory.push(newItem._id);
		await wh.save();

		return res.status(201).json({
			status: true,
			data: newItem,
		});

		// res.render('index', items);
	} catch (error) {
		console.log(error);
	}
};

exports.editItem = async (req, res, next) => {
	let {
		name,
		description,
		recipient_name,
		recipient_tel,
		destination,
		warehouse_id,
		item_size,
	} = req.body;

	let { _id } = req.params;
	try {
		// get item by its id
		let item = await Item.findOne({ trackID: _id });

		if (!item) {
			return res.status(404).json({
				status: fail,
			});
		}

		item.name = name || item.name;
		item.description = description || item.description;
		item.destination = destination || item.destination;
		item.warehouse = warehouse_id || item.warehouse;
		item.itemSize = item_size || item.itemSize;
		item.recipientTel = recipient_tel || item.recipientTel;
		item.recipientName = recipient_name || item.recipientName;

		item = await item.save();

		return res.status(200).json({
			status: true,
			data: item,
		});

		// res.render('index', items);
	} catch (error) {
		console.log(error);
	}
};

exports.deleteItem = async (req, res, next) => {
	let { _id } = req.params;
	try {
		// get item by its id
		let item = await Item.findOne({ trackID: _id });

		if (!item) {
			return res.status(404).json({
				status: fail,
			});
		}

		item.is_deleted = true;

		await item.save();

		return res.status(200).json({
			status: true,
			data: 'deleted',
		});

		// res.render('index', items);
	} catch (error) {
		console.log(error);
	}
};
