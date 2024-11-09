import "./text.css"

const Error = ({ children, className }) => {
    return (
        <span className={`error ${className}`}>
            {children}
        </span>
    )
}

export default Error
