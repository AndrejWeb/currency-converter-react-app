/**
 * AAWeb.tech
 * https://aaweb.tech
 */
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom'
import Title from '../components/Title';
import useLocalStorage from '../hooks/useLocalStorage';
import ExchangeDashboard from '../components/ExchangeDashboard';

export default function Dashboard() {
    const [,,,,,,getRates] = useLocalStorage()
    const [data, setData] = useState(getRates)

    const rates = useMemo(() => {
        return data.filter(item => item.key.length > 3)
    }, [data])

    return (
        <div className="container mt-3">
            <div className="card">
                <div className="card-header bg-success">
                    <Title text={"Dashboard"} color={"text-white"} />
                </div>
                <div className="card-body">
                    <div className="alert alert-info">
                        <i className="bi bi-info-circle-fill"></i> Enter numeric value in one of the currency to see how much it will be worth in the other currency.
                    </div>
                    { rates.length > 0 ? (
                        <div className="row row-cols-1 row-cols-md-3 g-4">
                            {rates.map((rate) => {
                                return <ExchangeDashboard key={rate.key} exchangeName={rate.key} exchangeValue={rate.value} />
                            })}
                        </div>
                    ) : (<div><h2>There are no exchange rates at the moment. <Link to="/exchange">Add the first one</Link></h2></div>)
                    }
                </div>
            </div>
        </div>
    )
}
