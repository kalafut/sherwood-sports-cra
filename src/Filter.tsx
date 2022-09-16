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
  const [filterVisible, toggleFilter] = useState(true);

  const toggleButton = (
    <Button onClick={() => toggleFilter(!filterVisible)}>{`${
      filterVisible ? "Hide" : "Show"
    } filters!`}</Button>
  );

  return (
    <div>
      {toggleButton}
      <Collapse in={filterVisible}>
        <div>
          <AgeRangeSlider
            ageFilter={ageFilter}
            updateAgeFilter={updateAgeFilter}
          />
          <SportFilter
            updateFilteredSports={updateFilteredSports}
            sports={sports}
            sportsFilter={sportsFilter}
          />
          Local:
          <input
            type="checkbox"
            checked={localFilter}
            onChange={updateLocalFilter}
          />
        </div>
      </Collapse>
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
