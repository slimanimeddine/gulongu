import { Footer } from "./footer";
import { Navbar } from "./navbar";
import { useRouter } from 'next/router'

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const asPath = router.asPath
  const routes = ["/login", "/signUp"]

  return (
    <>
      <Navbar />
      <main>{children}</main>
      {!routes.includes(asPath) && <Footer />}
    </>
  )
}