import DashboardLayout from "./components/layout/DashBoardLayout";
import IndexPage from "./pages/public/index";
import Surveys from "./pages/public/surveysPage";
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import Survey from "./pages/public/survey/survey";
import DepartmentsPage from "./pages/public/departmentsPage";
function App() {
 

  return (

    
  <Routes>

    <Route path="/" element={<IndexPage />} />
    <Route path="/departments/:id" element={<DepartmentsPage />} />
    <Route path="/surveys/:id" element={<Surveys/>} />
    <Route path="/survey" element={<Survey/>} />
  </Routes>

  );

}

export default App