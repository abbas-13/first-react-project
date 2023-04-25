import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ContactUsPage from "./pages/ContactUsPage";
import AboutUsPage from "./pages/AboutUsPage";
import { AppShell } from "./components/AppShell";
import { UsersPage } from "./pages/UsersPage";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          exact
          element={
            <AppShell>
              <HomePage className="justify" />
            </AppShell>
          }
        />
        <Route
          path="ContactUs"
          element={
            <AppShell>
              <ContactUsPage />
            </AppShell>
          }
        />
        <Route
          path="AboutUs"
          element={
            <AppShell>
              <AboutUsPage />
            </AppShell>
          }
        />
        <Route
          path="/Users"
          element={
            <AppShell>
              <UsersPage className="justify" />
            </AppShell>
          }
        />
      </Routes>
    </>
  );
}

export default App;
