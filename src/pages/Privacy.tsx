import Layout from '@/components/layout/Layout';

const Privacy = () => {
  return (
    <Layout>
      <section className="pt-32 pb-20 px-6 md:px-12 lg:px-20">
        <div className="container-wide mx-auto">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.2em] text-accent mb-4">Legal</p>
            <h1 className="mb-8">Privacy Policy</h1>
            <div className="divider-accent mb-12" />
            
            <div className="space-y-12 text-foreground/80">
              <p className="text-lg leading-relaxed">
                At TarkAI EdTech Pvt. Ltd., we are committed to protecting your privacy and ensuring the security of your personal information.
              </p>

              <div>
                <h2 className="text-2xl mb-4">Information We Collect</h2>
                <p className="leading-relaxed">
                  We collect information you provide directly, including your name, email address, educational background, and career interests when you create an account or use our AI Career Guider.
                </p>
              </div>

              <div>
                <h2 className="text-2xl mb-4">How We Use Your Information</h2>
                <p className="leading-relaxed">
                  Your information is used to provide personalized career guidance, improve our AI algorithms, and enhance your learning experience. We do not sell your personal data to third parties.
                </p>
              </div>

              <div>
                <h2 className="text-2xl mb-4">Data Security</h2>
                <p className="leading-relaxed">
                  We implement industry-standard security measures to protect your data. All AI processing is conducted with your privacy in mind, and recommendations are generated based on aggregated, anonymized patterns.
                </p>
              </div>

              <div>
                <h2 className="text-2xl mb-4">Your Rights</h2>
                <p className="leading-relaxed">
                  You have the right to access, correct, or delete your personal information at any time. Contact us at privacy@tarkai.edu for any privacy-related inquiries.
                </p>
              </div>

              <p className="text-sm text-foreground/50 pt-8 border-t border-border">
                Last updated: January 2026
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Privacy;
