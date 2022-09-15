import ReactSlider from "react-slider";
import * as consts from "./consts";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";

interface FilterProps {
  ageFilter: any;
  updateAgeFilter: any;
  updateFilteredSports: any;
  sports: any;
  sportsFilter: any;
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
  updateFilteredSports: any;
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
  updateFilteredSports: any;
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
  ageFilter: any;
  updateAgeFilter: any;
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

// // eslint-disable-next-line no-unused-vars
// function AgeRangePicker({ ageFilter, updateAgeFilter }) {
//   //const max = ageFilter.max === consts.MAX_FILTER_AGE ? `${consts.MAX_FILTER_AGE}+` : ageFilter.max;
//   const max = ageFilter.max;
//   return (
//     <div>
//       <input
//         type="number"
//         value={`${ageFilter.min}`}
//         onChange={(e) => {
//           updateAgeFilter({ min: e.target.valueAsNumber, max: ageFilter.max });
//         }}
//       />
//       <input
//         type="number"
//         value={`${max}`}
//         onChange={(e) => {
//           updateAgeFilter({ min: ageFilter.min, max: e.target.valueAsNumber });
//         }}
//       />
//     </div>
//   );
// }

// export function AgeRangePicker2({ ageFilter, updateAgeFilter }) {
//   let options = [];

//   for (let i = consts.MIN_FILTER_AGE; i <= consts.MAX_FILTER_AGE; i++) {
//     options.push(
//       <option key={i} value={i}>
//         {i}
//       </option>
//     );
//   }
//   return <Form.Select>{options.map((o) => o)}</Form.Select>;
// }
