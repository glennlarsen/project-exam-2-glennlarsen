import "./sass/style.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Accommodation from "./pages/Accommodation";
import Login from "./pages/Login";
import Details from "pages/Details";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <Router>
      <div className="wrapper">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/accommodation" element={<Accommodation />} />
          {["/details/:id"].map((path, index) => {
            return ( <Route path={path} element={<Details />} key={index} />
              );
          })}
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem", color: "white" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
