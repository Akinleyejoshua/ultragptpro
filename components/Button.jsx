export const Button = ({loading, value, onClick}) => {
    return <button onClick={() => onClick()}>
        {loading ? <div className="spin"></div>: value}
    </button>
}