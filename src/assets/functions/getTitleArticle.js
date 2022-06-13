const getTitleArticle = (ctx) => {
  const data = ctx;
  if (data) {
    if (data.title.length >= 30) {
      data.title = `${data.title.slice(0, 30)}...`;
    }
    return data.title;
  }
  return null;
};

export default getTitleArticle;
