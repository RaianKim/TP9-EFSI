import Header from "./components/Header";
import Footer from "./components/Footer";
import TokenProvider from "./context/TokenContext";
import { ProtectedRoutes } from "./utils/ProtectedRoutes";

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body style={{ margin: 0 }}>
        <Header />
        <TokenProvider>
          <ProtectedRoutes>
            <main>{children}</main>
          </ProtectedRoutes>
        </TokenProvider>
        <Footer />
      </body>
    </html>
  );
}
