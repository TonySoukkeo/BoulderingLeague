export const routeDetailedQuery = ({ season, route }) => {
  return [
    {
      collection: `${season}`,
      doc: `${route}`
    }
  ];
};

export const userDetailedQuery = user => {
  return [
    {
      collection: "users",
      doc: `${user.uid}`
    }
  ];
};

export const viewRouteDetailedQuery = ({ season, routeName }) => {
  return [
    {
      collection: `${season}`,
      doc: `${routeName}`,
      subcollections: [{ collection: "completed" }]
    }
  ];
};

export const routeCommentQuery = ({ season, routeName }) => {
  return [
    {
      collection: `${season}`,
      doc: `${routeName}`,
      subcollections: [{ collection: "comments" }],
      orderBy: ["datePosted", "asc"]
    }
  ];
};
