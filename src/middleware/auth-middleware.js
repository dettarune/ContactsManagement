import {prisma} from "/home/detarune/Pictures/newFolderContacts/src/application/db.js";

export const authMiddleware = async (req, res, next) => {
    const token = req.get('Authorization');
    if (!token) {
        res.status(401).json({
            errors: `Unauthorized: header is not found`
        }).end();
    } else {
        const user = await prisma.user.findFirst({
            where: {
                token: token
            }
        });
        if (!user) {
            res.status(401).json({
                errors: `Unauthorized: user is not found`
            }).end();
        } else {
            req.user = user;
            next();
        }
    }
}