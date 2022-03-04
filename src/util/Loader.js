import { Spinner } from "react-bootstrap";

function Loader() {
  return (
    <div className="d-flex justify-content-center pe-2">
      <Spinner animation="border" variant="dark" />
    </div>
  );
}

export default Loader;
