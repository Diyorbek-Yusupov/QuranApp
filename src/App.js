import { Route, Routes } from "react-router-dom";
import MainLayout from "./layout/Layout";
import PlayerLayout from "./layout/PlayerLayout";
import AyahList from "./pages/ayahList/AyahList.page";
import Home from "./pages/home/Home";
import SurahList from "./pages/surahList/SurahList.page";

function App() {
   return (
      <Routes>
         <Route path="/" element={<PlayerLayout />}>
            <Route index element={<Home />} />
            <Route path="/surahs" element={<MainLayout />}>
               <Route index element={<SurahList />} />
               <Route path="/surahs/:id" element={<AyahList />} />
            </Route>
         </Route>
      </Routes>
   );
}

export default App;
