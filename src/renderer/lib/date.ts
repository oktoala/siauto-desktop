const getDate = () => {
  const today = new Date();
  const monthGanjil = ['8', '9', '10', '11', '12'];
  const january = '1';
  const monthGenap = ['2', '3', '4', '5', '6', '7'];

  // Get year
  const year = today.getFullYear();

  // Get month
  const month = (today.getMonth() + 1).toString();
  let currYear = year;
  let whichSemester = '';

  if (month === january) {
    currYear = year - 1;
    whichSemester = 'Ganjil';
  } else if (monthGanjil.includes(month)) {
    currYear = year;
    whichSemester = 'Ganjil';
  } else if (monthGenap.includes(month)) {
    currYear = year - 1;
    whichSemester = 'Genap';
  }

  return {
    year: currYear,
    semester: whichSemester,
    default: whichSemester,
  };
};

export default getDate();
