import { Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

export function WelcomeText() {
  return (
    <div>
      <p>
        Sherwood Sports is your local, crowd-sourced guide to sports
        organizations in the Sherwood area. Check out the{" "}
        <Link to="about">About</Link> for information about the site and how you
        can help,
      </p>
      <p>
        The directory below lists sports organizations and the programs they
        offer.
      </p>
      <p>Additional information includes:</p>
      <ul>
        <li>
          When the season typically runs. Highlighed programs will start within
          2 months and <span className="fw-bold">may</span> be open for
          registration, so check their sites for more information.
        </li>
        <li>
          age (e.g. <Badge pill>7-10</Badge>) or grade (e.g.
          <Badge pill bg="info">
            K-2nd
          </Badge>
          ) limits for the program
        </li>
        <li>Links to organizations and individual programs</li>
      </ul>
      <p>Many filters are also available to help narrow your search.</p>
      <p>
        I hope you find this useful, and don't hesitate to **reach out** with
        questions or feedback!
      </p>
    </div>
  );
}
