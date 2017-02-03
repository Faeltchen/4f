/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
  id: String,
  name: String,
  date: { type: Date, default: Date.now }
});

// Compiles the schema into a model, opening (or creating, if
//	nonexistent) the 'Topic' collection in the MongoDB database
export default mongoose.model('Image', ImageSchema);
