import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout";
import { privateRoutes, publicRoutes } from "./routes";
import PrivateOutlet from "./routes/PrivateOutlet";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {privateRoutes.map((route, index) => {
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
                    <Layout>
                      <Page />
                    </Layout>
                }
              />
            );
          })}
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
