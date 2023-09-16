import { Toaster } from "react-hot-toast";
import { Footer } from "./footer";
import { Navbar } from "./navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div>
        <Navbar />
        <main>{children}</main>
      </div>
      <Footer />
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
    </div>
  )
}