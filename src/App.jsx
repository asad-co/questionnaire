import { Routes, Route } from "react-router-dom"
import Welcome from "./Pages/Welcome"
import "./assets/css/bootstrap/bootstrap.min.css"
import { QuestionnaireProvider } from "./Provider/context"
import Choice from "./Pages/Choice"
import Score from "./Pages/Score"
import Thanks from "./Pages/Thanks"

function App() {

  return (
    <>
      <QuestionnaireProvider>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/choice" element={<Choice />} />
          <Route path="/score" element={<Score />} />
          <Route path="/thanks" element={<Thanks />} />
        </Routes>
      </QuestionnaireProvider>
    </>
  )
}

export default App
