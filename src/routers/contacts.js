import { Router } from "express";
import { getContactsByIdController, getAllContactsController, createContactsController, deleteContactsByIdController, patchContactsController } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createContactSchema, updateContactSchema } from "../vallidation/contacts.js";
import { isValidId } from "../middlewares/isValidId.js";
import { authenticate } from "../middlewares/authenticate.js";
import { upload } from "../middlewares/multer.js";

const contactsRouter = Router();

contactsRouter.use(authenticate);

contactsRouter.get('/', ctrlWrapper(getAllContactsController));

contactsRouter.get('/:contactId', isValidId, ctrlWrapper(getContactsByIdController));

contactsRouter.post('/', upload.single('photo'), validateBody(createContactSchema), ctrlWrapper(createContactsController));

contactsRouter.delete('/:contactId', isValidId, ctrlWrapper(deleteContactsByIdController));

contactsRouter.patch('/:contactId', upload.single('photo'), isValidId, validateBody(updateContactSchema), ctrlWrapper(patchContactsController));

export default contactsRouter;