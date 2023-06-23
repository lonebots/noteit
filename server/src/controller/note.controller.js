import asyncHandler from "../middleware/async.middleware.js";
import { createNote, deleteNotebyId, findByIdAndUpdate, findNoteById, getAllNotesOf } from "../service/note.service.js";
import ErrorResponse from "../utils/errorResponse.utils.js";

// create note handler 
export const createNoteHandler = asyncHandler(async (req, res, next) => {
    const { title, content, date } = req.body;

    if (!title || !content) {
        return next(new ErrorResponse("Missing title or content"), 400); // bad request
    }

    // service call
    const note = await createNote({ title: title, content: content, date: date, user_id: req.user.id, username: req.user.username })

    if (!note) {
        return next(new ErrorResponse("Note creation failed", 400)); // bad request
    }

    return res.status(200).json({ success: true, data: note });
})

// update note handler 
export const updateNoteHandler = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const { title, content, date } = req.body

    if (!title || !content) {
        return next(new ErrorResponse("Missing items title, content, date", 400)) // bad request
    }

    const updatedPost = await findByIdAndUpdate(id, { title: title, content: content, date: date })
    if (!updatedPost) {
        return next(new ErrorResponse("updating post failed", 500)) // server error
    }

    return res.status(200).json({ success: true, data: updatedPost })
})

// find single note by id 
export const getSingleNoteHandler = asyncHandler(async (req, res, next) => {
    const { id } = req.params

    const note = await findNoteById(id);

    if (!note) {
        return next(new ErrorResponse("Post not found ", 404)); // page not foud
    }

    return res.status(200).json({ success: true, data: note })

})

// get all notes for a user 
export const getAllNotesHandler = asyncHandler(async (req, res, next) => {
    const userId = req.user.id;

    const notes = await getAllNotesOf(userId);

    if (!notes) {
        return next(new ErrorResponse("No notes found for this user", 404));
    }

    return res.status(200).json({ success: true, data: notes })
})

// delete note handler
export const deleteNoteHandler = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    if (!id) {
        return next(new ErrorResponse("missing ID parameter", 400)) // bad request
    }
    const deletedNote = await deleteNotebyId(id);

    if (!deletedNote) {
        return next(new ErrorResponse("Unable to delete note, mising file", 404)) // not found
    }

    return res.status(200).json({ success: true, data: deletedNote })

})

