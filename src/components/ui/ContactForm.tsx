import React, { useState, useCallback } from 'react';
import { toast } from 'sonner';

type ContactFormData = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};

/**
 * ContactForm component
 * Displays a contact/inquiry form with validation
 */
const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = useCallback(() => {
    const errors: Record<string, string> = {};
    
    if (!formData.name?.trim()) {
      errors.name = 'Prosím zadejte své jméno';
    }
    
    if (!formData.email?.trim()) {
      errors.email = 'Prosím zadejte svůj e-mail';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Prosím zadejte platný e-mail';
    }
    
    if (!formData.message?.trim()) {
      errors.message = 'Prosím zadejte zprávu';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  }, [formErrors]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store form data in localStorage for demonstration
      localStorage.setItem('contactFormData', JSON.stringify(formData));
      
      toast.success('Vaše zpráva byla odeslána. Děkujeme!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Došlo k chybě. Zkuste to prosím znovu.');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm]);

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Jméno a příjmení *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-restaurant-400
            ${formErrors.name ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Jan Novák"
          required
        />
        {formErrors.name && (
          <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          E-mail *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-restaurant-400
            ${formErrors.email ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="jan.novak@example.com"
          required
        />
        {formErrors.email && (
          <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Telefon
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-restaurant-400"
          placeholder="+420 123 456 789"
        />
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Zpráva *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-restaurant-400
            ${formErrors.message ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Vaše zpráva..."
          required
        />
        {formErrors.message && (
          <p className="mt-1 text-sm text-red-600">{formErrors.message}</p>
        )}
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full px-6 py-3 text-white font-medium rounded-lg transition-colors
          ${isSubmitting 
            ? 'bg-restaurant-400 cursor-not-allowed' 
            : 'bg-restaurant-600 hover:bg-restaurant-700'}`}
      >
        {isSubmitting ? 'Odesílám...' : 'Odeslat zprávu'}
      </button>
      
      <p className="text-xs text-gray-500 mt-4">
        * Označená pole jsou povinná
      </p>
    </form>
  );
};

export default ContactForm;
