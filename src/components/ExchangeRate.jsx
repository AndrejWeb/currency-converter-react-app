/**
 * AAWeb.tech
 * https://aaweb.tech
 */
import { useState } from 'react';
import ExchangeTitle from './ExchangeTitle';
import useLocalStorage from '../hooks/useLocalStorage';

export default function ExchangeRate({ exchangeRateName, exchangeRateValue, onDelete }) {
     const [exchangeName, setExchangeName] = useState(exchangeRateName)
     const [exchangeRate, setExchangeRate] = useState(exchangeRateValue)
     const [,,, setStoredValue] = useLocalStorage(exchangeName)

    const handleRateChange = (e) => {
       setExchangeRate(e.target.value)
    }

    const handleUpdate = () => {
        if (exchangeRate > 0) {
            setStoredValue(exchangeRate)
            alert("Exchange rate updated successfully")
        } else {
            alert("Exchange rate must be greater than 0")
        }
    }

    const handleDelete = (e) => {
         onDelete(exchangeName)
    }

    return (
        <div className="col">
            <div className="card">
                <div className="card-header bg-primary">
                    <ExchangeTitle name={exchangeName} />
                </div>
                <div className="card-body">
                    <h5 className="card-title">
                        <button className="btn btn-danger btn-sm" onClick={handleDelete}><i className="bi bi-trash-fill"></i></button>
                    </h5>
                    <p className="card-text">
                        <input type="number" min="0" className="form-control" value={exchangeRate} onChange={handleRateChange} />
                        <button className="btn btn-primary mt-3" onClick={handleUpdate}>Update</button>
                    </p>
                </div>
            </div>
        </div>
    )
}
