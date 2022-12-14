import {
  currentMonth,
  monthStr,
  monthInRange,
  ordinal,
  isUpcoming,
} from "./util";
import Badge from "react-bootstrap/Badge";
import hash from "object-hash";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import { Org, Program } from "./types";
import { programsBySport } from "./data/data";
import * as consts from "./consts";

interface CardViewProps {
  orgs: Org[];
}

export function CardView(props: CardViewProps) {
  const orgs = props.orgs;
  const m = currentMonth();

  const cards = orgs.map((org: Org) => {
    return (
      <Card key={hash(org)} border={org.location ? "danger" : "secondary"}>
        <Card.Body>
          <Card.Title>
            <div className="d-flex justify-content-between">
              <a href={org.url}>{org.name}</a>
              <span className="fw-bold fs-6 text-danger">
                {org.location ? org.location : null}
              </span>
            </div>
          </Card.Title>
          <Card.Text>Some intro text about the organization.</Card.Text>
          <ListGroup variant="flush">
            {org.programs.map((program) => {
              const prog = program;

              const startingSoon = isUpcoming(m, prog.season);
              //monthInRange(m, [prog.registration, prog.season![0]]);

              return (
                <ListGroup.Item
                  key={hash(prog)}
                  variant={startingSoon ? "warning" : ""}
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
                      <Season program={program} />
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

interface SeasonProps {
  program: Program;
}

function Season(props: SeasonProps) {
  const { season } = props.program;

  if (!season || season === consts.ALL_YEAR) {
    return null;
  }

  return <div>{`${monthStr(season[0])}???${monthStr(season[1])}`}</div>;
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
    ret = `${ageMin}???${ageMax}`;
  } else if (ageMax) {
    ret = `2???${ageMax}`;
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
    ret = `${gradeMin}???${ordinal(gradeMax)}`;
  } else if (gradeMax) {
    ret = `K???${ordinal(gradeMax)}`;
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
