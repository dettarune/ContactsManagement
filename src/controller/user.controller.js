import userService from "/home/detarune/Pictures/newFolderContacts/src/service/user.service.js";

const register = async (req, res, next) => {
    try {
        const result = await userService.register(req.body);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const login = async (req, res, next) => {
    try {
        const result = await userService.login(req.body);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const getUser= async (req, res, next) => {
    try {
        const result = await userService.getUser(req.user.username)
        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const user = req.user;  
        const request = req.body;  

        const updatedContact = await userService.update(request);

        res.status(200).json({
            data: updatedContact,
            message: "Data telah berhasil diupdate",
        });
    } catch (error) {
        next(error);  
    }
};

const logout = async (req, res, next) => {
    try {
        await userService.logout(req.user.username)
        res.status(200).json({
            message: "Log Out Succesfull!"
        })
    } catch (error) {
        next(error)
    }
}


export default {
    register,
    login,
    getUser,
    update,
    logout
};

