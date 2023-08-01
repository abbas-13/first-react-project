import { Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

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
  <GoogleOAuthProvider clientId="377003269114-raho8ts27hos04h6vgf5lm18kpvb679f.apps.googleusercontent.com">
    <Auth>
      <Routes>
        <Route path="/Login" exact element={<LoginPage />} />
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
          path="/ContactUs"
          element={
            <AppShell>
              <ContactUsPage />
            </AppShell>
          }
        />
        <Route
          path="/AboutUs"
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
  </GoogleOAuthProvider>
);
