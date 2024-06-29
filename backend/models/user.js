const mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");

const USER_ORDER = new mongoose.Schema({
    USER_PIZZA : [{ type: mongoose.Schema.Types.Mixed }],
    USER_BEVERAGE : [{ type: mongoose.Schema.Types.Mixed }],
    USER_GARLIC : [{ type: mongoose.Schema.Types.Mixed }],
    USER_DESSERT : [{ type: mongoose.Schema.Types.Mixed }],
  });


const WEB_USER = new mongoose.Schema({
    Name: { type: String, required: true },
    Password: { type: String, required: true },
    Address: { type: String, required: true },
    Phone: { type: Number, required: true },
    Order: { type: USER_ORDER, default: {} },
});
// const Kitten = mongoose.model('Kitten', ToDoSchema);

exports.web_user = mongoose.model('user',WEB_USER)