const dayNumberToName = {
    1: "monday",
    2: "tuesday",
    3: "wednesday",
    4: "thursday",
    5: "friday",
    6: "saturday",
    0: "sunday"
}

exports.getWeekCommencing = inputDate => { // can take a simple YYYY-MM-DD string
    const today = new Date(inputDate);
    // ternary accounts for JS default where Sunday is the first day of the week, instead gets the Monday week commencing
    const mondayCurrentWeek = new Date(today.setDate(today.getDate() - (today.getDay() === 0 ? 6 : today.getDay() - 1) ));
    return weekCommencingDate = new Date(mondayCurrentWeek.setHours(0, 0, 0, 0));
}

exports.getCurrentDay = () => {
    const currentDate = new Date();
    const todayAsNumber = currentDate.getDay();
    return dayNumberToName[todayAsNumber];
}