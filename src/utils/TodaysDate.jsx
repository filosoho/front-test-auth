const TodaysDate = () => {
  const now = new Date();

  const options = { weekday: "long", month: "long", day: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(now);

  // Hardcoded location; replace or expand if using dynamic data
  const location = "London, UK";

  const date = `${formattedDate}, `;

  return (
    <div className="day-location">
      <p>{date}</p>
      <p>{location}</p>
    </div>
  );
};

export default TodaysDate;
