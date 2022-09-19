import { ReactElement } from "react";
import { orgs } from "./data/data";
import React, { useState, useEffect } from "react";

export function ErrorList() {
  const [errors, setErrors] = useState([] as ReactElement[]);

  useEffect(() => {
    setErrors(findDataErrors());
  }, []);

  if (errors.length === 0) {
    return null;
  }

  return (
    <div className="bg-warning">
      <h2 className="bg-danger text-light">
        The bundled data has the following errors:
      </h2>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
    </div>
  );
}

function findDataErrors(): ReactElement[] {
  const orgNames = new Set<string>();
  const errors: ReactElement[] = [];

  orgs().forEach((org) => {
    // Check for duplicate org names
    const name = org.name;
    if (orgNames.has(name)) {
      errors.push(
        <span>
          Duplicate organization name: <strong>{name}</strong>
        </span>
      );
    } else {
      orgNames.add(name);
    }

    const programNames = new Set<string>();
    org.programs.forEach((program) => {
      // Check for duplicate program names
      const name = program.name;
      if (programNames.has(name)) {
        errors.push(
          <span>
            Duplicate program name:{" "}
            <strong>
              {org.name}/{name}
            </strong>
          </span>
        );
      } else {
        programNames.add(name);
      }

      if (
        (program.ageMin ||
          program.ageMax ||
          program.gradeMin ||
          program.gradeMax) &&
        program.allAges
      ) {
        errors.push(
          <span>
            Invalid ages:{" "}
            <strong>
              {org.name}/{name}
            </strong>{" "}
            is specifying both age limits and{" "}
            <span className="fw-bold font-monospace">allAges == true</span>
          </span>
        );
      }

      if (
        (program.ageMin || program.ageMax) &&
        (program.gradeMin || program.gradeMax)
      ) {
        errors.push(
          <span>
            Invalid ages:{" "}
            <strong>
              {org.name}/{name}
            </strong>{" "}
            is specifying both age and grade limits.
          </span>
        );
      }
    });
  });

  return errors;
}
