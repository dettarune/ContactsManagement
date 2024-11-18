import express from 'express';
import { publicRouter } from '/home/detarune/Pictures/newFolderContacts/src/route/public-api.js';
import { errorMiddleware } from '/home/detarune/Pictures/newFolderContacts/src/middleware/error-middleware.js';
import { userRouter } from '/home/detarune/Pictures/newFolderContacts/src/route/api.js';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(publicRouter);
app.use(userRouter)
app.use(errorMiddleware)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
