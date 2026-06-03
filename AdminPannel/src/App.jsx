import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import MainLayout from "./Layout/MainLayout/MainLayout";
import Testimonial from "./Pages/Testimonial/Testimonial";
import Dashboard from "./Pages/Dashboard/Dashboard";



function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<MainLayout />}>
        <Route path="/students" element={<Testimonial />} />
        <Route path="/dashboard" element={<Dashboard/>}/>

        

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;