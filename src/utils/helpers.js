/**
 * @module helpers
 * @description Utility functions for date and time formatting and calculations
 */

/**
 * Formats a date string from a timestamp into DD / MM / YYYY format
 *
 * @param {string|number|Date} createdAt - The timestamp or date object to format
 * @returns {string} Formatted date string in DD / MM / YYYY format
 *
 * @example
 * // Returns "15 / 06 / 2023"
 * calculateDate("2023-06-15T10:30:00Z");
 */
export const calculateDate = (createdAt) => {
  const createdDate = new Date(createdAt);
  const dd = String(createdDate.getDate()).padStart(2, "0");
  const mm = String(createdDate.getMonth() + 1).padStart(2, "0");
  const yyyy = createdDate.getFullYear();
  return `${dd} / ${mm} / ${yyyy}`;
};

/**
 * Calculates the time difference between the current date and a given date
 *
 * @param {string|number|Date} createdAt - The timestamp or date object to compare with current date
 * @returns {Object} Object containing time difference in years, months, days, hours, and minutes
 * @property {number} years - Number of years difference
 * @property {number} months - Number of months difference
 * @property {number} days - Number of days difference
 * @property {number} hours - Number of hours difference
 * @property {number} minutes - Number of minutes difference
 *
 * @example
 * // Returns something like { years: 0, months: 2, days: 5, hours: 3, minutes: 45 }
 * getTimeDifference("2023-03-10T08:15:00Z");
 */
export const getTimeDifference = (createdAt) => {
  const now = new Date();
  const createdDate = new Date(createdAt);
  let years = now.getFullYear() - createdDate.getFullYear();
  let months = now.getMonth() - createdDate.getMonth();
  let days = now.getDate() - createdDate.getDate();
  let hours = now.getHours() - createdDate.getHours();
  let minutes = now.getMinutes() - createdDate.getMinutes();

  if (minutes < 0) {
    minutes += 60;
    hours--;
  }
  if (hours < 0) {
    hours += 24;
    days--;
  }
  if (days < 0) {
    const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += lastMonth.getDate();
    months--;
  }
  if (months < 0) {
    months += 12;
    years--;
  }
  return { years, months, days, hours, minutes };
};

/**
 * Formats a time difference into a human-readable string with translation support
 *
 * @param {number} years - Number of years
 * @param {number} months - Number of months
 * @param {number} days - Number of days
 * @param {number} hours - Number of hours
 * @param {number} minutes - Number of minutes
 * @param {Function} t - Translation function that accepts a key and returns translated text
 * @returns {string} Formatted time difference string (e.g., "since 2 years and 3 months")
 *
 * @example
 * // Assuming t is a translation function
 * // Returns "since 2 days and 5 hours"
 * formatTimeDifference(0, 0, 2, 5, 30, t);
 */
export const formatTimeDifference = (
  years,
  months,
  days,
  hours,
  minutes,
  t
) => {
  let formatted = "";
  if (years > 0) {
    formatted = `${years} ${t("year")}`;
    if (months > 0) {
      formatted += ` ${t("and")} ${months} ${t("month")}`;
    }
  } else if (months > 0) {
    formatted = `${months} ${t("month")}`;
    if (days > 0) {
      formatted += ` ${t("and")} ${days} ${t("day")}`;
    }
  } else if (days > 0) {
    formatted = `${days} ${t("day")}`;
    if (hours > 0) {
      formatted += ` ${t("and")} ${hours} ${t("hour")}`;
    }
  } else if (hours > 0) {
    formatted = `${hours} ${t("hour")}`;
    if (minutes > 0) {
      formatted += ` ${t("and")} ${minutes} ${t("minute")}`;
    }
  } else {
    formatted = `${minutes} ${t("minute")}`;
  }

  return t("since") + " " + formatted || t("now");
};

export function formattedDate(date) {
  let formattedDate = new Date(date);
  formattedDate = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(formattedDate);

  return formattedDate;
}

export const truncateText = (text, limit = 280) =>
  text?.length > limit ? text.substring(0, limit) + "..." : text;

export const calculateExpectedEndDate = (createdAt, days) => {
  const createdDate = new Date(createdAt);
  createdDate.setDate(createdDate.getDate() + days);
  const dd = String(createdDate.getDate()).padStart(2, "0");
  const mm = String(createdDate.getMonth() + 1).padStart(2, "0");
  const yyyy = createdDate.getFullYear();
  return `${dd} / ${mm} / ${yyyy}`;
};

export const formatMessageTime = (timestamp) => {
  const date = new Date(timestamp);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  const minutesStr = minutes < 10 ? "0" + minutes : minutes;
  const timeStr = `${hours}:${minutesStr} ${ampm}`;
  return timeStr;
};
