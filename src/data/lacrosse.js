import * as consts from '../consts'
const orgList = {
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
                    registration: consts.JAN,
                },
                {
                    name: "Adult Lacrosse",
                    season: [consts.MAY, consts.JUN],
                    registration: consts.JAN,
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

export default orgList;