import { SORT_ORDER } from "../constants/index.js";

const parseSortOrder = (sortOrder) => {
  const isKnownOrder = [SORT_ORDER.ASC, SORT_ORDER.DESC].includes(sortOrder);
  if (isKnownOrder) return sortOrder;
  return SORT_ORDER.ASC;
};

const parseSortBy = (sortBy) => {
    const KaysOfContacts = [
        "name",
        "phoneNumber",
        "email",
        "isFavourite",
        "contactType",
        "_id",
        "createdAt",
        "updatedAt",
    ];

    if (KaysOfContacts.includes(sortBy)) {
        return sortBy;
    }

    return "_id";
};

export const parseSortParams = (query) => {
    const { sortOrder, sortBy } = query;

    const parsedSortBy = parseSortBy(sortBy);
    const parsedSortOrder = parseSortOrder(sortOrder);

    return {
        sortOrder: parsedSortOrder,
        sortBy: parsedSortBy
    };
};