/**
 * AAWeb.tech
 * https://aaweb.tech
 */
export default function Title({ text, color }) {
    return (
        <div>
            <h1 className={color ? color : ''}>{text ? text : ''}</h1>
        </div>
    )
}
