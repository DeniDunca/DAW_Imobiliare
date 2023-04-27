import './App.css';
import {Route, Routes} from "react-router-dom";
import {Home} from "./pages/home/Home";
import {News} from "./pages/news/News";
import {Header} from "./components/header/Header";
import {Navbar} from "./components/navbar/Navbar";
import {Footer} from "./components/footer/Footer";
import {Contact} from "./pages/contact/Contact";
import {Profile} from "./pages/profile/Profile";
import {Rent} from "./pages/rent/Rent";
import {Sale} from "./pages/sale/Sale";
import {Login} from "./pages/login/Login";
import {Signup} from "./pages/signup/Signup";
import {AgentRents} from "./pages/agent/AgentRents";
import {AgentSales} from "./pages/agent/AgentSales";

function App() {

    return (
        <div>
            <Header/>
            <Navbar/>
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route exact path="/news" element={<News/>}/>
                <Route exact path="/contact" element={<Contact/>}/>
                <Route exact path="/myProfile" element={<Profile/>}/>
                <Route exact path="/rent" element={<Rent/>}/>
                <Route exact path="/sale" element={<Sale/>}/>
                <Route exact path="/agentRent" element={<AgentRents/>}/>
                <Route exact path="/agentSale" element={<AgentSales/>}/>
                <Route exact path="/login" element={<Login/>}/>
                <Route exact path="/signup" element={<Signup/>}/>
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;
