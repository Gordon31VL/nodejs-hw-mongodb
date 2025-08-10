import createHttpError from "http-errors";
import { createContacts, deleteContact, getAllContacts, getContactsById, updateContact } from "../services/contacts.js";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { parseFilterParams } from "../utils/parseFilterParams.js";
import { saveFileToCloudinary } from "../utils/saveFileToCloudinary.js";
import { getEnvVar } from "../utils/getEnvVar.js";
import { saveFileToUploadDir } from "../utils/saveFileToUploadDir.js";


export const getAllContactsController = async (req, res) => {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const filter = parseFilterParams(req.query);
    
    const contacts = await getAllContacts({
        page,
        perPage,
        sortBy,
        sortOrder,
        filter,
        userId: req.user._id,
    });
        
        res.status(200).json({
            status: 200,
            message: "Successfully found contacts!",
            data: contacts,
        });
};

export const getContactsByIdController = async (req, res) => {
    const { contactId } = req.params;
    const contact = await getContactsById(contactId, req.user._id);
        
    if (!contact) {
        throw createHttpError(404, 'Contact not found');
    }

    res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
    });
};

export const createContactsController = async (req, res) => {
    const photo = req.file;

    let photoUrl;

    if (photo) {
        if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
            photoUrl = await saveFileToCloudinary(photo);
        } else {
         photoUrl = await saveFileToUploadDir(photo);
        }
    }

    const payload = {
        ...req.body,
        userId: req.user._id,
        photo: photoUrl
    };

    const contact = await createContacts(payload); 
    
    res.status(201).json({
        status: 201,
        message: "Successfully created a contact!",
        data: contact
    });
};

export const deleteContactsByIdController = async (req, res) => {
    const { contactId } = req.params;

    const contact = await deleteContact(contactId, req.user._id);

    if (!contact) {
        throw createHttpError(404, 'Contact not found');
    }

    res.status(204).send();
};

export const patchContactsController = async (req, res) => {
    const { contactId } = req.params;
    const photo = req.file;

    let photoUrl;

    if (photo) {
        if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
            photoUrl = await saveFileToCloudinary(photo);
        } else {
            photoUrl = await saveFileToUploadDir(photo);
        }
    }

    const result = await updateContact(contactId, { ...req.body, photo: photoUrl }, req.user._id);

    if (!result) {
        throw createHttpError(404, 'Contact not found');
    }

    res.status(200).json({
        status: 200,
        message: `Successfully patched a contact!`,
        data: result.contact,
    });
};