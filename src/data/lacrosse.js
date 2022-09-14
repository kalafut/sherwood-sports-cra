import * as consts from '../consts'
const orgList = {
    orgs: [
        {
            name: "Sherwood Youth Lacrosse",
            summary: "We play Lacrosse",
            url: "https://www.leagueathletics.com/Schedule.asp?org=sherwoodyouthlacrosse.com",
            sport: consts.LACROSSE,
            programs: [
                {
                    name: "Fiddlesticks",
                    url: "https://www.leagueathletics.com/Page.asp?n=107395&org=sherwoodyouthlacrosse.com",
                    cost: "$175",
                    season: [consts.APR, consts.MAY],
                    registration: consts.JAN,
                    gradeMin: 0,
                    gradeMax: 2,
                },
                {
                    name: "Youth Lacrosse",
                    cost: "$140",
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