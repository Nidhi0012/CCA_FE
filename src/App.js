import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ConferenceProvider } from "./component/ConferenceContext"; 
import AddConference from "./component/AddConference";
import EditConference from "./component/EditConference";
import Conferences from "./component/Conferences";
import { Navbar } from "./component/Navbar";
import Sidebar from "./component/Sidebar";
import AboutPage from "./component/AboutPage";
import HomePage from "./component/HomePage";
import PastConferences from "./component/PastConferences";

function App() {
  return (
    <ConferenceProvider>
      <Navbar />
      <div className="Page">
        <div className="App">
          <Sidebar/>
        </div>
        <Routes>
          <Route path="/conferences" element={<Conferences />} />
          <Route path="/addConference" element={<AddConference />} />
          <Route path="/pastConferences" element={<PastConferences />} />
          <Route path="/editConference/:id" element={<EditConference />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </div>
    </ConferenceProvider>
  );
}

export default App;

