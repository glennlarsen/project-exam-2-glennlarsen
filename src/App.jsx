import "./sass/style.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Accommodation from "./pages/Accommodation";
import Login from "./pages/Login";
import Details from "pages/Details";
import ScrollToTop from "components/layout/ScrollToTop";

function App() {
  return (
    <Router>
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/accommodation" element={<Accommodation />} />
          {["/accommodation", "/accommodation/:type"].map((path, index) => {
            return (
              <Route path={path} element={<Accommodation />} key={index} />
            );
          })}
          {[
            "/details/:id",
            "/accommodation/details/:id",
            "/accommodation/hotel/details/:id",
            "/accommodation/b&b/details/:id",
            "/accommodation/guesthouse/details/:id",
          ].map((path, index) => {
            return <Route path={path} element={<Details />} key={index} />;
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
      </ScrollToTop>
    </Router>
  );
}

export default App;
