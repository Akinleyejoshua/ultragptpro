export const Input = ({className, val, type, placeholder, onChange}) => {
    return <div className="input-bar">
        <input className={className} value={val} type={type} placeholder={placeholder} onChange={e => onChange(e.target.value)}/>
    </div>
}