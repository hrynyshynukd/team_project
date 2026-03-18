function transformLogs(logs, locale = "uk-UA") {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const formatter = new Intl.DateTimeFormat(locale, options);

  return logs.map((log) => ({
    id: log.id,
    date: formatter.format(log.date),
    deviceId: log.deviceId,
    category: log.category,
    description: log.description,
  }));
}

module.exports = transformLogs;