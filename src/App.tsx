import { useState } from "react";
import { filteredOrgs, orgs, sports } from "./data/data";
import * as consts from "./consts";
import Container from "react-bootstrap/Container";
import { AgeFilterClass, Filter, SportsFilterClass } from "./Filter";
import { CardView } from "./OrdCardView";
import { Routes, Route, Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { AgeFilter, AgeRange, Program, SportsFilterUpdater } from "./types";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

function Dashboard() {
  const [sportsFilter, setSportsFilter] = useState(
    new SportsFilterClass(sports)
  );
  const [ageFilter, setAgeFilter] = useState(new AgeFilterClass());

  const updateFilteredSports: SportsFilterUpdater = (
    sport: string,
    included: boolean
  ) => {
    setSportsFilter((prev: SportsFilterClass) => {
      return included ? prev.newAdded(sport) : prev.newDeleted(sport);
    });
  };

  const updateAgeFilter = ({ min, max }: AgeRange) => {
    if (
      min >= consts.MIN_FILTER_AGE &&
      max <= consts.MAX_FILTER_AGE &&
      min <= max
    ) {
      setAgeFilter(new AgeFilterClass(min, max));
    }
  };

  const testFilter = (program: Program) => {
    return program.name > "";
  };

  const orgs = filteredOrgs([ageFilter, sportsFilter]);

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
          <CardView orgs={orgs} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
