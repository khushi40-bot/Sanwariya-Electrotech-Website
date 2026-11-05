import { useState } from 'react';
import { supabase } from '../lib/supabase.js';
import { submitToGoogleSheets, isGoogleSheetsConfigured } from '../lib/sheets.js';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

const initial = {
  full_name: '',
  email: '',
  phone: '',
  company: '',
  service: '',
  budget: '',
  message: ''
};

export default function ContactForm() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);

  const update = e => setForm({ ...form, [e.target.name]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setStatus('');
    setBusy(true);

    try {
      const hasSheets = isGoogleSheetsConfigured;
      const hasSupabase = Boolean(supabase);

      if (!hasSheets && !hasSupabase) {
        throw new Error(
          'Form destination is not configured yet. Add your Google Sheets Web App URL (VITE_GOOGLE_SHEETS_URL) or Supabase credentials in the .env file, then restart the website.'
        );
      }

      const tasks = [];

      if (hasSheets) {
        tasks.push(
          submitToGoogleSheets({
            full_name: form.full_name,
            email: form.email,
            phone: form.phone,
            company: form.company || '',
            service: form.service,
            budget: form.budget || '',
            message: form.message
          })
        );
      }

      if (hasSupabase) {
        tasks.push(
          supabase.from('inquiries').insert([
            {
              full_name: form.full_name,
              email: form.email,
              phone: form.phone,
              company: form.company || null,
              service: form.service,
              budget: form.budget || null,
              message: form.message
            }
          ]).then(({ error }) => {
            if (error) throw error;
          })
        );
      }

      await Promise.all(tasks);

      setForm(initial);
      setStatus('success');
    } catch (err) {
      setStatus(err.message || 'Something went wrong. Please try again or contact us directly.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="form-grid">
        <label>
          Full name
          <input
            name="full_name"
            value={form.full_name}
            onChange={update}
            placeholder="Your name"
            required
            minLength="2"
          />
        </label>
        <label>
          Email address
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={update}
            placeholder="you@company.com"
            required
          />
        </label>
        <label>
          Phone number
          <input
            name="phone"
            type="tel"
            value={form.phone}
            onChange={update}
            placeholder="+91 00000 00000"
            pattern="[+0-9() -]{8,18}"
            required
          />
        </label>
        <label>
          Company name <span className="optional">(optional)</span>
          <input
            name="company"
            value={form.company}
            onChange={update}
            placeholder="Your company"
          />
        </label>
        <label>
          Service required
          <select name="service" value={form.service} onChange={update} required>
            <option value="">Choose a service</option>
            {[
              'Website Development',
              'Mobile App Development',
              'Custom Software & App Development',
              'UI/UX & Graphic Design',
              'Social Media Management',
              'Digital Transformation',
              'Other'
            ].map(x => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>
        <label>
          Project budget <span className="optional">(optional)</span>
          <select name="budget" value={form.budget} onChange={update}>
            <option value="">Select budget</option>
            <option>Under ₹25,000</option>
            <option>₹25,000 – ₹50,000</option>
            <option>₹50,000 – ₹1,00,000</option>
            <option>₹1,00,000+</option>
            <option>To be discussed</option>
          </select>
        </label>
        <label className="full-field">
          Tell us about your project
          <textarea
            name="message"
            value={form.message}
            onChange={update}
            placeholder="A few details about your idea..."
            rows="4"
            required
            minLength="10"
          />
        </label>
      </div>
      <button className="button button-primary submit-btn" disabled={busy}>
        {busy ? 'Sending...' : 'Send Your Inquiry'} <Send size={17} />
      </button>
      {status === 'success' && (
        <p className="form-success">
          <CheckCircle2 size={18} /> Thank you! Your inquiry has been received.
        </p>
      )}
      {status && status !== 'success' && (
        <p className="form-error">
          <AlertCircle size={18} />
          {status}
        </p>
      )}
      <p className="form-note">Your details are used only to respond to your inquiry.</p>
    </form>
  );
}
