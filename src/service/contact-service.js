import { prisma } from "/home/detarune/Pictures/newFolderContacts/src/application/db.js";
import { createContactValidation, getContactValidation, searchContactValidation, updateContactValidation } from "/home/detarune/Pictures/newFolderContacts/src/validation/contact-validation.js";
import { validate } from "/home/detarune/Pictures/newFolderContacts/src/validation/validation.js";
import { ResponseError } from "/home/detarune/Pictures/newFolderContacts/src/error/response_error.js";

const createContact = async (user, req) => {
    const contact = validate(createContactValidation, req)
    contact.username = user.username

    return await prisma.contact.create({
        data: contact,
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true
        }
    })
}

const updateContact = async (user, request) => {

    const contact = validate(updateContactValidation, request)

    const contactData = await prisma.contact.findFirst({
        where: {
            username: user.username,
            id: contact.id,
        },
    });

    if (!contactData) {
        throw new ResponseError(404, "ID tidak ditemukan");
    }

    return await prisma.contact.update({
        where: {
            id: contact.id
        },
        data: {
            first_name: contact.first_name,
            last_name: contact.last_name,
            email: contact.email,
            phone: contact.phone,
        },
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true
        }
    })
}

const getContact = async (user, contactId) => {

    contactId = validate(getContactValidation, contactId);

    const contact = await prisma.contact.findFirst({
        where: {
            username: user.username,
            id: contactId
        },
        data: contact,
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true
        }
    });

    if (!contact) {
        throw new ResponseError(404, "contact is not found");
    } else {
        return contact;
    }
}

const removeContact = async (user, contactId) => {

    contactId = validate(getContactValidation, contactId);

    const totalContact = await prisma.contact.count({
        where: {
            username: user.username,
            id: contactId
        }
    })

    if (totalContact !== 1) {
        throw new ResponseError(404, "ID not found")
    }

    return prisma.contact.delete({
        where: {
            id: contactId,
        }
    })
}

const searchContact = async (user, request) => {

    request = validate(searchContactValidation, request)
    const skip = (request.page - 1) * request.size;

    const filters = []
    filters.push({
        username: user.username
    })
    if (request.name) {
        filters.push({
            OR: [
                {
                    first_name: {
                        contains: request.name
                    },
                    last_name: {
                        contains: request.name
                    },
                }
            ]
        })

    }

    if (request.email) {
        filters.push({
            email: {
                contains: request.email
            }
        })
    }

    if (request.phone) {
        filters.push({
            phone: {
                contains: request.phone
            }
        })
    }
    const contacts = prisma.contact.findMany({
        where: {
            AND: filters
        },
        take: request.size,
        skip: skip
    })
    const totalItems = await prisma.contact.count({
        where: {
            AND: filters
        }
    })
    
    return {
        data: contacts,
        paging:{
            page: request.page,
            total_items: totalItems,
            total_page: Math.ceil(totalItems / request.size)
        }
    }
    
}



export default {
    createContact,
    updateContact,
    getContact,
    removeContact,
    searchContact
}