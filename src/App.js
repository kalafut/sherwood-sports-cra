import logo from './logo.svg';
//import './App.css';
import _, { startCase } from 'lodash';
import { useState } from 'react';
import { allProgramsFlat, programsBySport, programsBySport2, sports } from './data/data';
import hash from 'object-hash';
import * as consts from './consts'
import ReactSlider from 'react-slider'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

function ClubRow(props) {
  return (
    <li>
      {props.clubName}
    </li>
  )
}

// TODO: refactor
function ageStr(program) {
  const { ageMin, ageMax, gradeMin, gradeMax } = program;

  let ret = ''

  if (ageMin && ageMax) {
    ret = `${ageMin} - ${ageMax} y/o`;
  } else if (ageMax) {
    ret = `${ageMax} and under`;
  } else if (ageMin) {
    ret = `${ageMin}+ y/o`;
  }

  if (ret !== '') {
    return ret
  }

  if (gradeMin && gradeMax) {
    ret = `${gradeMin} - ${gradeMax} grade`
  } else if (gradeMax) {
    ret = `Up to ${gradeMax} grade`
  } else if (gradeMin) {
    ret = `${gradeMin}+ grade`
  }

  return ret
}

function ProgramsTable({ programs }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Org</th>
          <th scope="col">Age/Grade</th>
        </tr>
      </thead>
      <tbody>
        {
          programs.map(prog => {
            return (
              <tr key={hash(prog)}>
                <td><a href={prog.website}>{prog.name}</a></td>
                <td><a href={prog.org.website}>{prog.org.name}</a></td>
                <td>{ageStr(prog)}</td>
              </tr>
            )
          })
        }
      </tbody>
    </table >
  )
}
function AllProgramsTable({ programsBySport }) {
  //console.log("Rendering all programs!");
  return (
    <div>
      {
        _.map(programsBySport, (programs, sport) => {
          return (
            <div key={sport}>
              <h3>{sport}</h3>
              <ProgramsTable programs={programs} />
            </div>
          )
        })
      }
    </div>
  )
}

function SportFilterRow({ sport, selected, updateFilteredSports }) {
  return (
    <div className="form-check">
      <input className="form-check-input" type="checkbox" id={`sport-filter-${sport}`} checked={selected}
        onChange={
          (e) => {
            updateFilteredSports(sport, e.target.checked)
          }
        }
      />
      <label className="form-check-label" htmlFor={`sport-filter-${sport}`}>
        {sport}
      </label>
    </div>
  )
}

function SportFilter({ sports, filteredSports, updateFilteredSports }) {
  return (
    <div>
      {
        sports.map((sport) => <SportFilterRow updateFilteredSports={updateFilteredSports} key={sport} sport={sport} selected={filteredSports.has(sport)} />)
      }
    </div>
  )
}

// function ClubList() {
//   return (
//     <ul>
//       {data.clubs.map((club) => <ClubRow clubName={club} />)}
//     </ul>
//   )
// }

function AgeRangePicker({ min, max, updateAgeFilter }) {
  return (
    <div>
      <input type="number" value={`${min}`} onChange={(e) => {
        updateAgeFilter({ min: e.target.valueAsNumber, max: max });
      }} />
      <input type="number" value={`${max}`} onChange={(e) => {
        updateAgeFilter({ min: min, max: e.target.valueAsNumber });
      }} />
    </div>
  )
}

function App() {
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
  //console.log(filteredSports)
  //console.log(p)
  return (
    <Container className="p-3 App">
      <ReactSlider
        className="horizontal-slider"
        thumbClassName="example-thumb"
        trackClassName="example-track"
        defaultValue={[0, 18]}
        min={0}
        max={18}
        ariaLabel={["Lower thumb", "Upper thumb"]}
        ariaValuetext={state => `Thumb value ${state.valueNow}`}
        renderThumb={(props, state) => {
          const v = state.valueNow < 18 ? state.valueNow : "18+"
          return <div {...props}>{v}</div>
        }}
        pearling
        minDistance={0}
        value={[ageFilter.min, ageFilter.max]}
        onChange={([low, high]) => updateAgeFilter({ min: low, max: high })}
      />
      <SportFilter updateFilteredSports={updateFilteredSports} sports={sports} filteredSports={sportsFilter} />
      <AllProgramsTable programsBySport={p} />
    </Container>
  );
}

//console.log(_.groupBy(data.orgs, 'sport'));
//console.log(allProgramsFlat);
//console.log(programsBySport);
//console.log(sports);
export default App;