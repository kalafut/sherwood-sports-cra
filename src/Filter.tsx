import ReactSlider from "react-slider";
import * as consts from "./consts";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import {
  AgeFilter,
  AgeFilterUpdater,
  AgeRange,
  Org,
  Program,
  SportsFilterUpdater,
} from "./types";
import { Card, Nav, Tab, TabContent, TabPane, Tabs } from "react-bootstrap";

interface FilterProps {
  localFilter: boolean;
  updateLocalFilter: any;
  ageFilter: AgeFilter;
  updateAgeFilter: AgeFilterUpdater;
  updateFilteredSports: SportsFilterUpdater;
  sports: string[];
  sportsFilter: SportsFilterClass;
}

export function Filter(props: FilterProps) {
  const {
    localFilter,
    updateLocalFilter,
    ageFilter,
    updateAgeFilter,
    updateFilteredSports,
    sports,
    sportsFilter,
  } = props;
  const [filterVisible, setFilterVisible] = useState(false);

  const toggleButton = (
    <Button
      className={filterVisible ? "float-end" : ""}
      onClick={() => setFilterVisible(!filterVisible)}
    >
      {filterVisible ? "Close" : "Filter"}
    </Button>
  );

  return (
    <div>
      {!filterVisible ? (
        toggleButton
      ) : (
        <Collapse in={filterVisible}>
          <div>
            <Card>
              <Card.Header>
                <Nav variant="tabs" defaultActiveKey="a" data-bs-tabs="tabs">
                  <Nav.Item>
                    <Nav.Link data-bs-toggle="tab" href="#sports" active>
                      Sports
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link data-bs-toggle="tab" href="#age">
                      Age
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link data-bs-toggle="tab" href="#season">
                      Season & Location
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Header>
              <Card.Body className="tab-content">
                <TabPane id="sports" transition={false} active>
                  <SportFilter
                    updateFilteredSports={updateFilteredSports}
                    sports={sports}
                    sportsFilter={sportsFilter}
                  />
                </TabPane>
                <TabPane id="age" transition={false}>
                  <AgeRangeSlider
                    ageFilter={ageFilter}
                    updateAgeFilter={updateAgeFilter}
                  />
                </TabPane>
                <TabPane id="season" transition={false}>
                  <div>
                    Local:
                    <input
                      type="checkbox"
                      checked={localFilter}
                      onChange={updateLocalFilter}
                    />
                  </div>
                </TabPane>
                {toggleButton}
              </Card.Body>
            </Card>
          </div>
        </Collapse>
      )}
    </div>
  );
}

export function TestComp() {
  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title">Network Settings</h5>
        <ul className="nav nav-tabs card-header-tabs" data-bs-tabs="tabs">
          <li className="nav-item">
            <a
              className="nav-link active"
              aria-current="true"
              data-bs-toggle="tab"
              href="#dhcp"
            >
              DHCP
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-bs-toggle="tab" href="#static">
              Static
            </a>
          </li>
        </ul>
      </div>
      <form className="card-body tab-content">
        <div className="tab-pane active" id="dhcp">
          <p className="card-text">Change DHCP Network settings.</p>
        </div>
        <div className="tab-pane" id="static">
          <p className=" card-text">Change Static Network settings.</p>
        </div>
        <button className="btn btn-primary" type="submit">
          Save
        </button>
      </form>
    </div>
  );
}

interface SportFilterRowProps {
  sport: string;
  selected: boolean;
  updateFilteredSports: SportsFilterUpdater;
}

function SportFilterRow(props: SportFilterRowProps) {
  const { sport, selected, updateFilteredSports } = props;

  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        id={`sport-filter-${sport}`}
        checked={selected}
        onChange={(e) => {
          updateFilteredSports(sport, e.target.checked);
        }}
      />
      <label className="form-check-label" htmlFor={`sport-filter-${sport}`}>
        {sport}
      </label>
    </div>
  );
}

interface SportFilterProps {
  sports: string[];
  sportsFilter: SportsFilterClass;
  updateFilteredSports: SportsFilterUpdater;
}

export function SportFilter(props: SportFilterProps) {
  const { sports, sportsFilter, updateFilteredSports } = props;

  return (
    <div>
      {sports.map((sport) => (
        <SportFilterRow
          updateFilteredSports={updateFilteredSports}
          key={sport}
          sport={sport}
          selected={sportsFilter.has(sport)}
        />
      ))}
    </div>
  );
}

interface AgeRangeSliderProps {
  ageFilter: AgeRange;
  updateAgeFilter: AgeFilterUpdater;
}

export function AgeRangeSlider(props: AgeRangeSliderProps) {
  const { ageFilter, updateAgeFilter } = props;

  return (
    <ReactSlider
      className="horizontal-slider"
      thumbClassName="example-thumb"
      trackClassName="example-track"
      defaultValue={[consts.MIN_FILTER_AGE, consts.MAX_FILTER_AGE]}
      min={consts.MIN_FILTER_AGE}
      max={consts.MAX_FILTER_AGE}
      ariaLabel={["Lower thumb", "Upper thumb"]}
      ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
      renderThumb={(props, state) => {
        const v =
          state.valueNow < consts.MAX_FILTER_AGE
            ? state.valueNow
            : `${consts.MAX_FILTER_AGE}+`;
        return <div {...props}>{v}</div>;
      }}
      pearling
      minDistance={0}
      value={[ageFilter.min, ageFilter.max]}
      onChange={([low, high]) => updateAgeFilter({ min: low, max: high })}
    />
  );
}

function gradeToAge(grade: number, max: boolean) {
  const offset = max ? 6 : 5;
  if (grade) {
    return grade + offset;
  }
}

export class AgeFilterClass {
  constructor(
    public min: number = consts.MIN_FILTER_AGE,
    public max: number = consts.MAX_FILTER_AGE
  ) {}

  filter(program: Program, org: Org): boolean {
    const prog = program;

    const effectiveAgeMin =
      prog.ageMin ||
      (prog.gradeMin && gradeToAge(prog.gradeMin, false)) ||
      consts.MIN_FILTER_AGE;
    const effectiveAgeMax =
      prog.ageMax ||
      (prog.gradeMax && gradeToAge(prog.gradeMax, true)) ||
      consts.MAX_FILTER_AGE;

    return effectiveAgeMax >= this.min && effectiveAgeMin <= this.max;
  }
}

export class SportsFilterClass {
  filteredSports: Set<string>;

  constructor(sports: string[]) {
    this.filteredSports = new Set(sports);
  }

  newAdded(sport: string) {
    let s = new Set<string>(this.filteredSports);
    s.add(sport);
    return new SportsFilterClass(Array.from(s));
  }

  newDeleted(sport: string) {
    let s = new Set<string>(this.filteredSports);
    s.delete(sport);
    return new SportsFilterClass(Array.from(s));
  }

  filter(program: Program, org: Org): boolean {
    const sport = program.sport || org.sport;
    return this.filteredSports.has(sport);
  }
  has(sport: string): boolean {
    return this.filteredSports.has(sport);
  }
}
