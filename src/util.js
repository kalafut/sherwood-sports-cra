const monthStrConv = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dev",
}

// courtesy of: https://stackoverflow.com/a/13627586
export function ordinal(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}

export function monthStr(monthNum) {
    return monthStrConv[monthNum];
}


export function currentMonth() {
    //return 1;
    return (new Date()).getMonth() + 1;
}

export function monthInRange(month, [start, end]) {
    // Shift the range to handle spanning the end of year
    if (start > end) {
        end += 12;
        if (month < start) {
            month += 12;
        }
    }

    return start <= month && month <= end;
}

// TODO: refactor
export function ageStr(program) {
    const { allAges, ageMin, ageMax, gradeMin, gradeMax } = program;

    let ret = ''

    if (allAges) {
        return "All ages"
    }


    if (ageMin && ageMax) {
        ret = `${ageMin}–${ageMax} years`;
    } else if (ageMax) {
        ret = `2–${ageMax} years`;
    } else if (ageMin) {
        ret = `${ageMin}+ years`;
    }

    if (ret !== '') {
        return ret
    }

    if (gradeMin && gradeMax) {
        ret = `${ordinal(gradeMin)}–${ordinal(gradeMax)} grade`
    } else if (gradeMax) {
        ret = `K–${ordinal(gradeMax)} grade`
    } else if (gradeMin) {
        ret = `${ordinal(gradeMin)}+ grade`
    }

    return ret
}

export function ageStr2(program) {
    const { allAges, ageMin, ageMax, gradeMin, gradeMax } = program;

    let ret = {
        str: '',
        type: 'age', // TODO bleh
    }

    if (allAges) {
        return "All ages"
    }


    if (ageMin && ageMax) {
        ret = `${ageMin}–${ageMax}`;
    } else if (ageMax) {
        ret = `2–${ageMax}`;
    } else if (ageMin) {
        ret = `${ageMin}+`;
    }

    if (ret !== '') {
        return ret
    }

    if (gradeMin && gradeMax) {
        ret = `${gradeMin}–${ordinal(gradeMax)}`
    } else if (gradeMax) {
        ret = `K–${ordinal(gradeMax)}`
    } else if (gradeMin) {
        ret = `${ordinal(gradeMin)}+`
    }

    return ret
}