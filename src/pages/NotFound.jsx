/**
 * AAWeb.tech
 * https://aaweb.tech
 */
import { Link } from 'react-router-dom';
export default function NotFound() {
    return (
        <div className="container mt-3">
            <h1>404 Not Found</h1>
            <Link to="/" className={"btn btn-primary"}>Return to Dashboard</Link>
        </div>
    )
}
