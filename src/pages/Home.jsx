import "./Home.css"
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"

import gerb from "../assets/gerb.png"
import book from "../assets/book.png"
import school_bildung from "../assets/school_bildung.png"
import classs from "../assets/class.png"
import family from "../assets/all_family.png"
import bay2 from "../assets/2tema/bay2.png" 
import girl from "../assets/3tema/girl1.png"
import boy from "../assets/2tema/image2.png"
import img from "../assets/2tema/image4.png"
import sandar from "../assets/2tema/sandar.png"
import dene from "../assets/2tema/dene.png"
import kuz from "../assets/31tema/main_kuz.png"
import tus from "../assets/31tema/red_flower.png"



function Home(){

return(

<div>

<Navbar/>

<div className="layout">

<Sidebar/>

<div className="content">

<h1>Кош келиниз </h1>

<div className="images">

<img src={gerb}/>
</div>

{/* темы */}

<div className="topics">

<Link to="/salam">
  <div className="topicCard">
    <img src={book} />
    <p>Саламдашабыз</p>
  </div>
</Link>

<Link to="/koshtoshuu">
<div className="topicCard">
<img src={bay2}/>
<p>Коштошобуз</p>
</div>
</Link>


<Link to="/tanyshuu">
<div className="topicCard">
<img src={girl}/>
<p>Таанышабыз</p>
</div>
</Link>

  <Link to="/kim" >
    <div className="topicCard">
      <img src={img}  />
      <p>Ким? Эмне?</p>
    </div>
  </Link>

  <Link to="/mektep" >
    <div className="topicCard">
      <img src={school_bildung}  />
      <p>Мектепке барам</p>
    </div>
  </Link>

  <Link to="/okuu" >
    <div className="topicCard">
      <img src={boy}  />
      <p>Окуу куралдары</p>
    </div>
  </Link>

  <Link to="/klass" >
    <div className="topicCard">
      <img src={classs} />
      <p>Менин классым</p>
    </div>
  </Link>

   <Link to="/san" >
    <div className="topicCard">
      <img src={sandar}  />
      <p>Сандар</p>
    </div>
  </Link>

  <Link to="/uibuloo" >
    <div className="topicCard">
      <img src={family}  />
      <p>үй бүлөө</p>
    </div>
  </Link>

   <Link to="/dene" >
    <div className="topicCard">
      <img src={dene}  />
      <p> Дене мүчөлөрү</p>
    </div>
  </Link>

   <Link to="/tuc" >
    <div className="topicCard">
      <img src={tus}  />
      <p>Түстөр</p>
    </div>
  </Link>

  <Link to="/kuz" >
    <div className="topicCard">
      <img src={kuz}  />
      <p>Күз</p>
    </div>
  </Link>

</div>

</div>

</div>

</div>

)

}

export default Home