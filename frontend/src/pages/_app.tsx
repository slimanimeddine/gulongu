import { type AppType } from "next/app";
import "@/styles/globals.css";
import Layout from "@/components/layout";
import { ThemeProvider } from "next-themes"
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
      <ThemeProvider attribute="class">
        <Layout>
          <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
  )
};

export default MyApp
