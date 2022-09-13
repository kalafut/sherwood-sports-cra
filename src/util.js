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
        ret = `${ageMin} - ${ageMax} y/o`;
    } else if (ageMax) {
        ret = `${ageMax} and under`;
    } else if (ageMin) {
        ret = `${ageMin}+ y/o`;
    }

    if (ret !== '') {
        return ret
    }

    if (gradeMin && gradeMax) {
        ret = `${gradeMin} - ${gradeMax} grade`
    } else if (gradeMax) {
        ret = `Up to ${gradeMax} grade`
    } else if (gradeMin) {
        ret = `${gradeMin}+ grade`
    }

    return ret
}