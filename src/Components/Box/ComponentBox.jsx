import "./box.css"

const ComponentBox = ({children}) => {
  return (
    <div className="w-50 component-box gap-3">
      {children}
    </div>
  )
}

export default ComponentBox
