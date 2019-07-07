export const profileRankQuery = ({ id }) => {
  return [
    {
      collection: "users",
      doc: `${id}`
    }
  ];
};
