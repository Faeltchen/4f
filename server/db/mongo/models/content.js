/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';
import autoIncrement from'mongoose-auto-increment';
var connection = mongoose.createConnection("mongodb://localhost/ReactWebpackNode");

 autoIncrement.initialize(connection);

const ContentSchema = new mongoose.Schema({
  user_id: {type: String, required: true},
  image_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Image'},
  video_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Video'},
  date: { type: Date, default: Date.now, required: true }
});

ContentSchema.plugin(autoIncrement.plugin, 'Content');

// Compiles the schema into a model, opening (or creating, if
//	nonexistent) the 'Topic' collection in the MongoDB database
export default mongoose.model('Content', ContentSchema);
