import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout";
import Login from "./pages/Login/Login";
import { publicRoutes } from "./routes";
import PrivateOutlet from "./routes/PrivateOutlet";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            let Layout = DefaultLayout;
            if (route.layout) {
              Layout = route.layout;
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <PrivateOutlet>
                    <Layout>
                      <Page />
                    </Layout>
                  </PrivateOutlet>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
