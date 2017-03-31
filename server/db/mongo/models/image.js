/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
  originalFilename: {type: String, required: true},
  genericFilename: {type: String, required: true},
});

// Compiles the schema into a model, opening (or creating, if
//	nonexistent) the 'Topic' collection in the MongoDB database
export default mongoose.model('Image', ImageSchema);
