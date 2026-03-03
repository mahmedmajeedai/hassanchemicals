import emailjs from '@emailjs/browser';

/**
 * Reusable helper to send emails via EmailJS
 * @param {Object} templateParams - Parameters for the EmailJS template
 * @returns {Promise} - Resolves to the result of the emailjs.send() call
 */
export const sendInquiry = async (templateParams) => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  // Debug logs (boolean only, no secrets)
  console.log('EmailJS Config Check:', {
    hasServiceId: !!serviceId,
    hasTemplateId: !!templateId,
    hasPublicKey: !!publicKey
  });

  if (!serviceId || !templateId || !publicKey) {
    throw new Error('EmailJS is not fully configured. Please check environment variables.');
  }

  // Common recipients or defaults can be handled here if needed
  const paramsWithDefaults = {
    ...templateParams,
    to_email: '03447733778bilal@gmail.com', // Fixed recipient as requested
  };

  return emailjs.send(serviceId, templateId, paramsWithDefaults, publicKey);
};

/**
 * Check if EmailJS is configured
 * @returns {boolean}
 */
export const isEmailConfigured = () => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  // Debug logs (boolean only, no secrets)
  console.log('EmailJS Is Configured Check:', {
    hasServiceId: !!serviceId,
    hasTemplateId: !!templateId,
    hasPublicKey: !!publicKey
  });

  return !!(serviceId && templateId && publicKey);
};
