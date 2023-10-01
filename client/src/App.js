import MainLayout from "./components/layout/MainLayout/MainLayout";
import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home/Home";

const App = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />}/>
      </Routes>
    </MainLayout>
  );
}

export default App;
