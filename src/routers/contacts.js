import { Router } from "express";
import { getContactsByIdController, getAllContactsController, createContactsController, deleteContactsByIdController, patchContactsController } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const contactsRouter = Router();

contactsRouter.get('/contacts', ctrlWrapper(getAllContactsController));

contactsRouter.get('/contacts/:contactId', ctrlWrapper(getContactsByIdController));

contactsRouter.post('/contacts', ctrlWrapper(createContactsController));

contactsRouter.delete('/contacts/:contactId', ctrlWrapper(deleteContactsByIdController));

contactsRouter.patch('/contacts/:contactId', ctrlWrapper(patchContactsController));

export default contactsRouter;