export function formatDate(inputDateString) {
  const dateObject = new Date(inputDateString);

  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    dateObject
  );

  return formattedDate;
}

export function formateDate2(inputDateString) {
  const inputDate = new Date(inputDateString);

  const formattedDate = inputDate.toISOString().split("T")[0];
  return formattedDate;
}
