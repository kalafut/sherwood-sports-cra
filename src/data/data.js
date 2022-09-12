import _ from 'lodash';
import lacrosse from './lacrosse';
import basketball from './basketball';
import soccer from './soccer';
import sample from './sample';
import * as consts from '../consts'

// sport can be overridden per program
const data = {
    orgs: [].concat(
        basketball.orgs,
        lacrosse.orgs,
        soccer.orgs,
        sample.orgs
    )
}

// TODO: combine
function gradeToAge(grade, max) {
    const offset = max ? 6 : 5;
    if (grade) {
        return grade + offset
    }
}

export const allProgramsFlat = _.flatMap(data.orgs, (org) => {
    //console.log(org)
    return org.programs.map(prog => {
        if (prog.sport === undefined) {
            prog.sport = org.sport
        }
        if ((prog.ageMin || prog.ageMax || prog.gradeMin || prog.gradeMax) && prog.allAges) {
            throw (`Data Error: Program "${prog.name}" is specifying both age limits and allAges == true`)
        }
        prog.effectiveAgeMin = prog.ageMin || gradeToAge(prog.gradeMin, false) || consts.MIN_FILTER_AGE;
        prog.effectiveAgeMax = prog.ageMax || gradeToAge(prog.gradeMax, true) || consts.MAX_FILTER_AGE;

        return { ...prog, org: org }
    })
});

export const sports = _.uniq(allProgramsFlat.map(v => v.sport)).sort()

export const programsBySport = _.groupBy(allProgramsFlat, 'sport')

export function programsBySport2(sportsFilter, ageFilter) {
    const filtered = allProgramsFlat.filter((v) =>
        (sportsFilter.length == 0 || sportsFilter.has(v.sport)) &&
        (v.effectiveAgeMax >= ageFilter.min && v.effectiveAgeMin <= ageFilter.max)
    )

    return _.groupBy(filtered, 'sport')
}