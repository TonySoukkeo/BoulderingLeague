export const objectToArray = object => {
  if (object) {
    return Object.entries(object).map(e =>
      Object.assign(e[0], { total: e[1] })
    );
  }
};
