const addMetaSEO = (data) => {
  const arrSeo = Object.entries(data);
  const headElem = document.head;
  arrSeo.forEach((arr) => {
    const linkElem = document.createElement('meta');
    const [key, value] = arr;
    if (key && value) {
      linkElem.name = key;
      linkElem.content = value;
      headElem.appendChild(linkElem);
    }
  });
};

export default addMetaSEO;
