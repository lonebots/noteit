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