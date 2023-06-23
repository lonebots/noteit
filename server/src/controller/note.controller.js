import asyncHandler from "../middleware/async.middleware.js";
import { createNote, findByIdAndUpdate, findNoteById } from "../service/note.service.js";
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

    const post = await findNoteById(id);

    if (!post) {
        return next(new ErrorResponse("Post not found ", 404)); // page not foud
    }

    return res.status(200).json({ success: true, data: post })

})

// TODO : delete note handler 

// TODO : get all notes for a user 