import { Space } from "./Space"

export const Confirm = ({ msg, onYes, onNo }) => {
    return <div className="confirm">
        <div className="body">
            <p>{msg}</p>
            <Space p={".3rem"}/>
            <div className="confirm-actions">
                <button onClick={() => onYes()}>Yes</button>
                <Space p={"3px"}/>
                <button onClick={() => onNo()}>No</button>
            </div>
        </div>

    </div>
}