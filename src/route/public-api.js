import express from 'express'
import userController from '/home/detarune/Pictures/newFolderContacts/src/controller/user.controller.js'

const publicRouter = express.Router()

publicRouter.use(express.json())
publicRouter.post('/api/users/register', userController.register);
publicRouter.post('/api/users/login', userController.login);


export {
    publicRouter
}