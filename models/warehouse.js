let { Schema, model } = require('mongoose');

const { customAlphabet } = require('nanoid');

const nanoid = customAlphabet(
	'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
	5,
);

const warehouseSchema = new Schema(
	{
		warehouseID: { type: String, default: () => nanoid(), unique: true },
		name: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
		state: {
			type: String,
			required: true,
		},

		country: {
			type: String,
			required: true,
		},
		inventory: {
			type: Schema.Types.ObjectId,
			ref: 'item',
		},
	},
	{ timestamps: true },
);

module.exports = model('item', warehouseSchema);
