import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    inquiryType: 'general',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Message sent",
      description: "We'll get back to you within 24-48 hours.",
    });

    setFormData({
      name: '',
      email: '',
      organization: '',
      inquiryType: 'general',
      message: '',
    });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Layout>
      <Helmet>
        <title>Contact TARK AI | AI Career Counseling Platform</title>
        <meta name="description" content="Contact TARK AI EdTech for AI career guidance, program inquiries, or partnership opportunities. Get expert AI career counseling and personalized support." />
        <meta name="keywords" content="AI Career Counseling Platform, Contact AI Career Guidance, AI EdTech Support, AI Training Inquiry, Career Counseling India" />
        <link rel="canonical" href="https://tarkaiedtech.com/contact" />
      </Helmet>
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 md:px-12 lg:px-20">
        <div className="container-wide mx-auto">
          <p className="text-sm uppercase tracking-[0.2em] text-accent mb-4">Contact</p>
          <h1 className="max-w-2xl">Get in Touch</h1>
          <div className="divider-accent mt-8" />
        </div>
      </section>

      {/* Form Section */}
      <section className="px-6 md:px-12 lg:px-20 pb-20">
        <div className="container-wide mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Left - Info */}
            <div className="lg:col-span-4">
              <div className="mb-12">
                <p className="text-xs uppercase tracking-widest text-foreground/40 mb-4">Email</p>
                <p className="text-lg">contact@tarkai.edu</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-foreground/40 mb-4">Company</p>
                <p className="text-lg">TarkAI EdTech Pvt. Ltd.</p>
              </div>
            </div>

            {/* Right - Form */}
            <div className="lg:col-span-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="name" className="block text-xs uppercase tracking-widest text-foreground/40 mb-3">
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-foreground"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs uppercase tracking-widest text-foreground/40 mb-3">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-foreground"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="organization" className="block text-xs uppercase tracking-widest text-foreground/40 mb-3">
                      Organization
                    </label>
                    <Input
                      id="organization"
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      className="border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-foreground"
                      placeholder="Company or institution"
                    />
                  </div>
                  <div>
                    <label htmlFor="inquiryType" className="block text-xs uppercase tracking-widest text-foreground/40 mb-3">
                      Inquiry Type
                    </label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      className="w-full h-10 border-0 border-b border-border bg-transparent px-0 text-sm focus:outline-none focus:border-foreground"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="programs">Program Information</option>
                      <option value="institutional">Institutional Partnership</option>
                      <option value="career">AI Career Guidance</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs uppercase tracking-widest text-foreground/40 mb-3">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-foreground resize-none"
                    placeholder="Tell us how we can help..."
                    rows={4}
                  />
                </div>

                <Button type="submit" variant="hero" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
