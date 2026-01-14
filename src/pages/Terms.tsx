import Layout from '@/components/layout/Layout';

const Terms = () => {
  return (
    <Layout>
      <section className="pt-32 pb-20 px-6 md:px-12 lg:px-20">
        <div className="container-wide mx-auto">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.2em] text-accent mb-4">Legal</p>
            <h1 className="mb-8">Terms & Conditions</h1>
            <div className="divider-accent mb-12" />
            
            <div className="space-y-12 text-foreground/80">
              <p className="text-lg leading-relaxed">
                Welcome to TarkAI. By accessing our platform, you agree to these terms and conditions.
              </p>

              <div>
                <h2 className="text-2xl mb-4">Use of Services</h2>
                <p className="leading-relaxed">
                  Our AI Career Guider and educational programs are designed to provide guidance and support. While we strive for accuracy, AI recommendations should be considered as one of many factors in your decision-making process.
                </p>
              </div>

              <div>
                <h2 className="text-2xl mb-4">Account Responsibilities</h2>
                <p className="leading-relaxed">
                  You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. Please notify us immediately of any unauthorized access.
                </p>
              </div>

              <div>
                <h2 className="text-2xl mb-4">Intellectual Property</h2>
                <p className="leading-relaxed">
                  All content, materials, and AI technology on our platform are the property of TarkAI EdTech Pvt. Ltd. and are protected by intellectual property laws.
                </p>
              </div>

              <div>
                <h2 className="text-2xl mb-4">Disclaimer</h2>
                <p className="leading-relaxed">
                  AI recommendations are guidance-based and should be used as decision support, not absolute advice. TarkAI is not responsible for career decisions made based solely on our recommendations.
                </p>
              </div>

              <div>
                <h2 className="text-2xl mb-4">Contact</h2>
                <p className="leading-relaxed">
                  For questions about these terms, please contact us at legal@tarkai.edu.
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

export default Terms;
