export const generateUid = () => {//TODO
  return (
    Date.now().toString(36) +
    Math.round(Math.random() * 1000)
      .toString(36)
      .substring(1, 4)
  );
};
