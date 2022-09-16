import { useState } from "react";
import { orgs, sports } from "./data/data";
import * as consts from "./consts";
import Container from "react-bootstrap/Container";
import { Filter } from "./Filter";
import { CardView } from "./OrdCardView";
import { Routes, Route, Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { AgeFilter, SportsFilterUpdater } from "./types";

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
          <CardView orgs={orgs()} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
