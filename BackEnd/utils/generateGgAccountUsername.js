const generateUniqueNameFromFullName = (fullName) => {
  const nameParts = fullName.trim().split(/\s+/);
  const date2023 = new Date("2023-01-01T00:00:00Z"); // 'Z' indicates UTC time

  const currentDate = new Date();

  const msSince2023 = currentDate - date2023;

  const newName =
    nameParts[0].charAt(0).toLowerCase() +
    nameParts[nameParts.length - 1].toLowerCase();
  const username = `${newName}${msSince2023}`;
  return username
};
module.exports = generateUniqueNameFromFullName;
