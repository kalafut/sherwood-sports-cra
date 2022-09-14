import { ageStr, currentMonth, monthStr, monthInRange } from './util';
import Badge from 'react-bootstrap/Badge';
import _ from 'lodash';
import hash from 'object-hash';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';


export function AllProgramsTable({ programsBySport, skipCostColumn = true, skipOrgColumn = false }) {
    if (_.keys(programsBySport).length === 0) {
        return <div>
            <h1>No Results!</h1>
        </div>
    }

    return (
        <table className="table">
            <thead>
                <tr className='table-light'>
                    <th className="borderless" scope="col">Program</th>
                    {skipOrgColumn ? null : <th className="borderless" scope="col">Org</th>}
                    {skipCostColumn ? null : <th className="borderless" scope="col">Cost</th>}
                    <th className="borderless" scope="col">Season</th>
                    <th className="borderless" scope="col">Age/Grade</th>
                </tr>
            </thead>
            <tbody>
                {
                    _.map(programsBySport, (programs, sport) => {
                        return (
                            <Fragment key={hash([sport, programs])}>
                                <tr key={sport} className="fw-bold"><td colSpan={4}>{sport}</td></tr>
                                <ProgramTableRows key={hash(programs)} programs={programs} skipOrgColumn={skipOrgColumn} />
                                <tr><td className="borderless" colSpan={4}></td></tr>
                            </Fragment>
                        )
                    })
                }
            </tbody>
        </table >
    )
}

export function ProgramTableRows({ programs, skipCostColumn = true, skipOrgColumn = false }) {
    const rows = programs.map(prog => {
        let reg = false;
        let active = false;

        const m = currentMonth();
        if (prog.registration && monthInRange(m, [prog.registration, prog.season[0]])) {
            reg = true;
        }

        if (prog.season && monthInRange(m, prog.season)) {
            active = true;
        }

        let bg = "light", text = "dark";
        if (reg) {
            bg = "success";
            text = "";
        } else if (active) {
            bg = "light"
            text = "success"
        }

        let dateRange = prog.season ? `${monthStr(prog.season[0])}–${monthStr(prog.season[1])}` : '';

        let b = <Badge bg={bg} text={text}>{dateRange}<Badge>Inner</Badge></Badge>
        if (!reg && !active) {
            b = <Badge bg="light" text="dark">{dateRange}</Badge>
        }

        b = <span className={active ? "fw-bold" : null}>{dateRange}</span>

        let style = { border: 0 };

        return (
            <tr key={hash(prog)}>
                <td style={style}><a href={prog.url}>{prog.name} {reg ? <Badge bg="success">R</Badge> : null}</a></td>
                {skipOrgColumn ? null :
                    <td style={style}>
                        <Link to={`/org/${prog.org.id}`}>{prog.org.name}</Link>
                    </td>
                }
                {skipCostColumn ? null : <td style={style}>{prog.cost || ''}</td>}
                <td style={style}>{b}</td>
                <td style={style}>{ageStr(prog)}</td>
            </tr>
        )
    })

    return <>{rows}</>
}