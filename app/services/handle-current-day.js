
exports.getFirstDayOfCurrentWeek = () => {
    const today = new Date();
    const firstDay = new Date(today.setDate(today.getDate() - today.getDay()));
    const firstDayAtZeroHundred = new Date(firstDay.setHours(0, 0, 0, 0));
    return firstDayAtZeroHundred;
}

exports.getCurrentDayOfTheWeek = () => {
    const currentDate = new Date();
    const todayAsNumber = currentDate.getDay();
    return todayAsNumber.toString();
}

exports.getWeekCommencingFromDate = dateInput => {
    const weekCommencingRaw = new Date(dateInput.setDate(dateInput.getDate() - dateInput.getDay()));
    const weekCommencingAtZeroHundred = new Date(weekCommencingRaw.setHours(0, 0, 0, 0));
    return weekCommencingAtZeroHundred;
}

