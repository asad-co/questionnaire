import "./box.css"

const ComponentBox = ({children,isWelcome}) => {
  const welcomePageClass = isWelcome?"welcome":"non-welcome"
  return (
    <div className={`component-box gap-3 ${welcomePageClass}`}>
      {children}
    </div>
  )
}

export default ComponentBox
