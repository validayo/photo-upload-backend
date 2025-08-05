import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Mail } from 'lucide-react';

const About: React.FC = () => {
  return (
    <motion.div 
      className="container-custom py-20 mt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-3xl mx-auto">
        <motion.h2 
          className="text-3xl md:text-4xl font-serif mb-8 tracking-wide"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          About Shoot For Arts
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="mb-4 text-lg leading-relaxed">
              Shoot For Arts was founded on the belief that photography is more than just capturing moments—it's about creating art that tells stories and evokes emotions.
            </p>
            <p className="mb-4 text-lg leading-relaxed">
              Our approach combines technical precision with artistic vision, allowing us to create images that are both timeless and contemporary.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className="mb-4 text-lg leading-relaxed">
              We specialize in portrait, events, and wedding photography, with a distinctive style that emphasizes clean compositions, dramatic lighting, and authentic emotion.
            </p>
            <p className="text-lg leading-relaxed">
              Each photoshoot is carefully planned and executed to reflect the unique personality and vision of our clients, whether for personal portraits, commercial projects, or special events.
            </p>
          </motion.div>
        </div>
        
        <motion.h3 
          className="text-2xl font-serif mb-6 tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Our Process
        </motion.h3>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="border border-accent p-6">
            <h4 className="font-serif text-xl mb-3">Consultation</h4>
            <p className="text-accent-dark">
              We begin with an in-depth conversation about your vision, preferences, and goals for the photoshoot.
            </p>
          </div>
          
          <div className="border border-accent p-6">
            <h4 className="font-serif text-xl mb-3">Creation</h4>
            <p className="text-accent-dark">
              During the shoot, we work collaboratively to capture authentic moments and creative compositions.
            </p>
          </div>
          
          <div className="border border-accent p-6">
            <h4 className="font-serif text-xl mb-3">Curation</h4>
            <p className="text-accent-dark">
              After the shoot, we carefully select and edit the best images to deliver a cohesive collection.
            </p>
          </div>
        </motion.div>
        
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <h3 className="text-2xl font-serif mb-6 tracking-wide">Connect</h3>
          <p className="text-lg mb-4">
            We're always open to discussing new projects and collaborations. Reach out to start a conversation.
          </p>
          <div className="flex items-center space-x-6">
            <a 
              href="https://instagram.com/shootforarts" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-primary hover:text-accent-dark transition-colors duration-300"
            >
              <Instagram size={18} className="mr-2" />
              @shootforarts
            </a>
            <a 
              href="mailto:contact@shootforarts.com" 
              className="flex items-center text-primary hover:text-accent-dark transition-colors duration-300"
            >
              <Mail size={18} className="mr-2" />
              contact@shootforarts.com
            </a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;