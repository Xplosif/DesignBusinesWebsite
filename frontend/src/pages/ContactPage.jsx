import { useState } from 'react';
import { MapPin, Phone, Mail, MessageCircle, Send } from 'lucide-react';
import { companyInfo, contactService } from '../services/api';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await contactService.submit(formData);
      toast.success('Message envoyé avec succès ! Nous vous contacterons bientôt.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      toast.error(error.detail || 'Erreur lors de l\'envoi du message. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${companyInfo.phone.replace(/\s+/g, '')}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#FFF8F0]">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Contactez-Nous</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Nous sommes là pour répondre à toutes vos questions et vous aider avec vos projets
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="p-6 text-center card-hover border-t-4 border-[#D4AF37]">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#8B4513] to-[#A0522D] flex items-center justify-center">
              <Phone className="text-white" size={28} />
            </div>
            <h3 className="font-bold text-xl text-gray-900 mb-2">Téléphone</h3>
            <a href={`tel:${companyInfo.phone}`} className="text-[#8B4513] hover:underline text-lg">
              {companyInfo.phone}
            </a>
          </Card>

          <Card className="p-6 text-center card-hover border-t-4 border-[#D4AF37]">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#8B4513] to-[#A0522D] flex items-center justify-center">
              <Mail className="text-white" size={28} />
            </div>
            <h3 className="font-bold text-xl text-gray-900 mb-2">Email</h3>
            <a href={`mailto:${companyInfo.email}`} className="text-[#8B4513] hover:underline">
              {companyInfo.email}
            </a>
          </Card>

          <Card className="p-6 text-center card-hover border-t-4 border-[#25D366]">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#25D366] flex items-center justify-center">
              <MessageCircle className="text-white" size={28} />
            </div>
            <h3 className="font-bold text-xl text-gray-900 mb-2">WhatsApp</h3>
            <button
              onClick={handleWhatsAppClick}
              className="text-[#25D366] hover:underline font-medium"
            >
              Discuter maintenant
            </button>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Envoyez-nous un <span className="text-[#8B4513]">Message</span>
            </h2>
            <Card className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nom complet *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Votre nom"
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="votre@email.com"
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+243 ..."
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Sujet *
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Sujet de votre message"
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Votre message..."
                    rows={6}
                    className="w-full"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#8B4513] to-[#A0522D] hover:from-[#A0522D] hover:to-[#8B4513] text-white py-6 text-lg font-semibold"
                >
                  <Send className="mr-2" size={20} />
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                </Button>
              </form>
            </Card>
          </div>

          {/* Map and Address */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Notre <span className="text-[#8B4513]">Localisation</span>
            </h2>
            <Card className="p-8 mb-6">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#FFD700] flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-white" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">Adresse</h3>
                  <a
                    href={companyInfo.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#8B4513] hover:text-[#A0522D] hover:underline cursor-pointer leading-relaxed"
                  >
                    📍 {companyInfo.address}
                  </a>
                  <p className="text-sm text-gray-600 mt-2">Cliquez pour ouvrir dans Google Maps</p>
                </div>
              </div>
            </Card>

            {/* Google Maps Button */}
            <a
              href={companyInfo.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Card className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
                <div className="aspect-video w-full bg-gradient-to-br from-[#8B4513] to-[#A0522D] flex items-center justify-center">
                  <div className="text-center text-white">
                    <MapPin size={64} className="mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Voir sur Google Maps</h3>
                    <p className="text-white/90">Cliquez pour obtenir l'itinéraire</p>
                  </div>
                </div>
              </Card>
            </a>

            {/* Opening Hours */}
            <Card className="p-6 mt-6 bg-gradient-to-br from-[#FFF8F0] to-white">
              <h3 className="font-bold text-lg text-gray-900 mb-4">Heures d'ouverture</h3>
              <div className="space-y-2 text-gray-700">
                <div className="flex justify-between">
                  <span>Lundi - Vendredi:</span>
                  <span className="font-semibold">8h00 - 18h00</span>
                </div>
                <div className="flex justify-between">
                  <span>Samedi:</span>
                  <span className="font-semibold">9h00 - 17h00</span>
                </div>
                <div className="flex justify-between">
                  <span>Dimanche:</span>
                  <span className="font-semibold">Fermé</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;