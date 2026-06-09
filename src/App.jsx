import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Mektep from "./pages/4tema/Mektep";
import MektepExercise from "./pages/4tema/MektepExercise";
import Klass from "./pages/5tema/Klass";
import KlassExercise from "./pages/5tema/KlassExercise";
import FamilyMain from "./pages/6tema/FamilyMain";
import Greetings from "./pages/1tema/Greetings";
import GreetingsExercise from "./pages/1tema/GreetingsExercise";
import TanyshuuExercise from "./pages/3tema/TanyshuuExercise";
import Taanyshuu from "./pages/3tema/Taanyshuu";
import FamilyExercise from "./pages/6tema/FamilyExercise";
import Koshtoshuu from "./pages/2tema/Koshtoshuu";
import Kim from "./pages/31tema/Kim";
import KimExercise from "./pages/31tema/KimExercise";
import Oku from "./pages/41tema/Oku";
import OkuExercise from "./pages/41tema/OkuExercise";
import Kuz from "./pages/7tema/Kuz";
import KoshtoshuuExercise from "./pages/2tema/KoshtoshuuExercise";
import KuzExercise from "./pages/7tema/KuzExercise";
import Tus from "./pages/61tema/Tus";
import TusExercise from "./pages/61tema/TusExercise";
import Sandar from "./pages/51tema/Sandar";
import SandarExercise from "./pages/51tema/SandarExercise";
import Dene from "./pages/62tema/Dene";
import DeneExercise from "./pages/62tema/DeneExercise";
import AnimalsExercise from "./pages/animals/AnimalsExercise";
import AnimalsLayout from "./pages/animals/AnimalsLayout";
import BirdsExercise from "./pages/animals/BirdsExercise";


function App() {
  return (
    <Routes>
     <Route path="/" element={<Home />} />
      <Route path="/mektep" element={<Mektep />} />
      <Route path="/mektep-exercise" element={<MektepExercise />} />
      <Route path="/klass" element={<Klass />} />
      <Route path="/klass-exercise" element={<KlassExercise/>}/>
      <Route path="/uibuloo" element={<FamilyMain/>}/>
      <Route path="/salam" element={<Greetings/>}/>
      <Route path="/salam-exercise" element={<GreetingsExercise/>}/>
      <Route path="/tanyshuu" element={<Taanyshuu/>}/>
      <Route path="/tany-exercise" element={<TanyshuuExercise/>}/>
      <Route path="/family-exercise" element={<FamilyExercise/>}/>
      <Route path="/koshtoshuu" element={<Koshtoshuu/>}/>
      <Route path="/kim" element={<Kim/>}/>
      <Route path="/kim-exercise" element={<KimExercise/>}/>
      <Route path="/okuu" element={<Oku/>}/>
      <Route path="/okuu-exercise" element={<OkuExercise/>}/>
      <Route path="/kuz" element={<Kuz/>}/>
      <Route path="/kosh" element={<KoshtoshuuExercise/>}/>
      <Route path="/kuz-exercise" element={<KuzExercise/>}/>
      <Route path="/tuc" element={<Tus/>}/>
            <Route path="/tus-exercise" element={<TusExercise/>}/>
            <Route path="/san" element={<Sandar/>}/>
            <Route path="/san_exercise" element={<SandarExercise/>}/>
            <Route path="/dene" element={<Dene/>}/>
            <Route path="/dene_exercise" element={<DeneExercise/>}/>
<Route path="/animals" element={<AnimalsLayout />}>
  <Route index element={<AnimalsExercise />} />
  <Route path="birds" element={<BirdsExercise />} />
</Route>




   </Routes>
  );
}

export default App;