import { Router } from "express";
import { getContactsByIdController, getAllContactsController, createContactsController, deleteContactsByIdController, patchContactsController } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createContactSchema, updateContactSchema } from "../vallidation/contacts.js";
import { isValidId } from "../middlewares/isValidId.js";

const contactsRouter = Router();

contactsRouter.get('/contacts', ctrlWrapper(getAllContactsController));

contactsRouter.get('/contacts/:contactId', isValidId, ctrlWrapper(getContactsByIdController));

contactsRouter.post('/contacts', validateBody(createContactSchema), ctrlWrapper(createContactsController));

contactsRouter.delete('/contacts/:contactId', isValidId, ctrlWrapper(deleteContactsByIdController));

contactsRouter.patch('/contacts/:contactId', isValidId, validateBody(updateContactSchema), ctrlWrapper(patchContactsController));

export default contactsRouter;