import express from 'express'
import contactController from '/home/detarune/Pictures/newFolderContacts/src/controller/contact-controller.js'
import userController from '/home/detarune/Pictures/newFolderContacts/src/controller/user.controller.js'
import { authMiddleware } from '/home/detarune/Pictures/newFolderContacts/src/middleware/auth-middleware.js'

const userRouter = express.Router()

userRouter.use(authMiddleware)
// user API
userRouter.get('/api/users/currents', userController.getUser)
userRouter.patch('/api/users/update', userController.update)
userRouter.delete("/api/users/logout", userController.logout)

// contact API
userRouter.post("/api/contacts", contactController.create)
userRouter.get('/api/contacts/:contactId', contactController.get);
userRouter.patch("/api/contacts/:contactId", contactController.update);
userRouter.delete("/api/contacts/:contactId", contactController.remove);
userRouter.get('/api/contacts/search', contactController.search);

export {
    userRouter
}