export const sortObjectBy = <T extends Record<string, unknown>>(
  list: T[],
  keyName: keyof T
) => {
  const newList = [...list];

  newList.sort((a, b) => {
    if (a[keyName] < b[keyName]) {
      return -1;
    } else if (a[keyName] > b[keyName]) {
      return 1;
    }
    return 0;
  });

  return newList;
};
