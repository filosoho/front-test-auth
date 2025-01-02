import { formatDistanceToNow } from "date-fns";

export const formatDate = (dateString) => {
  const date = new Date(dateString);

  const dateOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  };

  const formattedDate = date.toLocaleDateString("en-GB", dateOptions);
  const formattedTime = date.toLocaleTimeString("en-GB", timeOptions);

  return {
    formattedDate,
    formattedTime,
  };
};

export const timeAgo = (dateString) => {
  return formatDistanceToNow(new Date(dateString), { addSuffix: true });
};
