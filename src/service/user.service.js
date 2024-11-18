import { getUserValidation, loginUserValidation, registerUserValidation, updateUserValidation } from "/home/detarune/Pictures/newFolderContacts/src/validation/user-validation.js";
import { validate } from "/home/detarune/Pictures/newFolderContacts/src/validation/validation.js";
import { prisma } from "/home/detarune/Pictures/newFolderContacts/src/application/db.js";
import { ResponseError } from "/home/detarune/Pictures/newFolderContacts/src/error/response_error.js";
import nodemailer from 'nodemailer'
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import rateLimitter from 'express-rate-limit'

const limitter = rateLimitter({
    windowMs: 1 * 60 * 1000,
    limit: 5,
    message: "Coba lagi setelah 1 menit"
})

const kirimToken = async (targetNama, target) => {
    const token = uuidv4()
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // upgrade later with STARTTLS
            auth: {
                user: "learnbygoogling@gmail.com",
                pass: "rnic edih qzsr ntln",
            },
        });
        console.log(`"Verifikasi" Code : ${token}`)
        await transporter.sendMail({
            from: 'learnbygoogling@gmail.com',
            to: target,
            subject: `Hello ${targetNama}!, this is your verification code`,
            text: "Verification Code : " + token,
        })

        return token

    } catch (error) {
        console.error(error.message)
    }
}

const register = async (req) => {
    const user = await validate(registerUserValidation, req)

    const countUsername = await prisma.user.count({
        where: {
            username: req.username
        }
    })

    if (countUsername > 0) {
        throw new ResponseError(400, "She is Already Taken.")
    }

    user.password = await bcrypt.hash(user.password, 10)

    return prisma.user.create({
        data: user,
        select: {
            username: true,
            mail: true
        }
    })
}

const login = async (request) => {
    try {
        const loginRequest = validate(loginUserValidation, request);

        const user = await prisma.user.findUnique({
            where: {
                username: loginRequest.username
            },
            select: {
                username: true,
                password: true,
                mail: true
            }
        });

        if (!user) {
            throw new ResponseError(400, "Username or password wrong");
        }

        const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
        if (!isPasswordValid) {
            throw new ResponseError(401, "Username or password wrong");
        }

        const ltstoken = await kirimToken(user.username, user.mail)

        return prisma.user.update({
            data: {
                token: ltstoken
            },
            where: {
                username: user.username
            },
            select: {
                token: true
            }
        });
    } catch (error) {
        console.error(error)
        throw new ResponseError(error.status, error.message);
    }

}

const getUser = async (username) => {
    const userRequest = await validate(getUserValidation, username)

    const user = await prisma.user.findUnique({
        where: {
            username: username
        },
        select: {
            username: true,
            mail: true
        }
    })

    if (!user) {
        throw new ResponseError(404, "She is not found")
    }
    return user
}

const update = async (request) => {
    const user = validate(updateUserValidation, request)
    const token = uuidv4()

    const checkUser = await prisma.user.count({
        where: {
            username: user.username,
        },
        select: {
            mail: true,
        }
    })

    if (!checkUser) {
        throw new ResponseError(404, "Users Not Found")
    }

    const data = {}

    if (user.name) {
        data.name = user.name;
    }
    if (user.password) {
        data.password = await bcrypt.hash(user.password, 10)
    }
    
    if (user.mail !== checkUser.mail) {
        data.mail = user.mail
        kirimToken(user.mail, token)
        if(user.token == token){
            return prisma.user.update({
                where: {
                    username: user.username
                },
                data: {
                    updateToken: token
                }
            })
            
        }
    }

    return prisma.user.update({
        where: {
            username: user.username
        },
        data: {
            username: user.username,
            password: user.password,
            mail: user.email
        },
        select: {
            username: true,
            mail: true
        }
    })
}

const logout = async (username) => {
    const userRequest = validate(getUserValidation, username)

    const user = await prisma.user.findUnique({
        where: {
            username: userRequest
        }
        
    })
    
    if (!user) {
        throw new ResponseError(404, "Username is not found")
    }
    
    return prisma.user.update({
        where: {
            username: username
        },
        data: {
            token: null
        },
        select: {
            username: true
        }

    })
}


export default {
    register,
    login,
    limitter,
    getUser,
    update,
    logout,
    kirimToken
}

