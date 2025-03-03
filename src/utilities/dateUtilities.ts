export function getDates(hours: number) {
  if (hours < 0) {
    throw new Error("Hours should be greater than 0");
  }

  // Get current date
  const startDate = new Date();

  // Clone the date and add hours to it
  const endDate = new Date(startDate);
  endDate.setHours(endDate.getHours() + hours);

  return {
    start: startDate.toISOString(),
    end: endDate.toISOString(),
  };
}

export function getFutureDateInISO(hours: number) {
  if (hours <= 0) {
    throw new Error("Hours must be greater than 0");
  }

  const currentDate = new Date(); // Get the current date and time
  currentDate.setHours(currentDate.getHours() + hours); // Add the number of hours to the current time

  return currentDate.toISOString(); // Return the ISO string representation of the new date and time
}


export function isExpired(expiry_date: string): boolean {
  const currentDate = new Date();
  const expiryDate = new Date(expiry_date);

  return currentDate > expiryDate;
}



export function formatDateToDDMMYYYY(dateString: string) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
}