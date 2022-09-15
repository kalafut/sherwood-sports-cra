import * as consts from "../consts";

const orgList = {
  orgs: [
    {
      name: "Sample Sport Org 1",
      sport: consts.SAMPLE,
      programs: [
        {
          name: "Sample 1",
          season: [consts.NOV, consts.MAR],
          registration: consts.OCT,
          ageMin: 7,
          ageMax: 10,
        },
        {
          name: "No age limit",
          season: [consts.NOV, consts.MAR],
          registration: consts.OCT,
          allAges: true,
        },
      ],
    },
  ],
};

export default orgList;
