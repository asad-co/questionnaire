import { Routes, Route } from "react-router-dom"
import Welcome from "./Pages/Welcome"
import "./assets/css/bootstrap/bootstrap.min.css"
import { QuestionnaireProvider } from "./Provider/context"

function App() {

  return (
    <>
      <QuestionnaireProvider>
        <Routes>
          <Route path="/" element={<Welcome />} />
        </Routes>
      </QuestionnaireProvider>
    </>
  )
}

export default App
