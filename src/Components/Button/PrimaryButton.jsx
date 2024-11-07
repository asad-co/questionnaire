import "./button.css"

const PrimaryButton = ({ label, onClick, disabled, children, style, className, btnRef, type, theme }) => {
    const themeClass = theme==="secondary"?"secondary-button":theme==="tertiary"?"tertiary-button":"primary-button"

    return (
        <button type={type} ref={btnRef} style={style} disabled={disabled} onClick={onClick} className={`${className} ${themeClass}`}>
            {children || label}
        </button>
    )
}

export default PrimaryButton
