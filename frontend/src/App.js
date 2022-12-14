import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout";
import ScrollToTop from "./layout/ScrollToTop/ScrollToTop";
import { privateRoutes, publicRoutes } from "./routes";
import PrivateOutlet from "./routes/PrivateOutlet";

function App() {
  return (
    <div className="App">
      <Router>
        {/* <ScrollToTop> */}
        <Routes>
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
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
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
        {/* </ScrollToTop> */}
      </Router>
    </div>
  );
}

export default App;
