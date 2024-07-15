import "~/styles/globals.css";
import type { AppType } from "next/app";
import type { Route } from "~/types";
import { GeistSans } from "geist/font/sans";
import { useRouter } from "next/router";
import { ThemeProvider } from "next-themes";
import { cn } from "~/lib/utils";
import Head from "next/head";
import routes from "~/cfg/routes";
import Header from "~/components/Header";
import ScrollProvider from "~/contexts/ScrollProvider";
import Footer from "~/components/Footer";

const MyApp: AppType = ({ Component, pageProps }) => {
  const router = useRouter();
  let currentRoute: Route | undefined;
  const newRoutes = routes.map((e) => { 
    const route = {
      ...e,
      current: e.href === router.pathname
    };
    if (route.current) {
      currentRoute = route;
    }
    return route;
  });

  const title = "Amy" + (currentRoute ? " - " + currentRoute.name : "");
  const image_src = `https://github.com/${process.env.GH_USERNAME}.png`;
  const description = "Software Development and Music Production";
  
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:type" content="website" />
          
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        <meta name="twitter:description" content={description} />

        <link rel="image_src" href={image_src} />
        <meta property="og:image" content={image_src} />
        <meta name="twitter:image" content={image_src} />

        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
      </Head>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <ScrollProvider>
          <div className={cn('flex min-h-screen flex-col', GeistSans.className)}>
            <header className="sticky top-0 z-50">
              <Header suppressHydrationWarning routes={newRoutes} className="auto-limit-w xl:rounded-b-lg transition-all scroll-y-[0]:shadow-none shadow-lg" />
            </header>
            <Component {...pageProps} />
            <footer>
              <Footer className="auto-limit-w" />
            </footer>
          </div>
        </ScrollProvider>
      </ThemeProvider>  
    </>
  );
};

export default MyApp;
