import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,

} from "react-router-dom";
import MainLayout from "./Layout/MainLayout/MainLayout";
import UnpublishdPaper from "./Components/UnpublishdPaper/UnpublishdPaper"
import PublishPapper from "./Components/PublishPapper/PublishPapper";
import ReedemPoints from "./Pages/ReedemPoints/ReedemPoints";
import Transaction from "./Pages/Transaction/Transaction";
import Password from "./Pages/Password/Password";
import CalendarPage from "../../AuthorPannel/src/Pages/CalendarPage/CalendarPage";



const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Layout Wrapper */}
        <Route path="/" element={<MainLayout />}>
        <Route path="/published-papers" element={<PublishPapper />} /> 
        <Route path="/unpublished-papers" element={<UnpublishdPaper/>}/>
         <Route path="/redeem-points" element={<ReedemPoints />} />
         <Route path="/transaction-history" element={<Transaction />} />
         <Route path="/change-password" element={<Password/>}/>
        

          
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;