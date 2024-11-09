import "./box.css"

const TextBox = ({ children }) => {
    return (
        <div className="text-box p-4 gap-3">
            {children}
        </div>
    )
}

export default TextBox
