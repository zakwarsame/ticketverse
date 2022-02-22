const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log(`MongoDB connected ${mongoose.connection.host}`.cyan.underline))
    .catch((err) => console.log(`Error: ${err.message}`.red.underline.bold));
};


module.exports = connectDB