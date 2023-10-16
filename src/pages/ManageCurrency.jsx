/**
 * AAWeb.tech
 * https://aaweb.tech
 */
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Title from '../components/Title';
import useLocalStorage from '../hooks/useLocalStorage';

export default function ManageCurrency() {
    let initialFormData = {
        name: '',
        description: '',
        isCrypto: false,
    }

    const formRef = useRef(null)
    const { name} = useParams()
    let initialKey = ''
    if (undefined !== name) {
        initialKey = name.toLowerCase()
    }

    const navigate = useNavigate()
    const [formSubmitted, setFormSubmitted] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [key,, setKey, setStoredValue, getStoredValue] = useLocalStorage(initialKey, '')

    let currencyData = {}
    if (initialKey !== '') {
        currencyData = getStoredValue()
        if (!currencyData) {
            navigate("/currency")
        }
        initialFormData = currencyData
    }

    const [formData, setFormData] = useState(initialFormData)
    const [currencyName, setCurrencyName] = useState(formData.name)
    const [currencyDescription, setCurrencyDescription] = useState(formData.description)
    const [isCrypto, setIsCrypto] = useState(false)
    const [resetForm, setResetForm] = useState(false)

    useEffect(() => {
        if (resetForm) {
            setErrorMessage('')
            setSuccessMessage('')
        }
        else if(currencyName.length === 3) {
            setErrorMessage('')
        } else {
            setErrorMessage(prevError => 'The currency name must be exactly 3 characters')
            setSuccessMessage('')
        }
        setFormData({
            name: currencyName,
            description: currencyDescription,
            isCrypto: isCrypto,
        })
    }, [currencyName, currencyDescription, isCrypto, formSubmitted, resetForm])

    function handleNameChange(e) {
        setCurrencyName(e.target.value)
        if (e.target.value !== '') {
            setKey(e.target.value.toLowerCase())
        }
    }

    function handleDescriptionChange(e) {
        setCurrencyDescription(e.target.value)
    }

    function handleCryptoChange(e) {
        setIsCrypto(e.target.checked)
    }

    function handleReset() {
        setKey('')
        setResetForm(true)
        setCurrencyName('')
        setCurrencyDescription('')
        setIsCrypto(false)
        setSuccessMessage('')
        setErrorMessage('')
    }

    function handleSubmit(e) {
        e.preventDefault()
        setFormSubmitted(true)
        setResetForm(false)
        if(errorMessage === '' && key !== '') {
            setStoredValue(formData)
            setSuccessMessage('Currency data saved successfully.')
            setFormData(initialFormData)
        }
    }

    return (
        <div className="container mt-3">
            <div className="card">
                <div className="card-header bg-success">
                    <Title text={"Manage Currency"} color={"text-white"} />
                </div>
                <div className="card-body">
                    <button type="button" className="btn btn-default mb-3" onClick={handleReset}>Reset Form</button>
                    <form ref={formRef} onSubmit={handleSubmit}>
                        { successMessage && <div className="alert alert-success alert-dismissible fade show" role="alert"><h4>{successMessage}</h4><button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>}
                        <div className="mb-3">
                            <div className="alert alert-info"><i className="bi bi-info-circle-fill"></i><br />
                                Currency Name ISO 4217 Standard - e.g. USD, EUR, CAD, GBP, BTC etc. - exactly 3 characters.<br />
                                You can also enter cryptocurrency like BTC, ETH, LTC etc. but make sure to select the checkbox to indicate it is a cryptocurrency.<br />
                                If the currency name being added already exists, the data for this currency will be updated - duplicate record will not be created.
                            </div>
                            { formSubmitted && errorMessage && <div className="alert alert-danger">{errorMessage}</div> }
                            <input type="text" name="name" maxLength="3" className="form-control" placeholder="Currency Name - ISO 4217 Standard" onChange={handleNameChange} value={currencyName} />
                            <input type="checkbox" name="isCrypto" checked={isCrypto} onChange={handleCryptoChange} /> Is Cryptocurrency
                        </div>
                        <hr/>
                        <div className="mb-3">
                            <div className="alert alert-info">
                                <i className="bi bi-info-circle-fill"></i> Currency Description (optional) - e.g. United States Dollar, EURO, Canadian Dollar, British Pound, Bitcoin etc.
                            </div>
                                <input type="text" name="description" className="form-control" placeholder="Currency Description (optional)" onChange={handleDescriptionChange} value={currencyDescription} />
                        </div>
                        <hr/>
                        <button type="submit" className="btn btn-primary btn-lg">Save</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
