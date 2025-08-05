import React, { useState } from "react";
import { motion } from "framer-motion";
import { ContactFormData, serviceOptions, referralOptions } from "../utils";
import { supabase } from "../utils/supabaseClient";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    service: "",
    occasion: "",
    pinterestInspo: "",
    add_ons: [],
    date: "",
    time: "",
    instagram: "",
    location: "",
    referralSource: "",
    questions: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour <= 20; hour++) {
      const period = hour < 12 ? "AM" : "PM";
      const displayHour = hour <= 12 ? hour : hour - 12;

      slots.push(`${displayHour}:00 ${period}`);
      slots.push(`${displayHour}:30 ${period}`);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      add_ons: checked ? [...prev.add_ons, value] : prev.add_ons.filter((item) => item !== value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError("");

    try {
      const { error: insertError } = await supabase
        .from("contact_submissions") // your Supabase table name
        .insert([formData]);

      if (insertError) {
        throw insertError;
      }

      setShowSuccess(true);

      // Reset form data
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        service: "",
        occasion: "",
        pinterestInspo: "",
        add_ons: [],
        date: "",
        time: "",
        instagram: "",
        location: "",
        referralSource: "",
        questions: "",
      });

      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Form submission error:", error);
      setError("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <motion.div className="max-w-3xl mx-auto p-6 bg-secondary text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h3 className="text-2xl font-serif mb-4">Thank you!</h3>
        <p>Your message has been sent successfully.</p>
      </motion.div>
    );
  }

  return (
    <motion.div className="max-w-3xl mx-auto p-6 bg-secondary" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      {error && <div className="mb-6 p-4 bg-red-50 text-red-800">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h3 className="text-primary mb-4">Name (required)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="sr-only">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="First Name"
                className="input-field"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="sr-only">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Last Name"
                className="input-field"
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-primary mb-2">
            Email (required)
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="example@example.com"
            className="input-field"
          />
        </div>

        <div>
          <label htmlFor="instagram" className="block text-primary mb-2">
            Your Instagram Handle
          </label>
          <input
            type="text"
            id="instagram"
            name="instagram"
            value={formData.instagram}
            onChange={handleChange}
            placeholder="@your_account"
            className="input-field"
          />
        </div>

        <div>
          <label htmlFor="service" className="block text-primary mb-2">
            Desired Session Type (required)
          </label>
          <select id="service" name="service" value={formData.service} onChange={handleChange} required className="input-field">
            <option value="" disabled>
              Select an option
            </option>
            {serviceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="occasion" className="block text-primary mb-2">
            Tell me about your vision (required)
          </label>
          <p className="text-sm text-accent-dark mb-2">Tell me a little bit about what you're wanting out of your session</p>
          <textarea id="occasion" name="occasion" value={formData.occasion} onChange={handleChange} required className="input-field h-32" />
        </div>

        <div>
          <label htmlFor="location" className="block text-primary mb-2">
            Your Desired Location
          </label>
          <p className="text-sm text-accent-dark mb-2">If you have a specific location in mind, let me know!</p>
          <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} className="input-field" />
        </div>

        <div>
          <label htmlFor="pinterestInspo" className="block text-primary mb-2">
            Pinterest Inspiration Board
          </label>
          <p className="text-sm text-accent-dark mb-2">Share your Pinterest board to help us understand your vision</p>
          <input
            type="url"
            id="pinterestInspo"
            name="pinterestInspo"
            value={formData.pinterestInspo}
            onChange={handleChange}
            placeholder="https://pinterest.com/..."
            className="input-field"
          />
        </div>

        <div>
          <h3 className="text-primary mb-4">Add On's</h3>
          <p className="text-sm text-accent-dark mb-2">Additional Pro and Base-Edits are added while picking the photos</p>
          <div className="space-y-2">
            <div className="flex items-start">
              <input
                type="checkbox"
                id="additionalTimeBefore"
                name="addOns"
                value="Additional Time (Before 8PM)"
                onChange={handleCheckboxChange}
                className="mt-1"
              />
              <label htmlFor="additionalTimeBefore" className="ml-2">
                Additional Time (Before 8PM) - $60/hour
              </label>
            </div>
            <div className="flex items-start">
              <input
                type="checkbox"
                id="additionalTimeAfter"
                name="addOns"
                value="Additional Time (After 8PM)"
                onChange={handleCheckboxChange}
                className="mt-1"
              />
              <label htmlFor="additionalTimeAfter" className="ml-2">
                Additional Time (After 8PM) - $80/hour
              </label>
            </div>
            <div className="flex items-start">
              <input type="checkbox" id="vhsCameraEdit" name="addOns" value="VHS Camera Edit" onChange={handleCheckboxChange} className="mt-1" />
              <label htmlFor="vhsCameraEdit" className="ml-2">
                VHS Camera Edit (15 seconds) + Clips - $50
              </label>
            </div>
            <div className="flex items-start">
              <input type="checkbox" id="creativeGraphicEdit" name="addOns" value="Creative Graphic Edit" onChange={handleCheckboxChange} className="mt-1" />
              <label htmlFor="creativeGraphicEdit" className="ml-2">
                Creative Graphic Edit - Prices vary
              </label>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="date" className="block text-primary mb-2">
            Desired Session Date/Time Frame
          </label>
          <p className="text-sm text-accent-dark mb-2">Leave blank if you don't have a time frame in mind, or try your best to ballpark!</p>
          <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} className="input-field" />
        </div>

        <div>
          <label htmlFor="time" className="block text-primary mb-2">
            Preferred Time
          </label>
          <select id="time" name="time" value={formData.time} onChange={handleChange} className="input-field">
            <option value="">Select a time</option>
            {timeSlots.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="referralSource" className="block text-primary mb-2">
            How did you hear about me?
          </label>
          <select id="referralSource" name="referralSource" value={formData.referralSource} onChange={handleChange} className="input-field">
            <option value="" disabled>
              Select option
            </option>
            {referralOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="questions" className="block text-primary mb-2">
            Questions/Comments/Concerns
          </label>
          <p className="text-sm text-accent-dark mb-2">Feel free to let me know any questions or accommodations you need addressed!</p>
          <textarea id="questions" name="questions" value={formData.questions} onChange={handleChange} className="input-field h-32" />
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="border border-primary px-8 py-3 text-primary hover:bg-primary hover:text-secondary transition-colors duration-300"
          >
            {isSubmitting ? "Sending..." : "Send"}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default ContactForm;
