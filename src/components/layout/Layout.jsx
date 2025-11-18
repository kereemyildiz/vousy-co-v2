import Header from './Header'
import Footer from './Footer'
import MockModeBanner from '../common/MockModeBanner'

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <MockModeBanner />
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  )
}
