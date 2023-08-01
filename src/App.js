import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ContactUsPage from "./pages/ContactUsPage";
import AboutUsPage from "./pages/AboutUsPage";
import { AppShell } from "./components/AppShell";
import { UsersPage } from "./pages/UsersPage";
import { PostsPage } from "./pages/PostsPage";
import { ProductsPage } from "./pages/ProductsPage";
import { LoginPage } from "./pages/LoginPage";
import { Auth } from "./components/Auth";

export const App = () => (
  <Auth>
    <Routes>
      <Route path="/" exact element={<LoginPage />} />
      <Route
        path="/Homepage"
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
      <Route
        path="/Posts"
        element={
          <AppShell>
            <PostsPage className="justify" />
          </AppShell>
        }
      />
      <Route
        path="/Products"
        element={
          <AppShell>
            <ProductsPage className="justify" />
          </AppShell>
        }
      />
    </Routes>
  </Auth>
);
