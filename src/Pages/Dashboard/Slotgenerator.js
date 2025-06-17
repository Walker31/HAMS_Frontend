// utils/slotGenerator.js
export const generateTimeSlots = (interval) => {
  const slots = [];
  let start = new Date();
  start.setHours(9, 0, 0, 0); // 9:00 AM

  const end = new Date();
  end.setHours(17, 0, 0, 0); // 5:00 PM

  while (start < end) {
    const slot = start.toTimeString().substring(0, 5); // "HH:MM"
    slots.push(slot);
    start = new Date(start.getTime() + interval * 60000); // add interval mins
  }
  return slots;
};
