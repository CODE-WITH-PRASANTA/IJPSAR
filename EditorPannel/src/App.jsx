import { BrowserRouter, Routes, Route } from "react-router-dom";

import EditorProtectedRoute from "./Routes/EditorProtectedRoute";
import EditorLogin from "./Pages/Login/EditorLogin";

import MainLayout from "./Layout/Mainlayout/Mainlayout";

import EditorDashboard from "./Components/EditorDashboard/EditorDashboard";
import PaperManagement from "./Components/PaperManagement/PaperManagement";
import ReviewPaper from "./Components/ReviewPaper/ReviewPaper";
import EditPaper from "./Components/ReviewPaper/EditPaper";
import ProfileManagement from "./Components/ProfileManagement/ProfileManagement";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route
          path="/editor-login"
          element={<EditorLogin />}
        />

        {/* Protected Routes */}
        <Route element={<EditorProtectedRoute />}>

          <Route path="/" element={<MainLayout />}>

            <Route
              index
              element={<EditorDashboard />}
            />

            <Route
              path="editor-dashboard"
              element={<EditorDashboard />}
            />

            <Route
              path="paper-management"
              element={<PaperManagement />}
            />

            <Route
              path="review-paper"
              element={<ReviewPaper />}
            />

            <Route
              path="edit-paper/:id"
              element={<EditPaper />}
            />

            <Route
              path="editor-profile"
              element={<ProfileManagement />}
            />

          </Route>

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;