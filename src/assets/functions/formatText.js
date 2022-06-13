const formatText = (str) => {
  let text = str;
  // eslint-disable-next-line prefer-destructuring
  text = text.split('</p><p>')[0].split('<p>')[1].split('</p>')[0];
  if (text.length >= 200) text = `${text.slice(0, 200)}...`;
  return text;
};

export default formatText;
