import express from 'express'
import { createNoteHandler, updateNoteHandler } from '../controller/note.controller.js'
import auth from '../middleware/auth.middleware.js'

const noteRouter = express.Router()

// routes 
noteRouter.route('/').post(auth, createNoteHandler)

// crud
noteRouter.route('/:id').put(auth, updateNoteHandler)

export default noteRouter