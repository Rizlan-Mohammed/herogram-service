import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

// Define the media schema
const mediaSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: uuidv4,
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        default: []
    },
    size: {
        type: String
    },
    uploadDate: {
        type: Date,
        default: Date.now
    },
    views: {
        type: Number,
        default: 0
    },
    shares: {
        type: Number,
        default: 0
    },
    shareId: {
        type: String,
        default: null 
    }
});

// Create the Media model
const Media = mongoose.model('Media', mediaSchema);

export default Media;
