import "./box.css"

const SubComponentBox = ({children, className}) => {
  return (
    <div className={`${className} subcomponent-box d-flex flex-column gap-2`}>
      {children}
    </div>
  )
}

export default SubComponentBox
