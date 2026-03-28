import { MapPin, Award, Users, Heart } from 'lucide-react';
import { companyInfo } from '../services/api';
import { Card } from '../components/ui/card';

const AboutPage = () => {
  const values = [
    {
      icon: Award,
      title: 'Qualité Excellence',
      description: 'Nous sélectionnons uniquement les meilleurs matériaux et offrons un savoir-faire artisanal inégalé.'
    },
    {
      icon: Users,
      title: 'Service Client',
      description: 'Notre équipe est toujours à votre écoute pour vous conseiller et répondre à vos besoins.'
    },
    {
      icon: Heart,
      title: 'Passion du Design',
      description: 'Chaque pièce est sélectionnée avec soin pour apporter élégance et confort à votre foyer.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#FFF8F0]">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">À Propos de Nous</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Découvrez l'histoire et les valeurs de Furniture Design Business
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <img 
              src="https://customer-assets.emergentagent.com/job_db14b7bd-ed3f-4182-bc59-0985af6ad221/artifacts/fkf7zzsl_1764530562322.jpg" 
              alt="Furniture Design Business" 
              className="w-48 h-auto mx-auto mb-8 rounded-2xl shadow-xl"
            />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Notre <span className="text-[#8B4513]">Histoire</span>
            </h2>
          </div>
          <Card className="p-8 bg-white shadow-lg">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {companyInfo.about}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Avec des années d'expérience dans le domaine du mobilier et de la décoration, nous avons bâti notre réputation sur la qualité, l'innovation et la satisfaction client. Chaque meuble que nous proposons est soigneusement sélectionné pour garantir durabilité, esthétique et confort.
            </p>
          </Card>
        </div>
      </section>

      {/* CEO Section */}
      <section className="bg-gradient-to-br from-[#FFF8F0] to-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <img
                  src="https://customer-assets.emergentagent.com/job_furnituredesignrdc/artifacts/u9pfqoa8_Profile%20CEO.jpg"
                  alt={companyInfo.ceo.name}
                  className="w-full rounded-2xl shadow-2xl"
                />
              </div>
              <div>
                <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] rounded-full mb-4">
                  <span className="text-sm font-semibold text-gray-900">{companyInfo.ceo.title}</span>
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">{companyInfo.ceo.name}</h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {companyInfo.ceo.bio}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nos <span className="text-[#8B4513]">Valeurs</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] mx-auto rounded-full"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <Card key={index} className="p-8 text-center card-hover">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#FFD700] flex items-center justify-center">
                  <Icon className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nos <span className="text-[#8B4513]">Services</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {companyInfo.services.map((service, index) => (
              <Card key={index} className="p-6 border-l-4 border-[#D4AF37] card-hover">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">{service}</h3>
                <p className="text-sm text-gray-600">Excellence et professionnalisme garantis</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 bg-gradient-to-br from-[#FFF8F0] to-white">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8B4513] to-[#A0522D] flex items-center justify-center flex-shrink-0">
                <MapPin className="text-white" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Notre Localisation</h3>
                <a
                  href={companyInfo.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-[#8B4513] hover:text-[#A0522D] leading-relaxed hover:underline cursor-pointer inline-block"
                >
                  📍 {companyInfo.address}
                  <span className="block text-sm text-gray-600 mt-2">Cliquez pour ouvrir dans Google Maps</span>
                </a>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;