import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export const PrivacyPolicyDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <a className="text-muted-foreground hover:text-accent transition-colors text-sm cursor-pointer">
          Privacy Policy
        </a>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-4">Privacy Policy</DialogTitle>
          <DialogDescription className="text-base text-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-6 space-y-6">
          <section>
            <h3 className="text-lg font-semibold mb-2">1. Introduction</h3>
            <p className="text-muted-foreground">
              Welcome to The Unsung Editor ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
            </p>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold mb-2">2. Data We Collect</h3>
            <p className="text-muted-foreground mb-2">
              We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Identity Data: includes first name, last name, username or similar identifier.</li>
              <li>Contact Data: includes email address and telephone numbers.</li>
              <li>Technical Data: includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
              <li>Usage Data: includes information about how you use our website, products, and services.</li>
            </ul>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold mb-2">3. How We Use Your Data</h3>
            <p className="text-muted-foreground mb-2">
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>To provide and maintain our services.</li>
              <li>To notify you about changes to our services.</li>
              <li>To provide customer support.</li>
              <li>To gather analysis or valuable information so that we can improve our services.</li>
              <li>To monitor the usage of our services.</li>
              <li>To detect, prevent and address technical issues.</li>
            </ul>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold mb-2">4. Legal Basis for Processing Personal Data Under Indian Law</h3>
            <p className="text-muted-foreground">
              Our collection and processing of your personal information is in accordance with the Information Technology Act, 2000 and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011. We process your personal data only with your consent or when we have a legitimate interest to do so, such as for the purposes mentioned above.
            </p>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold mb-2">5. International Data Transfers</h3>
            <p className="text-muted-foreground">
              Your information, including personal data, may be transferred to and maintained on computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ from those of your jurisdiction. If you are located outside India and choose to provide information to us, please note that we transfer the data, including personal data, to India and process it there. Your consent to this privacy policy followed by your submission of such information represents your agreement to that transfer.
            </p>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold mb-2">6. Your Data Protection Rights</h3>
            <p className="text-muted-foreground mb-2">
              Under certain circumstances, you have rights under data protection laws in relation to your personal data:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>The right to access your personal data.</li>
              <li>The right to correction of your personal data.</li>
              <li>The right to erasure of your personal data.</li>
              <li>The right to restrict processing of your personal data.</li>
              <li>The right to object to processing of your personal data.</li>
              <li>The right to data portability.</li>
            </ul>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold mb-2">7. Contact Us</h3>
            <p className="text-muted-foreground">
              If you have any questions about this privacy policy or our privacy practices, please contact us at: <a href="mailto:privacy@theunsung.editor.com" className="text-accent hover:underline">privacy@theunsung.editor.com</a>
            </p>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const TermsAndConditionsDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <a className="text-muted-foreground hover:text-accent transition-colors text-sm cursor-pointer">
          Terms & Conditions
        </a>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-4">Terms and Conditions</DialogTitle>
          <DialogDescription className="text-base text-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-6 space-y-6">
          <section>
            <h3 className="text-lg font-semibold mb-2">1. Introduction</h3>
            <p className="text-muted-foreground">
              These terms and conditions ("Terms") govern your use of The Unsung Editor website and services ("Service"). By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the Service.
            </p>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold mb-2">2. Use of Our Service</h3>
            <p className="text-muted-foreground mb-2">
              You agree to use our Service only for purposes that are permitted by:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>These Terms;</li>
              <li>Applicable laws and regulations; and</li>
              <li>Generally accepted practices and guidelines.</li>
            </ul>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold mb-2">3. Intellectual Property</h3>
            <p className="text-muted-foreground">
              The Service and its original content, features, and functionality are and will remain the exclusive property of The Unsung Editor and its licensors. The Service is protected by copyright, trademark, and other laws of both India and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of The Unsung Editor.
            </p>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold mb-2">4. User Content</h3>
            <p className="text-muted-foreground">
              Our Service may allow you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material. You are responsible for the content that you post to the Service, including its legality, reliability, and appropriateness. By posting content to the Service, you grant us the right to use, modify, publicly perform, publicly display, reproduce, and distribute such content on and through the Service.
            </p>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold mb-2">5. Governing Law</h3>
            <p className="text-muted-foreground">
              These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
            </p>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold mb-2">6. Limitation of Liability</h3>
            <p className="text-muted-foreground">
              In no event shall The Unsung Editor, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
            </p>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold mb-2">7. Changes to Terms</h3>
            <p className="text-muted-foreground">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
            </p>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold mb-2">8. Contact Us</h3>
            <p className="text-muted-foreground">
              If you have any questions about these Terms, please contact us at: <a href="mailto:legal@theunsung.editor.com" className="text-accent hover:underline">legal@theunsung.editor.com</a>
            </p>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const LegalInfoDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <a className="text-muted-foreground hover:text-accent transition-colors text-sm cursor-pointer">
          Legal Information
        </a>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-4">Legal Information</DialogTitle>
          <DialogDescription className="text-base text-foreground">
            Legal information as per Indian and International laws
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-6 space-y-6">
          <section>
            <h3 className="text-lg font-semibold mb-2">1. Company Information</h3>
            <p className="text-muted-foreground">
              The Unsung Editor is a registered business operating under the laws of India. Our registered office is located at [Your Address], and our GST registration number is [Your GST Number].
            </p>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold mb-2">2. Copyright Notice</h3>
            <p className="text-muted-foreground">
              All content on this website, including but not limited to text, graphics, logos, images, audio clips, digital downloads, and data compilations, is the property of The Unsung Editor or its content suppliers and is protected by Indian and international copyright laws. The compilation of all content on this site is the exclusive property of The Unsung Editor and is protected by Indian and international copyright laws.
            </p>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold mb-2">3. Compliance with Indian Laws</h3>
            <p className="text-muted-foreground mb-2">
              The Unsung Editor complies with the following Indian laws and regulations:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Information Technology Act, 2000</li>
              <li>Consumer Protection Act, 2019</li>
              <li>Indian Contract Act, 1872</li>
              <li>Goods and Services Tax (GST) laws</li>
              <li>Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011</li>
            </ul>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold mb-2">4. International Compliance</h3>
            <p className="text-muted-foreground mb-2">
              For international clients and users, we also adhere to relevant international regulations including but not limited to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>General Data Protection Regulation (GDPR) for users from the European Union</li>
              <li>California Consumer Privacy Act (CCPA) for users from California, USA</li>
              <li>Personal Information Protection and Electronic Documents Act (PIPEDA) for users from Canada</li>
            </ul>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold mb-2">5. Dispute Resolution</h3>
            <p className="text-muted-foreground">
              Any disputes arising out of or related to your use of our services shall be resolved through arbitration in accordance with the Arbitration and Conciliation Act, 1996 of India. The place of arbitration shall be [Your City], India. The language of arbitration shall be English.
            </p>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold mb-2">6. Tax Information</h3>
            <p className="text-muted-foreground">
              As per Indian tax laws, we collect and remit Goods and Services Tax (GST) on applicable services provided to clients within India. International clients may be subject to their local tax regulations, and we recommend consulting with a tax professional in your jurisdiction regarding any tax implications of our services.
            </p>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold mb-2">7. Contact Information</h3>
            <p className="text-muted-foreground">
              For any legal inquiries or concerns, please contact our legal department at: <a href="mailto:legal@theunsung.editor.com" className="text-accent hover:underline">legal@theunsung.editor.com</a>
            </p>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};