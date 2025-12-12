import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "./styles.css";

import { store } from "./app/store";
import AuthInitializer from "./components/AuthInitializer/AuthInitializer";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";
import { publicNoLayoutRoutes, publicWithLayoutRoutes , protectedRoutes} from "./routes/routesConfig";

const App = () => {
  return (
    <Provider store={store}>
      <AuthInitializer>
        <BrowserRouter>
          <Routes>

            {/* --- Routes WITHOUT layout --- */}
            {publicNoLayoutRoutes.map((r) => (
              <Route key={r.path} path={r.path} element={r.element} />
            ))}

            {/* --- Routes WITH layout --- */}
            <Route path="/" element={<MainLayout />}>
              
              {/* Public with layout */}
              {publicWithLayoutRoutes.map((r) =>
                r.index ? (
                  <Route key="index" index element={r.element} />
                ) : (
                  <Route key={r.path} path={r.path} element={r.element} />
                )
              )}

              {/* Protected Routes */}
              {protectedRoutes.map((r) => (
                <Route
                  key={r.path}
                  path={r.path}
                  element={<ProtectedRoute>{r.element}</ProtectedRoute>}
                />
              ))}
            </Route>
          </Routes>
        </BrowserRouter>

        <ToastContainer position="top-center" autoClose={3000} theme="light" />
      </AuthInitializer>
    </Provider>
  );
};

export default App;
