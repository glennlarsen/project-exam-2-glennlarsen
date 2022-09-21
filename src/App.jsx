import "./sass/style.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Accommodation from "./pages/Accommodation";
import Login from "./pages/Login";
import Details from "pages/Details";
import Admin from "pages/Admin";
import ScrollToTop from "components/layout/ScrollToTop";
import { BASE_URL, ESTABLISHMENTS, POPULATE_ALL } from "utils/api";
import useApi from "utils/useApi";
import { AuthProvider } from "utils/AuthContext";

function App() {
  const url = BASE_URL + ESTABLISHMENTS + POPULATE_ALL;
  const { establishments, loading, error } = useApi(url);

  return (
    <AuthProvider>
      <Router>
        <ScrollToTop>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  establishments={establishments}
                  loading={loading}
                  error={error}
                />
              }
            />
            <Route
              path="/accommodation"
              element={
                <Accommodation
                  establishments={establishments}
                  loading={loading}
                  error={error}
                />
              }
            />
            {["/accommodation", "/accommodation/:type"].map((path, index) => {
              return (
                <Route
                  path={path}
                  element={<Accommodation establishments={establishments} />}
                  loading={loading}
                  error={error}
                  key={index}
                />
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
            <Route path="/admin" element={<Admin />} />
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
    </AuthProvider>
  );
}

export default App;
