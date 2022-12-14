import { useState } from "react";
import { filteredOrgs, sports } from "./data/data";
import * as consts from "./consts";
import Container from "react-bootstrap/Container";
import { AgeFilterClass, Filter, SportsFilterClass, TestComp } from "./Filter";
import { CardView } from "./CardView";
import { Col, Row } from "react-bootstrap";
import {
  AgeRange,
  Org,
  Program,
  ProgramFilterer,
  SportsFilterUpdater,
} from "./types";
import { ErrorList } from "./ErrorList";
import { Routes, Route, Link } from "react-router-dom";
import { UnderConstruction } from "./UnderConstruction";
import { WelcomeText } from "./WelcomeText";
import { About } from "./About";
import { NavigationBar } from "./NavigationBar";

function App() {
  const host = window.location.host;
  const local = host.startsWith("localhost") || host.startsWith("127.0.0.1");

  return (
    <Container className="App">
      <NavigationBar />
      {!local ? <UnderConstruction /> : null}
      <ErrorList />
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="about" element={<About />} />
      </Routes>
    </Container>
  );
}

function Dashboard() {
  const [sportsFilter, setSportsFilter] = useState(
    new SportsFilterClass(sports)
  );
  const [ageFilter, setAgeFilter] = useState(new AgeFilterClass());
  const [localFilter, setLocalFilter] = useState(false);

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

  const updateLocalFilter = () => setLocalFilter(!localFilter);

  const filterLocal: ProgramFilterer = {
    filter: (program: Program, org: Org): boolean => {
      return !localFilter || !org.location;
    },
  };

  const orgs = filteredOrgs([ageFilter, sportsFilter, filterLocal]);

  return (
    <Row>
      <Col>
        <WelcomeText />
        <Filter
          localFilter={localFilter}
          updateLocalFilter={updateLocalFilter}
          ageFilter={ageFilter}
          updateAgeFilter={updateAgeFilter}
          updateFilteredSports={updateFilteredSports}
          sports={sports}
          sportsFilter={sportsFilter}
        />
        <CardView orgs={orgs} />
      </Col>
    </Row>
  );
}

export default App;
