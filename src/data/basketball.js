import * as consts from '../consts'

export default {
    orgs: [
        {
            name: "Sherwood Youth Basketball",
            summary: "Hoops!",
            sport: consts.BASKETBALL,
            programs: [
                {
                    name: "Rec Basketball",
                    registration: consts.SEP,
                    season: [consts.NOV, consts.FEB],
                },
                {
                    name: "Competitive Basketball"
                },
            ]
        },
    ]
}