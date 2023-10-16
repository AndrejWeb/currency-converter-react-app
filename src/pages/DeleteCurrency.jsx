/**
 * AAWeb.tech
 * https://aaweb.tech
 */
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import Title from '../components/Title';

export default function DeleteCurrency() {
    const { name } = useParams()
    const navigate = useNavigate()
    const [,,,,getStoredValue,removeStoredValue] = useLocalStorage(name.toLowerCase())
    const [currency, setCurrency] = useState(getStoredValue)

    function handleDelete() {
        removeStoredValue()
        alert("Currency deleted successfully")
        navigate("/currencies")
    }

    useEffect(() => {
        if (!currency) {
            navigate("/currencies")
        }
    }, [currency]);

    return (
        <div className="container mt-3">
            <div className="card">
                <div className="card-header bg-danger">
                    <Title text={"Delete Currency"} color={"text-white"} />
                </div>
                <div className="card-body">
                    <div className="alert alert-danger">
                        <h4>Are you sure you want to delete the currency <strong>{ name }</strong> ?</h4>
                    </div>
                    <Link to="/currencies"><button className="btn btn-success me-5">Cancel</button></Link>
                    <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div>
    )
}
