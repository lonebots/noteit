import express from 'express'
import { createNoteHandler } from '../controller/note.controller.js'
import auth from '../middleware/auth.middleware.js'

const noteRouter = express.Router()

// routes 
noteRouter.route('/').post(auth, createNoteHandler)

export default noteRouter