import MainLayout from "./components/layout/MainLayout/MainLayout";
import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home/Home";
import AdPage from "./components/pages/AdPage/AdPage";
import SearchAds from "./components/pages/SearchAds/SearchAds";

const App = () => {
  return (
    <MainLayout>
      <Routes>
        {/* <Route path="/adEdit/:id" element={<AdEdit />} /> */}
        <Route path="/search/:searchTerm" element={<SearchAds />} />
        <Route path="/:id" element={<AdPage />}/>
        <Route path="/" element={<Home />}/>
      </Routes>
    </MainLayout>
  );
}

export default App;
