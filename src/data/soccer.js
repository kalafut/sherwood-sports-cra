import * as consts from '../consts'

export default {
    orgs: [
        {
            name: "Sherwood Youth Soccer",
            website: "https://www.sherwoodsoccer.org/",
            sport: consts.SOCCER,
            programs: [
                {
                    name: "Fall Soccer",
                    price: 140,
                    season: [consts.APR, consts.JUN],
                    registration: consts.JAN,
                },
                {
                    name: "Westside Timbers"
                },
            ]
        },
        {
            name: "Westside Timbers",
            website: "http://www.westsidetimbers.org/",
            sport: consts.SOCCER,
            programs: [
                {
                    name: "Timber Tots",
                    price: 140,
                    season: [consts.APR, consts.JUN],
                    registration: [consts.JAN, consts.MAR],
                    website: "http://www.westsidetimbers.org/about-us/program-overview/timber-tots-program",
                    ageMax: 6,

                },
                {
                    name: "Development Program",
                    website: "http://www.westsidetimbers.org/about-us/program-overview/development-program-wdp",
                    ageMin: 7,
                    ageMax: 10,
                },
                {
                    name: "Development Program2",
                    website: "http://www.westsidetimbers.org/about-us/program-overview/development-program-wdp",
                    gradeMin: 3,
                    gradeMax: 5,
                },
                {
                    name: "At least 10",
                    website: "http://www.westsidetimbers.org/about-us/program-overview/development-program-wdp",
                    ageMin: 10,
                },
            ]
        },
    ]
}
