import "./sass/style.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Accommodation from "./pages/Accommodation";
import Login from "./pages/Login";
import Details from "pages/Details";
import AddEstablishment from "pages/admin/AddEstablishment";
import Establishments from "pages/admin/Establishments";
import Messages from "pages/admin/Messages";
import Enquiries from "pages/admin/Enquiries";
import ScrollToTop from "components/layout/ScrollToTop";
import { BASE_URL, ESTABLISHMENTS, POPULATE_ALL } from "constants/apiKeys";
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
                  element={
                    <Accommodation
                      establishments={establishments}
                      loading={loading}
                      error={error}
                    />
                  }
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
            <Route
              path="/establishments"
              element={
                <Establishments
                  establishments={establishments}
                  loading={loading}
                  error={error}
                />
              }
            />
            <Route path="/addestablishment" element={<AddEstablishment />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/enquiries" element={<Enquiries />} />
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
