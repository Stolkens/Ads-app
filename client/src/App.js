import MainLayout from "./components/layout/MainLayout/MainLayout";
import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home/Home";
import AdPage from "./components/pages/AdPage/AdPage";

const App = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/:id" element={<AdPage />}/>
      </Routes>
    </MainLayout>
  );
}

export default App;
