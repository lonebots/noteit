import noteModel from '../model/note.model.js'

// create note 
export async function createNote(input) {
    return await noteModel.create(input)   
}

