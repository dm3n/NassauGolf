import "@/styles/globals.css";
import "@/styles/button.css";
import "animate.css";
import Script from "next/script";
import { QueryClient, QueryClientProvider } from "react-query";
import { client } from "@/lib/client";
const Footer = dynamic(() => import("@/components/layout/Footer"));
import { BiUpArrow } from "react-icons/bi";
import { Toaster } from "react-hot-toast";
import dynamic from "next/dynamic";
const AuthContextProvider = dynamic(() => import("@/context/AuthContext"));
const Context = dynamic(() => import("@/context/cartContext"));
const CartView = dynamic(() => import("@/components/layout/Cart/CartView"));
const NextProgress = dynamic(() => import("next-progress"));
const ScrollToTop = dynamic(() => import("react-scroll-to-top"));
const ModalContainer = dynamic(() =>
  import("@/components/product-modal/ModalContainer")
);
const queryClient = new QueryClient();
export default function App({ Component, pageProps }) {

  return (
    <main data-theme="lofi">
      <QueryClientProvider client={queryClient}>
        <Script
          id="gtm-script"
          strategy="worker"
          dangerouslySetInnerHTML={{
            __html: `/* GTM script here */`,
          }}
        />
        <AuthContextProvider>
          <Context>
            <CartView />
            <Component {...pageProps} />
            <Footer />
            <NextProgress options={{ showSpinner: false }} height="6px" />
            <Toaster />
            <ScrollToTop
              smooth
              className=" flex items-center justify-center p-3"
              component={<BiUpArrow className="w-12 h-12" />}
            />
            <ModalContainer />
          </Context>
        </AuthContextProvider>
      </QueryClientProvider>
    </main>
  );
}
