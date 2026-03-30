import DashboardLayout from "./components/layout/DashBoardLayout";
import IndexPage from "./pages/public/index";
import Surveys from "./pages/public/surveysPage";
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import Survey from "./pages/public/survey/survey";
import DepartmentsPage from "./pages/public/departmentsPage";
import CreateForm from "./pages/public/createForm"
import { Toaster } from "@/components/ui/sonner";
function App() {
 

  return (
    <>
    <Toaster position="top-right" richColors closeButton />
  <Routes>

    <Route path="/" element={<IndexPage />} />
    <Route path="/departments/:id" element={<DepartmentsPage />} />
    <Route path="/departments/:deptId/surveys/:surveyId" element={<Surveys/>} />
    <Route path="/survey/:surveyId" element={<Survey/>} />
    <Route path = "/createForm" element = {<CreateForm/>}></Route>
  </Routes>
  </>
  );

}

export default App