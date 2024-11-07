import React from 'react'

const PrimaryButton = ({ label, onClick, disabled, children, style, className, btnRef, type }) => {

    return (
        <button type={type} ref={btnRef} style={style} disabled={disabled} onClick={onClick} className={`${className}`}>
            {children || label}
        </button>
    )
}

export default PrimaryButton
