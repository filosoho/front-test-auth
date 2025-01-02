export const calculateReadTime = (content) => {
  const wordsPerMinute = 200;
  const textLength = content.split(/\s+/).length;
  const readTime = Math.ceil(textLength / wordsPerMinute);
  return readTime;
};
