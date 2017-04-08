/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';
import autoIncrement from'mongoose-auto-increment';
var connection = mongoose.createConnection("mongodb://localhost/ReactWebpackNode");

const CommentSchema = new mongoose.Schema({
  content_id: {type: String, ref: "Content", required: true},
  user_id: {type: Number, ref: "User"},
  comment: {type: String, required: true},
  ref_content: {type: Number, ref: "Content"},
  date: { type: Date, default: Date.now, required: true }
});

CommentSchema.plugin(autoIncrement.plugin, 'Comment');

// Compiles the schema into a model, opening (or creating, if
//	nonexistent) the 'Topic' collection in the MongoDB database
export default mongoose.model('Comment', CommentSchema);
