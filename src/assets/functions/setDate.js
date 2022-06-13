const months = [
  'January',
  'Febrary',
  'March',
  'April',
  'May',
  'June',
  'Jule',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const setDate = (timestamp) => {
  const created = new Date(timestamp * 1000);
  const year = created.getFullYear();
  const day = created.getDate();
  const month = created.getMonth();
  return `${months[month]} ${day}, ${year}`;
};

export default setDate;
