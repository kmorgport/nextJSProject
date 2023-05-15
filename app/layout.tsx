import '@styles/global.css'
import { ReactNode } from 'react';
import Nav from '@components/Nav'
import Provider from '@components/Provider'
export const metadata = {
    title: "PractProj",
    description: "Project to Show New Next.js"
}

interface RootLayoutProps {
    children: ReactNode;
  }

const RootLayout: React.FC<RootLayoutProps> = ({children}) => {

  return (
    <html lang="en">
      <Provider>
        <body>
            <div className="main">
                <div className="gradient"/>
            </div>
            <main className="app">
                <Nav/>
                {children}
            </main>
        </body>
        </Provider>
    </html>
  )
}

export default RootLayout