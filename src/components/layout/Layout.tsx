import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">{children}</main>
      <div className="floating-footer">
        <small>© {new Date().getFullYear()} Getflix</small>
      </div>
    </div>
  );
};

export default Layout;
