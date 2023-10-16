/**
 * AAWeb.tech
 * https://aaweb.tech
 */
export default function CurrencyTitle({ name, isCrypto }) {
    return (
        <div>
            <h5 className="text-white">{ isCrypto ? <i className="bi bi-coin"></i> : ''} {name ? name : ''}</h5>
        </div>
    )
}
