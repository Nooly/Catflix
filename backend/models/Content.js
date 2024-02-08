import mongoose from "mongoose";

// Defining the schema for Content
const contentSchema = new mongoose.Schema({
    // The title field is required
    title: {type: String, required: true},
    
    // The description field is required
    description: {type: String, required: true},
    
    // The img field is required
    img: {type: String, required: true},
    
    // The imgTitle field is required
    imgTitle: {type: String, required: true},
    
    // The imgThumb field is required
    imgThumb: {type: String, required: true},
    
    // The imgVertical field is required
    imgVertical: {type: String, required: true},
    
    // The trailer field is required
    trailer: {type: String, required: true},
    
    // The movie field is required
    movie: {type: String, required: true},
    
    // The duration field is required
    duration: {type: String, required: true},
    
    // The year field is required
    year: {type: String, required: true},
    
    // The limit field is required
    limit: {type: String, required: true},
    
    // The genre field is required
    genre: {type: String, required: true},
    
    // The isSeries field is required and is a boolean
    isSeries: {type: Boolean, required: true}
}, {
    // Enabling timestamps to record createdAt and updatedAt fields
    timestamps: true
});

// Creating the Content model from the schema
const Content = mongoose.model("Content", contentSchema);

// Exporting the Content model
export default Content;
