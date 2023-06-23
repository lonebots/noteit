import express from 'express'
import { createNoteHandler, getSingleNoteHandler, updateNoteHandler } from '../controller/note.controller.js'
import auth from '../middleware/auth.middleware.js'
import { getAllNotesHandler } from '../controller/note.controller.js'

const noteRouter = express.Router()

// routes 
noteRouter.route('/')
    .post(auth, createNoteHandler)
    .get(auth, getAllNotesHandler)

// crud
noteRouter.route('/:id')
    .get(auth, getSingleNoteHandler)
    .put(auth, updateNoteHandler)

export default noteRouter