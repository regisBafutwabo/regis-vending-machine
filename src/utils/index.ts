export const getTimestamp = () => {
  const now = new Date();
  return now.toISOString().split('T')[1].split('.')[0];
};
