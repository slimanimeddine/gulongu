import { type AppType } from "next/app";
import "@/styles/globals.css";
import Layout from "@/components/layout";
import { ThemeProvider } from "next-themes"
import { Inter } from 'next/font/google'
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

const inter = Inter({ subsets: ['latin'] })

const MyApp: AppType = ({ Component, pageProps }) => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  )
};

export default MyApp
