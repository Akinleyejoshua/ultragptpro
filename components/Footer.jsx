import { Space } from "./Space"

export const Footer = () => {
    return <footer>
        <div className="copy row">
            <p>Ultra GPT</p>
            <Space p={".3"}/>
            &copy;
            2024
            <Space p={".3"}/>
            <p className="dim">Built by Joshua Akinleye</p>
        </div>
    </footer>
}