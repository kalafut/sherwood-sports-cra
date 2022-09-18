import { Card } from "react-bootstrap";

export function UnderConstruction() {
  return (
    <Card className="bg-warning">
      <Card.Body>
        <h1>🚧 Under construction 🚧</h1>
        Welcome to whomever has stumbled upon this site, but please note that it
        isn't ready to go yet. Most of the data is fake and/or for testing. But
        check back soon!
      </Card.Body>
    </Card>
  );
}
