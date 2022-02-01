export default function currYears() {
  const today = new Date();
  const monthGanjil = ['8', '9', '10', '11', '12'];
  const january = '1';
  const monthGenap = ['2', '3', '4', '5', '6', '7'];

  // Get year
  const year = today.getFullYear();

  // Get month
  const month = (today.getMonth() + 1).toString();
  let currYear = year;

  if (month === january) {
    currYear = year - 1;
  } else if (monthGanjil.includes(month)) {
    currYear = year;
  } else if (monthGenap.includes(month)) {
    currYear = year - 1;
  }

  return currYear;
}
