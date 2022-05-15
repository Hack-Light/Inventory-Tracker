let Item = require('../models/item');
let WH = require('../models/warehouse');

exports.getAllItems = async (req, res, next) => {
	try {
		let items = await Item.find({ is_deleted: false })
			.select('trackID description itemSize destination warehouse')
			.populate('organiser', 'state country', WH);

		return res.status(200).json({
			status: true,
			data: items,
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
		let item = await Item.findOne({ _id: _id });

		if (!item) {
			return res.status(404).json({
				status: fail,
			});
		}

		let data = {
			name: name || item.name,
			description: description || item.description,
			destination: destination || item.destination,
			warehouse: warehouse_id._id || item.warehouse,
			itemSize: item_size || item.itemSize,
			recipientTel: recipient_tel || item.recipientTel,
			recipientName: recipient_name || item.recipientName,
		};

		await item.save();

		return res.status(200).json({
			status: true,
			data,
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
		let item = await Item.findOne({ _id: _id });

		if (!item) {
			return res.status(404).json({
				status: fail,
			});
		}

		item.is_deleted = true;

		await item.save();

		return res.status(201).json({
			status: true,
			data: 'deleted',
		});

		// res.render('index', items);
	} catch (error) {
		console.log(error);
	}
};
