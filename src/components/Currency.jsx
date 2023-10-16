/**
 * AAWeb.tech
 * https://aaweb.tech
 */
import CurrencyTitle from './CurrencyTitle';
import { Link } from 'react-router-dom';

export default function Currency({ name, description, isCrypto }) {
    return (
        <div className="col">
            <div className="card">
                <div className="card-header bg-primary">
                    <CurrencyTitle name={ name } isCrypto={isCrypto} />
                </div>
                <div className="card-body">
                    <h5 className="card-title">{ description ? description : ''}</h5>
                    <p className="card-text">
                        <Link to={`/currency/${name}`} className="me-3"><i className="bi bi-pencil-fill"></i> Edit</Link>
                        <Link to={`/delete/${name}`}><button className="btn"><i className="bi bi-trash-fill"></i> Delete</button></Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
