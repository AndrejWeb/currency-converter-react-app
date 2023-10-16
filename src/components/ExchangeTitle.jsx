/**
 * AAWeb.tech
 * https://aaweb.tech
 */
export default function ExchangeTitle({ name }) {
    return (
        <div>
            <h5 className="text-white">{name ? name.toUpperCase() : ''}</h5>
        </div>
    )
}
