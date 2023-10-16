/**
 * AAWeb.tech
 * https://aaweb.tech
 */
import { useState, useEffect } from 'react';
import Title from '../components/Title';
import ExchangeRate from '../components/ExchangeRate';
import useLocalStorage from '../hooks/useLocalStorage';

export default function ExchangeRates() {
    const [,,,,,,getAllData] = useLocalStorage()
    const [rates, setRates] = useState(getAllData)
    const [rateToDelete, setRateToDelete] = useState('')
    const [,,,,,,,,,deleteKey] = useLocalStorage()
    const handleDelete = (data) => {
        if(window.confirm(`Are you sure you want to delete the exchange rate for ${data.toUpperCase()}`)) {
            setRateToDelete(data)
        }
    }

    useEffect(() => {
        deleteKey(rateToDelete)
        setRates(rates.filter(item => item.key !== rateToDelete))
    }, [rateToDelete])

    return (
        <div className="container mt-3">
            <div className="card">
                <div className="card-header bg-success">
                    <Title text={"Exchange Rates"} color={"text-white"} />
                </div>
                <div className="card-body">
                    { rates.length > 0 ? (
                        <div className="row row-cols-1 row-cols-md-3 g-4">
                            {rates.map((rate) => {
                                if (rate.key.length > 3) {
                                    return <ExchangeRate key={rate.key} exchangeRateName={rate.key} exchangeRateValue={rate.value} onDelete={handleDelete} />
                                }
                            })}
                        </div>
                    ) : (
                        <div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
