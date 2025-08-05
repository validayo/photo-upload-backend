import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ServicesPage: React.FC = () => {
  const services = [
    {
      title: "Portrait Sessions",
      description: "Individual or group portrait sessions tailored to your vision. Perfect for professional headshots, family photos, or creative personal shoots.",
      price: "Starting at $120",
      image: "https://obhiuvlfopgtbgjuznok.supabase.co/storage/v1/object/public/images/portfolio/Events/2024_Nitro_option_02_3840x2400.jpg"
    },
    {
      title: "Event Photography",
      description: "Professional coverage for all your special events. Corporate gatherings, birthday parties, graduations, and more - we'll document every meaningful moment.",
      price: "Starting at $100",
      image: "https://obhiuvlfopgtbgjuznok.supabase.co/storage/v1/object/public/images/portfolio/Events/2024_Nitro_option_01_3840x2400.jpg"
    },
    {
      title: "Wedding Photography",
      description: "Capturing your special day with elegance and authenticity. From intimate ceremonies to grand celebrations, we'll create timeless memories of your wedding day.",
      price: "Starting at $1000",
      image: "https://obhiuvlfopgtbgjuznok.supabase.co/storage/v1/object/public/images/portfolio/Events/2024_Nitro_Default_3840x2400.jpg"
    },

  ];

  return (
    <div className="pt-32 pb-20">
      <div className="container-custom">
        <motion.h1 
          className="text-4xl md:text-5xl font-serif text-center mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Services
        </motion.h1>
        
        <motion.p 
          className="text-lg text-center text-accent-dark max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Crafting visual stories that capture the essence of your special moments
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
            >
              <div className="relative overflow-hidden mb-6">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-300 group-hover:bg-opacity-30" />
              </div>
              
              <h2 className="text-2xl font-serif mb-3">{service.title}</h2>
              <p className="text-accent-dark mb-4">{service.description}</p>
              <p className="font-serif text-lg">{service.price}</p>
              
              <Link 
                to="/contact" 
                className="inline-block mt-4 border-b-2 border-primary text-primary hover:border-accent-dark hover:text-accent-dark transition-colors duration-300"
              >
                Book Now
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h3 className="text-2xl font-serif mb-4">Custom Packages Available</h3>
          <p className="text-accent-dark mb-6">
            Need something specific? Let's create a custom package that perfectly fits your needs.
          </p>
          <Link 
            to="/contact"
            className="inline-block border border-primary px-8 py-3 text-primary hover:bg-primary hover:text-white transition-all duration-300"
          >
            Get in Touch
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ServicesPage;