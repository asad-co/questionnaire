import "./box.css"
const SubMain = ({ children, rightAligned }) => {
    const rightAlignedClass = rightAligned? "right-align":""
    return (
        <div className={`sub-main ${rightAlignedClass}`}>
            {children}
        </div>
    )
}

export default SubMain
