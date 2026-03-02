// src/components/ContactForm.jsx
import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

export default function ContactForm() {
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    
    const form = e.target;
    const data = new FormData(form);

    try {
      // Replace with your Formspree endpoint or backend URL
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center p-10 text-center bg-green-50 rounded-3xl border border-green-100 h-full min-h-[400px]">
        <CheckCircle className="w-20 h-20 mb-6 text-green-500" />
        <h3 className="text-3xl font-extrabold text-gray-900">Message Sent!</h3>
        <p className="mt-3 text-lg text-gray-600">We've received your request and will be in touch shortly.</p>
        <button 
          onClick={() => setStatus('')}
          className="mt-8 font-bold text-brand-dark hover:text-brand-accent hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-8 bg-gray-50 shadow-xl rounded-3xl border border-gray-100">
      <div className="grid grid-cols-1 gap-6">
        
        <div>
          <label htmlFor="name" className="block mb-2 text-sm font-bold text-gray-700 uppercase tracking-wider">Name</label>
          <input 
            type="text" 
            name="name" 
            id="name" 
            required 
            className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-accent focus:border-brand-dark outline-none transition-shadow"
            placeholder="John Doe"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-bold text-gray-700 uppercase tracking-wider">Email</label>
          <input 
            type="email" 
            name="email" 
            id="email" 
            required 
            className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-accent focus:border-brand-dark outline-none transition-shadow"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block mb-2 text-sm font-bold text-gray-700 uppercase tracking-wider">Select Subject</label>
          <select 
            name="subject" 
            id="subject" 
            required
            className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-accent focus:border-brand-dark outline-none transition-shadow appearance-none"
          >
            <option value="" disabled selected>Select a service...</option>
            <option value="Kitchen Remodel">Kitchen Remodel</option>
            <option value="Bathroom Remodel">Bathroom Remodel</option>
            <option value="Gas Line Installation or Repair">Gas Line Installation or Repair</option>
            <option value="Routine Maintenance Request">Routine Maintenance Request</option>
            <option value="Commercial Plumbing Needs">Commercial Plumbing Needs</option>
            <option value="Residential Plumbing Needs">Residential Plumbing Needs</option>
          </select>
        </div>

        <div className="pt-4">
          <button 
            type="submit" 
            disabled={status === 'submitting'}
            className="flex items-center justify-center w-full px-8 py-5 text-lg font-extrabold text-brand-dark transition-all transform bg-brand-accent rounded-xl hover:bg-[#72db00] hover:-translate-y-1 disabled:opacity-70 disabled:transform-none shadow-lg shadow-brand-accent/30"
          >
            {status === 'submitting' ? 'Sending...' : (
              <>
                Send <Send className="w-6 h-6 ml-3" />
              </>
            )}
          </button>
          {status === 'error' && (
            <p className="mt-4 text-sm font-semibold text-center text-red-500">Oops! There was a problem submitting your form. Please try again.</p>
          )}
        </div>
      </div>
    </form>
  );
}