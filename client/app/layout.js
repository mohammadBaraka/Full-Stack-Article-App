import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "./graphql/Provider";
import { Header } from "./components/Navbar/Navbar";
import Footer from "./components/Footer";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "./context/ThemeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Article App",
  description: "A modern article publishing platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Provider>
        <ThemeProvider>
          <body className={`${inter.className} bg-primary`}>
            <ToastContainer 
              position="top-center" 
              autoClose={1000} 
              theme="colored" 
              toastClassName="dark:!bg-articleGray-800 dark:!text-white"
            />
            <Header />
            <Suspense>{children}</Suspense>
            <Footer />
          </body>
        </ThemeProvider>
      </Provider>
    </html>
  );
}
