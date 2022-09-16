import { ageStr, currentMonth, monthStr, monthInRange, ordinal } from "./util";
import Badge from "react-bootstrap/Badge";
import _ from "lodash";
import hash from "object-hash";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { orgs } from "./data/data";
import { Org, Program } from "./types";

export function CardView2() {
  const m = currentMonth();

  const cards = orgs().map((org) => {
    return (
      <Card key={hash(org)}>
        <Card.Body>
          <Card.Title>
            <a href={org.url}>{org.name}</a>
          </Card.Title>
          <Card.Text>Some intro text about the organization.</Card.Text>
          <h5>Programs</h5>
          <ListGroup variant="flush">
            {org.programs.map((program) => {
              const prog = program;
              return (
                <ListGroup.Item
                  key={hash(prog)}
                  variant={
                    prog.registration &&
                    monthInRange(m, [prog.registration, prog.season![0]])
                      ? "warning"
                      : ""
                  }
                  className="d-flex align-items-start justify-content-between"
                >
                  <Col className="d-flex align-items-start justify-content-start">
                    {program.url ? (
                      <a href={program.url}>{program.name}</a>
                    ) : (
                      program.name
                    )}
                  </Col>
                  <Col className="d-flex align-items-start justify-content-end">
                    <Col className="d-flex justify-content-end">
                      <div>
                        {program.season
                          ? `${monthStr(program.season[0])}–${monthStr(
                              program.season[1]
                            )}`
                          : ""}
                      </div>
                    </Col>
                    <Col className="d-flex justify-content-end">
                      <AgeBadge program={program} />
                    </Col>
                  </Col>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Card.Body>
      </Card>
    );
  });

  // TODO: can I somehow use <Row/> here?
  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">
      {cards.map((c, i) => (
        <Col key={i}>{c}</Col>
      ))}
    </div>
  );
}

interface AgeBadgeProps {
  program: Program;
}

function AgeBadge(props: AgeBadgeProps) {
  const { allAges, ageMin, ageMax, gradeMin, gradeMax } = props.program;

  let ret;

  if (allAges) {
    return (
      <Badge pill bg="success">
        All
      </Badge>
    );
  }

  if (ageMin && ageMax) {
    ret = `${ageMin}–${ageMax}`;
  } else if (ageMax) {
    ret = `2–${ageMax}`;
  } else if (ageMin) {
    ret = `${ageMin}+`;
  }

  if (ret) {
    return (
      <Badge pill bg="primary">
        {ret}
      </Badge>
    );
  }

  if (gradeMin && gradeMax) {
    ret = `${gradeMin}–${ordinal(gradeMax)}`;
  } else if (gradeMax) {
    ret = `K–${ordinal(gradeMax)}`;
  } else if (gradeMin) {
    ret = `${ordinal(gradeMin)}+`;
  }

  //return <Badge pill bg="primary">{ret}</Badge>
  return (
    <Badge pill bg="info">
      {ret}
    </Badge>
  );
}

export function CardView({ orgs }: { orgs: Org[] }) {
  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>
            <a href="https://cnn.com">Sherwood Youth Lacrosse</a>
          </Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
            <br></br>
            <br></br>
            <h5>Programs</h5>
            <ListGroup variant="flush">
              <ListGroup.Item className="d-flex align-items-start justify-content-between">
                <Col className="d-flex align-items-start justify-content-start">
                  A
                </Col>
                <Col className="d-flex align-items-start justify-content-end">
                  <Col className="d-flex justify-content-start">
                    <span>Apr–May</span>
                  </Col>
                  <Col className="d-flex justify-content-end">
                    <Badge pill>K–2nd</Badge>
                  </Col>
                </Col>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex align-items-start justify-content-between">
                <Col className="d-flex align-items-start justify-content-start">
                  <a href="https://www.leagueathletics.com/Page.asp?n=107395&org=sherwoodyouthlacrosse.com">
                    <span className="fw-bold">Fiddlesticks</span>
                  </a>
                </Col>
                <Col className="d-flex align-items-start justify-content-end">
                  <Col className="d-flex justify-content-start">
                    <span>Apr–May</span>
                  </Col>
                  <Col className="d-flex justify-content-end">
                    <Badge pill>K–2nd</Badge>
                  </Col>
                </Col>
              </ListGroup.Item>
            </ListGroup>
          </Card.Text>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <span className="fw-bold">Fiddlesticks</span>: Apr–May, K–2nd
              grade
            </ListGroup.Item>
            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  );
}

// export function AllProgramsTable({
//   programsBySport,
//   skipCostColumn = true,
//   skipOrgColumn = false,
// }) {
//   if (_.keys(programsBySport).length === 0) {
//     return (
//       <div>
//         <h1>No Results!</h1>
//       </div>
//     );
//   }

//   return (
//     <table className="table">
//       <thead>
//         <tr className="table-light">
//           <th className="borderless" scope="col">
//             Program
//           </th>
//           {skipOrgColumn ? null : (
//             <th className="borderless" scope="col">
//               Org
//             </th>
//           )}
//           {skipCostColumn ? null : (
//             <th className="borderless" scope="col">
//               Cost
//             </th>
//           )}
//           <th className="borderless" scope="col">
//             Season
//           </th>
//           <th className="borderless" scope="col">
//             Age/Grade
//           </th>
//         </tr>
//       </thead>
//       <tbody>
//         {_.map(programsBySport, (programs, sport) => {
//           return (
//             <Fragment key={hash([sport, programs])}>
//               <tr key={sport} className="fw-bold">
//                 <td colSpan={4}>{sport}</td>
//               </tr>
//               <ProgramTableRows
//                 key={hash(programs)}
//                 programs={programs}
//                 skipOrgColumn={skipOrgColumn}
//               />
//               <tr>
//                 <td className="borderless" colSpan={4}></td>
//               </tr>
//             </Fragment>
//           );
//         })}
//       </tbody>
//     </table>
//   );
// }

// export function ProgramTableRows({
//   programs,
//   skipCostColumn = true,
//   skipOrgColumn = false,
// }) {
//   const rows = programs.map((prog) => {
//     let reg = false;
//     let active = false;

//     const m = currentMonth();
//     if (
//       prog.registration &&
//       monthInRange(m, [prog.registration, prog.season[0]])
//     ) {
//       reg = true;
//     }

//     if (prog.season && monthInRange(m, prog.season)) {
//       active = true;
//     }

//     let bg = "light",
//       text = "dark";
//     if (reg) {
//       bg = "success";
//       text = "";
//     } else if (active) {
//       bg = "light";
//       text = "success";
//     }

//     let dateRange = prog.season
//       ? `${monthStr(prog.season[0])}–${monthStr(prog.season[1])}`
//       : "";

//     let b = (
//       <Badge bg={bg} text={text}>
//         {dateRange}
//         <Badge>Inner</Badge>
//       </Badge>
//     );
//     if (!reg && !active) {
//       b = (
//         <Badge bg="light" text="dark">
//           {dateRange}
//         </Badge>
//       );
//     }

//     b = <span className={active ? "fw-bold" : null}>{dateRange}</span>;

//     let style = { border: 0 };

//     return (
//       <tr key={hash(prog)}>
//         <td style={style}>
//           <a href={prog.url}>
//             {prog.name} {reg ? <Badge bg="success">R</Badge> : null}
//           </a>
//         </td>
//         {skipOrgColumn ? null : (
//           <td style={style}>
//             <Link to={`/org/${prog.org.id}`}>{prog.org.name}</Link>
//           </td>
//         )}
//         {skipCostColumn ? null : <td style={style}>{prog.cost || ""}</td>}
//         <td style={style}>{b}</td>
//         <td style={style}>{ageStr(prog)}</td>
//       </tr>
//     );
//   });

//   return <>{rows}</>;
// }
