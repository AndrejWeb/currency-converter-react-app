/**
 * AAWeb.tech
 * https://aaweb.tech
 */
import { useState, useEffect, useMemo } from 'react';
import Title from '../components/Title';
import Currency from '../components/Currency';
import useLocalStorage from '../hooks/useLocalStorage';
import { Link } from 'react-router-dom';

export default function Currencies() {
    const [,,,,,,getCurrencies] = useLocalStorage()
    const [currencies, setCurrencies] = useState(getCurrencies)
    const [isFiatChecked, setIsFiatChecked] = useState(false)
    const [isCryptoChecked, setIsCryptoChecked] = useState(false)
    const [allCurrencies, setAllCurrencies] = useState(currencies)

    let currenciesAsc = useMemo(() => {
        return allCurrencies.slice().sort((a, b) => a.key.localeCompare(b.key))
    }, [currencies])

    let currenciesFiat = useMemo(() => {
        return currencies.filter(item => item.value.isCrypto === false)
    }, [currencies])

    let currenciesCrypto = useMemo(() => {
        return currencies.filter(item => item.value.isCrypto === true)
    }, [currencies])

    function handleFiatCheckbox(e) {
        setIsFiatChecked(e.target.checked)
    }

    function handleCryptoCheckbox(e) {
        setIsCryptoChecked(e.target.checked)
    }

    useEffect(() => {
        if (isFiatChecked) {
            setCurrencies(currenciesFiat)
        }
        else if (isCryptoChecked) {
            setCurrencies(currenciesCrypto)
        } else {
            setCurrencies(currenciesAsc)
        }
    }, [isFiatChecked, isCryptoChecked]);

    return (
        <div className="container mt-3">
            <div className="card">
                <div className="card-header bg-success">
                    <Title text={"Currencies"} color={"text-white"} />
                </div>
                <div className="card-body">
                    <div className="mb-3">
                        <input type="checkbox" checked={isFiatChecked} onChange={handleFiatCheckbox} /> Show only Fiat currencies
                        <br />
                        <input type="checkbox" checked={isCryptoChecked} onChange={handleCryptoCheckbox} /> Show only cryptocurrencies
                    </div>
                    { currencies.length > 0 ? (
                        <div>
                            <div className="row row-cols-1 row-cols-md-3 g-4">
                                {currencies.map((currency) => {
                                    if (currency.key.length === 3) {
                                        return <Currency key={currency.key} name={currency.value.name} description={currency.value.description} isCrypto={currency.value.isCrypto} />
                                    }
                                })}
                            </div>
                        </div>
                ) : ( <div><h2>No currencies found. <Link to="/currency">Add the first one</Link></h2></div>)
                }
                </div>
            </div>
        </div>
    )
}
