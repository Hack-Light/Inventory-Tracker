let WH = require('../models/warehouse');

exports.createWareHouse = async (req, res, next) => {
	let { name, address, state, country } = req.body;
	try {
		if (!name || !address || !state || !country) {
			return;
		}

		let data = {
			name,
			address,
			state,
			country,
		};

		let warehouse = await WH.create(data);

		return res.status(201).json({
			status: true,
			data: warehouse,
		});

		// res.render('index', items);
	} catch (error) {
		console.log(error);
	}
};

exports.getWareHouse = async (req, res, next) => {
	try {
		return res.status(200).json({
			status: true,
			data: 'warehouse',
		});

		// res.render('index', items);
	} catch (error) {
		console.log(error);
	}
};
