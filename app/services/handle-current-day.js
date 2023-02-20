
exports.getFirstDayOfCurrentWeek = () => {
    const today = new Date();
    const firstDay = new Date(today.setDate(today.getDate() - today.getDay()));
    const firstDayAtZeroHundred = new Date(firstDay.setHours(0, 0, 0, 0));
    return firstDayAtZeroHundred;
}

exports.getCurrentDayOfTheWeek = () => {
    const currentDate = new Date(today.setDate());
    const todayAsNumber = currentDate.getDay();
    return todayAsNumber;
}

