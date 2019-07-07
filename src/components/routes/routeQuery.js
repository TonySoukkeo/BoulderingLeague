export const routeDetailedQuery = ({ session, route }) => {
  return [
    {
      collection: `${session}`,
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

export const viewRouteDetailedQuery = ({ session, routeName }) => {
  return [
    {
      collection: `${session}`,
      doc: `${routeName}`,
      subcollections: [{ collection: "completed" }]
    }
  ];
};

export const routeCommentQuery = ({ session, routeName }) => {
  return [
    {
      collection: `${session}`,
      doc: `${routeName}`,
      subcollections: [{ collection: "comments" }],
      orderBy: ["datePosted", "asc"]
    }
  ];
};
