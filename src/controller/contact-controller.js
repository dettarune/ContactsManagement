import contactService from "/home/detarune/Pictures/newFolderContacts/src/service/contact-service.js";

const create = async (req, res, next) => {
    try {
        const user = req.user
        const request = req.body
        const result = await contactService.createContact(user, request)
        res.status(200).json({
            data: result,
            message: `${user.username} Telah menambahkan Contact`
        })
    } catch (error) {
        next(error)
    }
}

const update = async(req, res, next) => {
    try {
        const user = req.user;
        const contactId = req.params.contactId;
        const request = req.body;
        request.id = contactId;

        const result = await contactService.updateContact(user, request)
        res.status(200).json({
            data: result,
            message: "Data Berhasil diupdate!"
        })
    } catch (error) {
        next(error)
    }
}

const get = async (req, res, next) => {
    try {
        const user = req.user.username
        const contactId = req.params.contactId

        const result = await contactService.getContact(user, contactId)
        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const remove = async(req, res, next) => {
    try {
        const user = req.user
        const contactId = req.params.contactId
    
        await contactService.removeContact(user, contactId)
        res.status(200).json({
            message: `Contact with ID ${contactId} has been deleted`
        })
        
    } catch (error) {
        next(error)
    }
}

const search = async(req, res, next) => {
    try {

        console.log("Request params:", request);

        const user = req.user
        const request = {
            name: req.query.name,
            email: req.query.email,
            phone: req.query.phone,
            page: parseInt(req.query.page) || 1,  // Set default jika undefined
            size: parseInt(req.query.size) || 10
        }

        const result = await contactService.searchContact(user, request)
        res.status(200).json({
            data: result.data,
            paging: result.paging
        })

    } catch (error) {
        next(error)
    }
}

export default {
    create,
    update,
    get,
    remove,
    search
}