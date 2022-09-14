import { useParams } from 'react-router-dom';
import { orgById } from './data/data';
import { Fragment } from 'react';
import { ProgramTableRows } from './ProgramTable';
import { Link } from 'react-router-dom';

export function OrgView() {
    let params = useParams();
    const org = orgById(params.orgname);

    return (
        <div>
            <Link to={'/'}>Back</Link>
            <h1>{org.name}</h1>
            <h3>Overview</h3>
            <p>
                <strong>Main website</strong>: {org.url ? <a href={org.url}>{org.url}</a> : <span>None</span>}
            </p>
            <h2>Programs</h2>
            <ProgramList programs={org.programs} />
            <h3>Useful links</h3>
        </div>
    )
}

function ProgramList({ programs }) {
    return (
        <table className="table">
            <thead>
                <tr className='table-light'>
                    <th className="borderless" scope="col">Program Name</th>
                    <th className="borderless" scope="col">Cost</th>
                    <th className="borderless" scope="col">Season</th>
                    <th className="borderless" scope="col">Age/Grade</th>
                </tr>
            </thead>
            <tbody>
                {
                    <Fragment>
                        <ProgramTableRows programs={programs} skipCostColumn={false} skipOrgColumn={true} />
                    </Fragment>
                }
            </tbody>
        </table >
    )
}