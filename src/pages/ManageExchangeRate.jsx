/**
 * AAWeb.tech
 * https://aaweb.tech
 */
import { useEffect, useState } from 'react';
import Title from '../components/Title';
import useLocalStorage from '../hooks/useLocalStorage';
import { Link } from 'react-router-dom';

export default function ManageExchangeRate() {
    const [,,,,,,getCurrencies] = useLocalStorage()
    const [currencies, setCurrencies] = useState(getCurrencies)
    const [currency1, setCurrency1] = useState('')
    const [currency2, setCurrency2] = useState('')
    const [rate, setRate] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [,, setKey, setStoredValue, getStoredValue,,,, getValueForKey, deleteKey] = useLocalStorage()

    useEffect(() => {
        let key = `${currency1}-${currency2}`
        setKey(key)
        const val = getValueForKey(key)
        if (val) {
            setRate(val)
        } else {
            setRate('')
        }
    }, [currency1, currency2])

    function handleSelectCurrency1Change(event){
        const selectedValue = event.target.value
        setCurrency1(selectedValue)
    };

    function handleSelectCurrency2Change(event){
        const selectedValue = event.target.value
        setCurrency2(selectedValue)
    }

    function swapValues() {
        setCurrency1(currency2);
        setCurrency2(currency1);
    };

    function handleRateChange (e){
        setRate(e.target.value)
    }

    function handleExchangeRate() {
        if (currency1 === '' || currency2 === '' || rate === '' || rate <= 0) {
            setErrorMessage(`Currency #1 or Currency #2 isn't selected or exchange rate isn't entered or the rate number is not greater than 0. Please check and try again.`)
        } else {
            setErrorMessage('')
            // we check if data for currency1-currency2 already exists
            let value = getStoredValue()
            if (value === '') {
                // we do another check if data for currency2-currency1 (reversed) already exists
                let keyInversed = `${currency2}-${currency1}`
                let value2 = getValueForKey(keyInversed)
                if (value2 !== '') {
                    setStoredValue(rate)
                    deleteKey(keyInversed)
                    setSuccessMessage('Exchange rate added successfully.')
                } else {
                    setStoredValue(rate)
                    setSuccessMessage('Exchange rate added successfully.')
                }
            } else {
                // add new exchange rate
                setStoredValue(rate)
                setSuccessMessage('Exchange rate added successfully.')
            }
        }
    }

    const availableCurrency1 = currency2 ? [currency2, ...currencies] : currencies;
    const availableCurrency2 = currency1 ? [currency1, ...currencies] : currencies;

    return (
        <div className="container mt-3 mb-3">
            <div className="card">
                <div className="card-header bg-success">
                    <Title text={"Manage Exchange Rate"} color={"text-white"} />
                </div>
                <div className="card-body">
                    <div className="alert alert-info">
                        <i className="bi bi-info-circle-fill"></i><br />
                        Select 2 currencies and set how much 1 unit of currency #1 equals to currency #2.<br />
                        For example EUR 1 = USD 1.07 or USD 30000 = BTC 1<br />
                        If the exchange rate exists the data will be updated
                    </div>
                    <div className="mt-3">
                        Currency #1
                        <select value={currency1} className="form-control" onChange={handleSelectCurrency1Change}>
                            <option value="">-- Select --</option>
                            {availableCurrency1.length > 0 && availableCurrency1.map((option, index) => {
                                if (option?.key?.length === 3) {
                                    return (
                                        <option
                                            key={`option1-${option.key}`}
                                            value={option.key}
                                            disabled={currency2 === option.key}
                                        >
                                            {option.value ? option.value.name : ''}
                                        </option>
                                    );
                                } else {
                                    return null
                                }
                            })}
                        </select>
                    </div>
                    <div className="mt-3">
                        <button className="btn btn-primary" onClick={swapValues}><i className="bi bi-arrow-down-up"></i></button>
                    </div>
                    <div className="mt-3">
                        Currency #2
                        <select value={currency2} className="form-control" onChange={handleSelectCurrency2Change}>
                            <option value="">-- Select --</option>
                            {availableCurrency2.length > 0 && availableCurrency2.map((option, index) => {
                                if (option?.key?.length === 3) {
                                   return (<option
                                        key={`option2-${option.key}`}
                                        value={option.key}
                                        disabled={currency1 === option.key}
                                    >
                                        {option.value ? option.value.name : ''}
                                    </option>)
                                } else {
                                    return null
                                }
                            })}
                        </select>
                    </div>
                    <div className="mt-3">
                        <div className="alert alert-info">
                        Exchange rate currency #1 = currency #2
                            <br />
                            For big numbers e.g. 25000 do not write 25.000 but 25000
                            <br />
                            For decimal numbers use . e.g. 7.35 or 105.97 etc.
                        </div>
                        Exchange Rate
                        <input type="number" className="form-control" value={rate} onChange={handleRateChange} />
                    </div>

                    <div className="mt-3">
                        { successMessage && (<div className="alert alert-success alert-dismissible fade show" role="alert"><h4>{successMessage}</h4><button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>)}
                        { errorMessage && (<div className="alert alert-danger">{errorMessage}</div>)}
                        { currencies.length >= 2 ? (
                            <button className="btn btn-primary btn-lg" onClick={handleExchangeRate}>Save</button>
                        ) : (
                            <div className="alert alert-danger">
                                You need to have at least 2 currencies to be able to create exchange rate. <Link to="/currency">Add currency</Link>
                            </div>
                        ) }
                    </div>
                </div>
            </div>
        </div>
    )
}
