import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { companyInfo } from '../services/api';

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  const navLinks = [
    { path: '/', label: 'Accueil' },
    { path: '/catalogue/all', label: 'Catalogue' },
    { path: '/a-propos', label: 'À Propos' },
    { path: '/contact', label: 'Contact' }
  ];

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${companyInfo.phone.replace(/\s+/g, '')}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="https://customer-assets.emergentagent.com/job_db14b7bd-ed3f-4182-bc59-0985af6ad221/artifacts/fkf7zzsl_1764530562322.jpg" 
                alt="Furniture Design Business Logo" 
                className="h-16 w-auto object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-base font-medium transition-colors relative group ${
                    location.pathname === link.path
                      ? 'text-[#8B4513]'
                      : 'text-gray-700 hover:text-[#8B4513]'
                  }`}
                >
                  {link.label}
                  <span className={`absolute bottom-[-8px] left-0 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] transition-all ${
                    location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-[#8B4513] transition-colors"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <nav className="container mx-auto px-4 py-4 flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-base font-medium py-2 px-4 rounded-lg transition-colors ${
                    location.pathname === link.path
                      ? 'bg-[#8B4513] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* WhatsApp Floating Button */}
      <button
        onClick={handleWhatsAppClick}
        className="whatsapp-float"
        aria-label="Contactez-nous sur WhatsApp"
      >
        <MessageCircle size={32} color="white" />
      </button>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-[#2a1810] to-[#1a0f0a] text-white mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Company Info */}
            <div>
              <img 
                src="https://customer-assets.emergentagent.com/job_db14b7bd-ed3f-4182-bc59-0985af6ad221/artifacts/fkf7zzsl_1764530562322.jpg" 
                alt="Furniture Design Business Logo" 
                className="h-20 mb-4 bg-white p-2 rounded-lg"
              />
              <p className="text-gray-300 text-sm leading-relaxed">
                {companyInfo.slogan}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#FFD700]">Liens Rapides</h3>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-[#FFD700] transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#FFD700]">Contact</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <MapPin size={18} className="text-[#FFD700] mt-1 flex-shrink-0" />
                  <a 
                    href={companyInfo.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-[#FFD700] transition-colors text-sm cursor-pointer"
                  >
                    {companyInfo.address}
                  </a>
                </li>
                <li className="flex items-center space-x-3">
                  <Phone size={18} className="text-[#FFD700] flex-shrink-0" />
                  <a href={`tel:${companyInfo.phone}`} className="text-gray-300 hover:text-[#FFD700] transition-colors text-sm">
                    {companyInfo.phone}
                  </a>
                </li>
                <li className="flex items-center space-x-3">
                  <Mail size={18} className="text-[#FFD700] flex-shrink-0" />
                  <a href={`mailto:${companyInfo.email}`} className="text-gray-300 hover:text-[#FFD700] transition-colors text-sm">
                    {companyInfo.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Furniture Design Business. Tous droits réservés. | Fondé par {companyInfo.ceo.name}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;