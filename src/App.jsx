import { Routes, Route } from "react-router-dom"
import Welcome from "./Pages/Welcome"
import "./assets/css/bootstrap/bootstrap.min.css"
import { QuestionnaireProvider } from "./Provider/context"
import Choice from "./Pages/Choice"

function App() {

  return (
    <>
      <QuestionnaireProvider>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/choice" element={<Choice />} />
        </Routes>
      </QuestionnaireProvider>
    </>
  )
}

export default App
