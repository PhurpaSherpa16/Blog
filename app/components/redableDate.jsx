export default function RedableDate({ date }) {
  if (!date) return "No date";

  const tempDate = date?.toDate ? date.toDate() : new Date(date);

  return tempDate.toLocaleDateString('en-US',{
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
