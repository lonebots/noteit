import noteModel from '../model/note.model.js'
import ErrorResponse from '../utils/errorResponse.utils.js'

// create note 
export async function createNote(input) {
    return await noteModel.create(input)
}

// find and update 
export async function findByIdAndUpdate(id, updatedObject) {
    return await noteModel.findByIdAndUpdate(id, updatedObject)
}

// find by id 
export async function findNoteById(id) {
    return await noteModel.findById(id);
}

// find all notes (using user_id)
export async function getAllNotesOf(userId) {
    return await noteModel.find({ user_id: userId })
}

// delete 
export async function deleteNotebyId(id) {
    return await noteModel.deleteOne({ _id: id })
}