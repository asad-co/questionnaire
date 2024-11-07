import "./button.css"

const PrimaryButton = ({ label, onClick, disabled, children, style, className, btnRef, type }) => {

    return (
        <button type={type} ref={btnRef} style={style} disabled={disabled} onClick={onClick} className={`${className} primary-button`}>
            {children || label}
        </button>
    )
}

export default PrimaryButton
