import { CONTACT_TYPES } from "../constants/index.js";

const parseType = (type) => {
    if (CONTACT_TYPES.includes(type)) {
        return type;
    }
    return null;
};

const parseIsFavourite = (isFavourite) => {
    if (isFavourite === 'true') return true;
    if (isFavourite === 'false') return false;
    return null;
};

export const parseFilterParams = (query) => {
    const { type, isFavourite } = query;

    const parsedIsFavourite = parseIsFavourite(isFavourite);
    const parsedType = parseType(type);

    const filter = {};
    
    if (parsedType !== null) {
        filter.contactType = parsedType;
    }
    
    if (parsedIsFavourite !== null) {
        filter.isFavourite = parsedIsFavourite;
    }

    return filter;
};