import { useState } from "react";
//import { programsBySport2, sports } from "./data/data";
import { sports } from "./data/data";
import * as consts from "./consts";
import Container from "react-bootstrap/Container";
import { Filter } from "./Filter";
import { CardView, CardView2 } from "./ProgramTable";
import { Routes, Route, Link } from "react-router-dom";
// import { OrgView } from "./OrgView";
import { Col, Row } from "react-bootstrap";
import { AgeFilter, SportsFilterUpdater } from "./types";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* <Route path="/org/:orgname" element={<OrgView />} /> */}
      </Routes>
    </div>
  );
}

function Dashboard() {
  const [sportsFilter, setSportsFilter] = useState(new Set(sports));
  const [ageFilter, setAgeFilter] = useState({
    min: consts.MIN_FILTER_AGE,
    max: consts.MAX_FILTER_AGE,
  });

  const updateFilteredSports: SportsFilterUpdater = (
    sport: string,
    included: boolean
  ) => {
    setSportsFilter((prev) => {
      let n = new Set(Array.from(prev)); // https://github.com/Microsoft/TypeScript/issues/8856
      included ? n.add(sport) : n.delete(sport);
      return n;
    });
  };

  const updateAgeFilter = ({ min, max }: AgeFilter) => {
    if (
      min >= consts.MIN_FILTER_AGE &&
      max <= consts.MAX_FILTER_AGE &&
      min <= max
    ) {
      setAgeFilter({ min: min, max: max });
    }
  };

  //let p = programsBySport2(sportsFilter, ageFilter);

  return (
    <Container className="App">
      <Row>
        <Col>
          <Filter
            ageFilter={ageFilter}
            updateAgeFilter={updateAgeFilter}
            updateFilteredSports={updateFilteredSports}
            sports={sports}
            sportsFilter={sportsFilter}
          />
          <CardView2 />
          {/* <CardView /> */}
          {/* <AllProgramsTable programsBySport={p} skipOrgColumn={true} /> */}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
