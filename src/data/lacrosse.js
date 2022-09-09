import * as consts from '../consts'
export default {
    orgs: [
        {
            name: "Sherwood Youth Lacrosse",
            summary: "We play Lacrosse",
            website: "https://www.leagueathletics.com/Schedule.asp?org=sherwoodyouthlacrosse.com",
            sport: consts.LACROSSE,
            programs: [
                {
                    name: "Youth Lacrosse",
                    price: 140,
                    season: [consts.APR, consts.JUN],
                    registration: [consts.JAN, consts.MAR],
                },
                {
                    name: "Adult Lacrosse"
                },
            ]
        },
        {
            name: "Fake Lacrosse",
            summary: "We play Lacrosse too",
            sport: consts.LACROSSE,
            programs: [
                {
                    name: "Fake Youth Lacrosse"
                },
                {
                    name: "Fake Adult Lacrosse"
                },
            ]
        },
    ]
}