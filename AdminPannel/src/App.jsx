import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import MainLayout from "./Layout/MainLayout/MainLayout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Testimonial from "./Pages/Testimonial/Testimonial";
import NewUser from "./Pages/NewUser/NewUser";
import NewsProfile from "./Pages/NewsProfile/NewsProfile";
import ManageEditior from "./Pages/ManageEditior/ManageEditior";
import LeadManagementHub from "./Pages/LeadManagementHub/LeadManagementHub";
import ContactManagement from "./Pages/ContactManagement/ContactManagement";
import IndexAbstracte from "./Pages/IndexAbstracte/IndexAbstracte";
import PublicationManagement from "./Pages/PublicationManagement/PublicationManagement";
import IncDocPublicationManagement from "./Component/IncDocPublicationManagement/IncDocPublicationManagement";
import Calender from "./Component/Calender/Calender";
import EditorialBoard from "./Pages/EditorialBoard/EditorialBoard";
import AuthorManagement from "./Component/AuthorManagement/AuthorManagement";

import AdminAuth from "./Pages/AdminAuth/AdminAuth";

import ProtectedRoute from "./Component/ProtectedRoute/ProtectedRoute";
import PublicRoute from "./Component/PublicRoute/PublicRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
<<<<<<< HEAD
        {/* AUTH */}
=======
        <Route path="/" element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/testimonial-management" element={<Testimonial />} />
          <Route path="/new-editor" element={<NewUser/>}/>
          <Route path="/newsprofile"element={<NewsProfile/>}/>
          <Route path="/manage-editor" element={<ManageEditior/>}/>
          <Route path="/cold-lead-management" element={<LeadManagementHub/>}/>
          <Route path="/contact-management" element={<ContactManagement/>}/>
          <Route path="/index-abstracting-management" element={<IndexAbstracte/>}/>
          <Route path="/publication-management" element={<PublicationManagement/>}/>
          <Route path="/inc-publication-management" element={<IncDocPublicationManagement/>}/>
          <Route path="/calendar-management" element={<Calender />} />
          <Route path="/editorial-board" element={<EditorialBoard/>}/>
          <Route path="/authot-table" element={<AuthorManagement/>}/>
>>>>>>> b6df283a43c115199d04b40986ac07da7f2eedd1

        <Route
          path="/login"
          element={
            <PublicRoute>
              <AdminAuth />
            </PublicRoute>
          }
        />

        {/* PROTECTED ROUTES */}

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<MainLayout />}>
            <Route
              index
              element={
                <Navigate
                  to="/dashboard"
                  replace
                />
              }
            />

            <Route
              path="dashboard"
              element={<Dashboard />}
            />

            <Route
              path="testimonial-management"
              element={<Testimonial />}
            />

            <Route
              path="new-editor"
              element={<NewUser />}
            />

            <Route
              path="newsprofile"
              element={<NewsProfile />}
            />

            <Route
              path="manage-editor"
              element={<ManageEditior />}
            />

            <Route
              path="cold-lead-management"
              element={<LeadManagementHub />}
            />

            <Route
              path="contact-management"
              element={<ContactManagement />}
            />

            <Route
              path="index-abstracting-management"
              element={<IndexAbstracte />}
            />

            <Route
              path="publication-management"
              element={<PublicationManagement />}
            />

            <Route
              path="inc-publication-management"
              element={
                <IncDocPublicationManagement />
              }
            />

            <Route
              path="calendar-management"
              element={<Calender />}
            />

            <Route
              path="editorial-board"
              element={<EditorialBoard />}
            />
          </Route>
        </Route>

        <Route
          path="*"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;