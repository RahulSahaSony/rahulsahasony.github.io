import { Link } from "react-router-dom";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";

export default function NotFound() {
  return (
    <Container>
      <div className="pt-10">
        <h1 className="text-3xl font-bold text-zinc-50">Page not found</h1>
        <p className="mt-3 text-zinc-300">The page you’re looking for doesn’t exist.</p>
        <div className="mt-6">
          <Link to="/">
            <Button variant="primary">Go home</Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}
