function formatDate(date) {
    return new Date(date).toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric" });
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
const getNextHalfYear = () => {
    const date = new Date();
    let month = date.getMonth();
    let year = date.getFullYear();
    let res = '';
    let results = [];
    for (let i = 0; i < 6; i++) {
        res = '';
        if (month > 11) {
            month = 0;
            year += 1;
        }
        res += months[month];
        res += ' ';
        res += year;
        results.push(res);
        month += 1;
    }
    return results;
}

const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const getStartAndEndDate = (date) => {
    let [month, year] = date.split(' ');
    month = months.indexOf(month);

    let startdate = new Date(Number(year), month, 1);
    let enddate;
    if (month === 1 && leapYear(Number(year))) {
        enddate = new Date(Number(year), month, days[month] + 1, 23, 59, 59);
    }
    else {
        enddate = new Date(Number(year), month, days[month], 23, 59, 59)
    }
    return [startdate, enddate];
}

const leapYear = (year) => {
    if (year % 100 === 0) {
        if (year % 400 === 0) {
            return true;
        }
        return false;
    }
    else if (year % 4 === 0) {
        return true;
    }
    else {
        return false;
    }
}


export { formatDate, getNextHalfYear, getStartAndEndDate, leapYear };