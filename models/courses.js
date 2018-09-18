const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
const Schema = mongoose.Schema;

const CourseSchema = new Schema({

	courseName: String,
	contents: [Schema.Types.Mixed],
	templateURL: String

});

mongoose.model("courses", CourseSchema);
