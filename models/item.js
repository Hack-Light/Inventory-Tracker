let { Schema, model } = require('mongoose');

const { customAlphabet } = require('nanoid');

const nanoid = customAlphabet(
	'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
	10,
);

const itemSchema = new Schema(
	{
		trackID: { type: String, default: () => nanoid(), unique: true },
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		recipientName: {
			type: String,
			required: true,
		},
		itemSize: {
			type: String,
			required: true,
		},
		recipientTel: {
			type: String,
			required: true,
		},
		destination: {
			type: String,
			required: true,
		},
		dispatched: { type: Boolean, default: false },
		is_deleted: { type: Boolean, default: false },
		entryDate: { type: Date, default: Date.now },
		warehouse: {
			type: Schema.Types.ObjectId,
			ref: 'warehouse',
			required: true,
		},
	},
	{ timestamps: true },
);

module.exports = model('item', itemSchema);
