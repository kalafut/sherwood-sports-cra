import { useParams } from 'react-router-dom';
import { orgById } from './data/data';

export function OrgView() {
    let params = useParams();
    const org = orgById(params.orgname);
    return (
        <div>This is the <strong>{org.name}</strong> page!</div>
    )
}