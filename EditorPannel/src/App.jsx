import { BrowserRouter, Routes, Route } from "react-router-dom";

import EditorProtectedRoute from "./Routes/EditorProtectedRoute";
import EditorLogin from "./Pages/Login/EditorLogin";

import MainLayout from "./Layout/Mainlayout/Mainlayout";
import PaperManagement from "./Components/PaperManagement/PaperManagement";
import ReviewPaper from "./Components/ReviewPaper/ReviewPaper";
import EditPaper from "./Components/ReviewPaper/EditPaper";
// import EditorDashboard from "./Pages/EditorDashboard/EditorDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/editor-login" element={<EditorLogin />} />

        {/* Protected Routes */}
        <Route element={<EditorProtectedRoute />}>
          <Route path="/" element={<MainLayout />} />

          <Route
            path="/editor-dashboard"
            // element={<EditorDashboard />}
          />
          <Route path="/paper-management" element={<PaperManagement />} />
          <Route path="/review-paper" element={<ReviewPaper />} />

          <Route path="/edit-paper/:id" element={<EditPaper />} />

          {/* Add all protected routes here */}
          {/* <Route path="/editor-profile" element={<EditorProfile />} /> */}
          {/* <Route path="/editor-papers" element={<EditorPapers />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
