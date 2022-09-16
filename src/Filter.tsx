import ReactSlider from "react-slider";
import * as consts from "./consts";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import { AgeFilter, AgeFilterUpdater, SportsFilterUpdater } from "./types";

interface FilterProps {
  ageFilter: AgeFilter;
  updateAgeFilter: AgeFilterUpdater;
  updateFilteredSports: SportsFilterUpdater;
  sports: string[];
  sportsFilter: Set<string>;
}

export function Filter(props: FilterProps) {
  const {
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
            filteredSports={sportsFilter}
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
  filteredSports: Set<string>;
  updateFilteredSports: SportsFilterUpdater;
}

export function SportFilter(props: SportFilterProps) {
  const { sports, filteredSports, updateFilteredSports } = props;

  return (
    <div>
      {sports.map((sport) => (
        <SportFilterRow
          updateFilteredSports={updateFilteredSports}
          key={sport}
          sport={sport}
          selected={filteredSports.has(sport)}
        />
      ))}
    </div>
  );
}

interface AgeRangeSliderProps {
  ageFilter: AgeFilter;
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
