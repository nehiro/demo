import { ReactNode } from 'react';
import { useAuth } from '../context/auth';
import Footer from './footer';
import Header from './header';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
