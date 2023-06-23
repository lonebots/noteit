import asyncHandler from "../middleware/async.middleware.js";
import { createNote } from "../service/note.service.js";
import ErrorResponse from "../utils/errorResponse.utils.js";


// creat note handler 
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

    return res.status(200).json({ success: true, message: note });
})