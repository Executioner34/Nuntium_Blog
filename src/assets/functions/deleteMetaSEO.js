const deleteMetaSEO = () => {
  const headElem = document.head;
  const childList = headElem.childNodes;
  childList.forEach((child) => {
    if (child.name === 'description') {
      child.remove();
    } else if (child.name === 'title') {
      child.remove();
    } else if (child.name === 'keywords') {
      child.remove();
    }
  });
};

export default deleteMetaSEO;
