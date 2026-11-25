import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, FolderTree, LogOut, Menu, X } from 'lucide-react';
import { toast } from 'sonner';
import { authService } from '../services/api';

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    authService.logout();
    toast.success('Déconnexion réussie');
    navigate('/admin/login');
  };

  const navLinks = [
    { path: '/admin/dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
    { path: '/admin/produits', label: 'Produits', icon: Package },
    { path: '/admin/categories', label: 'Catégories', icon: FolderTree }
  ];

  const NavMenu = ({ onNavigate }) => (
    <nav className="p-4">
      <ul className="space-y-2">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;
          return (
            <li key={link.path}>
              <Link
                to={link.path}
                onClick={onNavigate}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-[#8B4513] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{link.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 gap-2">
            <div className="flex items-center space-x-3 min-w-0">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="md:hidden p-2 -ml-2 text-gray-700 hover:text-[#8B4513] transition-colors"
                aria-label="Ouvrir le menu"
              >
                <Menu size={24} />
              </button>
              <img
                src="https://customer-assets.emergentagent.com/job_db14b7bd-ed3f-4182-bc59-0985af6ad221/artifacts/fkf7zzsl_1764530562322.jpg"
                alt="Logo"
                className="h-8 md:h-10 w-auto flex-shrink-0"
              />
              <span className="text-lg md:text-xl font-bold text-[#8B4513] truncate">Administration</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-3 md:px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
            >
              <LogOut size={20} />
              <span className="hidden sm:inline">Déconnexion</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar (desktop) */}
        <aside className="hidden md:block w-64 bg-white min-h-[calc(100vh-64px)] border-r border-gray-200 flex-shrink-0 sticky top-16 self-start">
          <NavMenu />
        </aside>

        {/* Sidebar (mobile drawer) */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsSidebarOpen(false)}
            />
            <aside className="absolute inset-y-0 left-0 w-64 bg-white shadow-xl overflow-y-auto">
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <span className="font-bold text-[#8B4513]">Menu</span>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 text-gray-500 hover:text-gray-800"
                  aria-label="Fermer le menu"
                >
                  <X size={20} />
                </button>
              </div>
              <NavMenu />
            </aside>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 min-w-0 p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
