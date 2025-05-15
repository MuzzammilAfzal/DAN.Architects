const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  contentType: { type: String, required: true },
  data: { type: Buffer, required: true },
//   projectName:{ type: String, required: true },
//   startDate:{ type: String, required: true },
//   targetDate:{ type: String, required: true },
//   siteLocation:{ type: String, required: true },
//   team:{ type: String, required: true },
//   details:{ type: String, required: true },
//   completedPercentage:{ type: String, required: true },
});
module.exports = mongoose.model("File", fileSchema);