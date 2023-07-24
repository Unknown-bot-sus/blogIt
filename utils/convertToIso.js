const convertToISO = (dateString) => {   
  const dateParts = dateString.split(" ");
  const [year, month, day] = dateParts[0].split("-");
  const [hour, minute, second] = dateParts[1].split(":");
  const dateObject = new Date(
    Date.UTC(year, month - 1, day, hour, minute, second)
  );
  const isoDate = dateObject.toISOString();
  return isoDate; 
}

module.exports = convertToISO;