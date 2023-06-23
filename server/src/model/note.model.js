import mongoose from "mongoose"

// schema
const noteSchema = new mongoose.Schema({
    title: { type: String, required: [true, 'Enter a title'] },
    content: { type: String, required: [true, 'content is required'] },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    username: { type: String, required: [true, 'User name is required'] },
    date: { type: Date, default: Date.now() },
}, { timestamps: true })

//model
const NoteModel = new mongoose.model('Note', noteSchema)

export default NoteModel;