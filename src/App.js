import { useState } from 'react';
import { programsBySport2, sports } from './data/data';
import * as consts from './consts'
import Container from 'react-bootstrap/Container';
import { Filter } from './Filter';
import { AllProgramsTable } from './ProgramTable';
import { Routes, Route, Link } from "react-router-dom";
import { OrgView } from './OrgView';


function App() {
  return (
    <div className="App">
      <Link to='/'>Main</Link>
      <br />
      <Link to="/about">About</Link>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="about" element={<OrgView />} />
      </Routes>
    </div>
  )
}

function Dashboard() {
  const [sportsFilter, setSportsFilter] = useState(new Set(sports));
  const [ageFilter, setAgeFilter] = useState({ min: consts.MIN_FILTER_AGE, max: consts.MAX_FILTER_AGE })

  const updateFilteredSports = (sport, present) => {
    setSportsFilter(prev => {
      let n = new Set([...prev]);
      present ? n.add(sport) : n.delete(sport);
      return n
    })
  }

  const updateAgeFilter = ({ min, max }) => {
    if (min >= consts.MIN_FILTER_AGE && max <= consts.MAX_FILTER_AGE && min <= max) {
      setAgeFilter({ min: min, max: max });
    }
  }

  let p = programsBySport2(sportsFilter, ageFilter);

  return (
    <Container className="p-3 App">
      <Filter ageFilter={ageFilter} updateAgeFilter={updateAgeFilter}
        updateFilteredSports={updateFilteredSports} sports={sports} sportsFilter={sportsFilter} />
      <AllProgramsTable programsBySport={p} />
    </Container>
  );
}

export default App;