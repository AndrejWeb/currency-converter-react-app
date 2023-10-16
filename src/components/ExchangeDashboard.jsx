/**
 * AAWeb.tech
 * https://aaweb.tech
 */
import ExchangeTitle from './ExchangeTitle';
import { useState, useEffect } from 'react';

export default function ExchangeDashboard({ exchangeName, exchangeValue }) {

    // exchangeName = currency1-currency2 i.e. btc-eur, eur-usd etc.
    const data = exchangeName.split("-")
    const [currency1, setCurrency1] = useState(data[0] ?? '')
    const [currency2, setCurrency2] = useState(data[1] ?? '')
    const [rateValue, setRateValue] = useState(exchangeValue)
    const [reverseRate, setReverseRate] = useState(false)

    const currency2InitValue  = 1 / rateValue
    const [currency1Value, setCurrency1Value] = useState(1)
    const [currency2Value, setCurrency2Value] = useState(currency2InitValue)

    useEffect(() => {
        if (reverseRate) {
            setCurrency1Value(currency2Value * (1 / rateValue))
            setCurrency2Value(currency1Value * (1 / rateValue))
        } else {
            setCurrency1Value(currency2Value * rateValue)
            setCurrency2Value(currency1Value * rateValue)
        }
    }, [reverseRate])

    const handleBtnClick = () => {
        setReverseRate(prevReverseRate => !prevReverseRate)
        setCurrency1(currency2)
        setCurrency2(currency1)
    }

    const handleCurrency1ValueChange = (e) => {
        setCurrency1Value(e.target.value)
        if (!reverseRate) {
            setCurrency2Value(e.target.value * rateValue)
        } else {
            setCurrency2Value(e.target.value * (1 / rateValue))
        }
    }

    const handleCurrency2ValueChange = (e) => {
        setCurrency2Value(e.target.value)
        if (!reverseRate) {
            setCurrency1Value(e.target.value * (1 / rateValue))
        } else {
            setCurrency1Value(e.target.value * rateValue)
        }
    }

    return (
        <div className="col">
            <div className="card">
                <div className="card-header bg-primary">
                    <ExchangeTitle name={exchangeName} />
                </div>
                <div className="card-body">
                    <h5 className="card-title"><button className="btn btn-success" onClick={handleBtnClick}><i className="bi bi-arrow-left-right"></i></button></h5>
                    <div className="row">
                        <div className="col-md-5">
                            <strong>{currency1}</strong>
                            <input type="number" min="0" className="form-control" value={currency1Value} onChange={handleCurrency1ValueChange} />
                        </div>
                        <div className="col-md-2">
                            <h4 style={{marginTop: '24px'}}>=</h4>
                        </div>
                        <div className="col-md-5">
                            <strong>{currency2}</strong>
                            <input type="number" min="0" className="form-control" value={currency2Value} onChange={handleCurrency2ValueChange} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
