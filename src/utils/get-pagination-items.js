export const getPaginationItems = (items, page, pageSize) => {
  if(!items?.length){
    return {items: [], totalPages: 0}
  }
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const totalPages = Math.ceil(items.length / pageSize);

  return {
    items: items.slice(startIndex, endIndex),
    totalPages,
  }
}
