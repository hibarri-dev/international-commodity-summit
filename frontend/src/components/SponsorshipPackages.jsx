import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Award, 
  Mail, 
  FileText, 
  Sparkles, 
  X,
  Send
} from 'lucide-react';
import { sponsorshipPackages, sponsorshipContactInfo } from '../data/sponsorshipData';

export default function SponsorshipPackages() {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [enquirySent, setEnquirySent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });

  const handleOpenEnquiry = (pkg) => {
    setSelectedPackage(pkg);
    setEnquirySent(false);
  };

  React.useEffect(() => {
    if (!selectedPackage) return undefined;
    const onKey = (e) => e.key === 'Escape' && setSelectedPackage(null);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [selectedPackage]);

  const handleSubmitEnquiry = (e) => {
    e.preventDefault();
    setEnquirySent(true);
    setTimeout(() => {
      alert(`Thank you for your interest in the ${selectedPackage.tier} package. Our partnerships director will contact you within 24 business hours.`);
      setSelectedPackage(null);
      setEnquirySent(false);
    }, 1200);
  };

  return (
    <section id="sponsorship" className="relative z-10 py-16 sm:py-24 bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-[#005EFF] border border-blue-200 text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5 text-[#F40260]" />
            Partnership & Exhibition Opportunities
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-slate-900 tracking-tight mb-4">
            Sponsorship Packages
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Position your organization at the apex of global physical commodities. Command stage presence, showcase innovative operations, and engage 3,500+ decision makers at the Meadowlands Exhibition Center.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {sponsorshipPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative rounded-3xl p-7 flex flex-col justify-between transition-all ${
                pkg.isPopular
                  ? 'bg-gradient-to-b from-blue-50/50 to-white border-2 border-[#005EFF] shadow-xl shadow-[#005EFF]/10'
                  : 'bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:border-slate-300'
              }`}
            >
              {pkg.isPopular && (
                <span className="absolute -top-3.5 right-6 bg-gradient-to-r from-[#005EFF] to-[#F40260] text-white text-[10px] font-heading font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm">
                  {pkg.badge}
                </span>
              )}

              <div>
                {!pkg.isPopular && (
                  <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#005EFF] mb-2 bg-blue-50 px-2.5 py-0.5 rounded-md">
                    {pkg.badge}
                  </span>
                )}

                <h3 className="font-heading font-black text-2xl text-slate-900 mb-1">
                  {pkg.tier}
                </h3>
                <div className="text-xs text-slate-500 font-semibold mb-4">
                  {pkg.billingDetail}
                </div>

                <div className="mb-5 pb-5 border-b border-slate-100">
                  <div className="font-heading font-black text-4xl text-slate-900 tracking-tight">
                    {pkg.price}
                  </div>
                  <span className="text-xs text-slate-400 font-medium">USD • Corporate Summit Package</span>
                </div>

                <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                  {pkg.description}
                </p>

                {/* Perks Checklist */}
                <div className="space-y-2.5 mb-8">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                    Included Benefits:
                  </div>
                  {pkg.perks.map((perk, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-snug">
                      <CheckCircle2 className="w-4 h-4 text-[#005EFF] shrink-0 mt-0.5" />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleOpenEnquiry(pkg)}
                className={`w-full py-3.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                  pkg.isPopular
                    ? 'bg-gradient-to-r from-[#005EFF] to-[#F40260] text-white shadow-md hover:opacity-95'
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
              >
                {pkg.ctaText}
              </button>
            </div>
          ))}
        </div>

        {/* Custom Tailoring & Direct Contact Bar */}
        <div className="bg-gradient-to-r from-blue-50 via-slate-50 to-pink-50 rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#F40260] uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" /> Custom Bespoke Activations
            </div>
            <h4 className="font-heading font-black text-2xl text-slate-900 mb-2">
              Need a Custom Pavilion, Bilateral Suite, or Tailored Sponsorship?
            </h4>
            <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
              We design custom branded solutions including sovereign country pavilions, private bilateral lounges, Wi-Fi sponsorships, and delegate gift activations.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href={`mailto:${sponsorshipContactInfo.email}?subject=International Commodity Summit Sponsorship Enquiry`}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-heading font-bold text-xs text-white bg-gradient-to-r from-[#005EFF] to-[#F40260] shadow-sm hover:shadow-md transition-all"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Partnerships Desk</span>
            </a>
            <a
              href="#about"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-heading font-bold text-xs text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-colors"
            >
              <FileText className="w-4 h-4 text-slate-500" />
              <span>Download Prospectus</span>
            </a>
          </div>
        </div>

        {/* Modal Enquiry Dialog */}
        {selectedPackage && (
          <div 
            className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overscroll-contain"
            onClick={() => setSelectedPackage(null)}
          >
            <div
              className="bg-white rounded-2xl sm:rounded-3xl max-w-lg w-full p-5 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[92dvh] overflow-y-auto overscroll-contain my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPackage(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-xs font-bold uppercase tracking-wider text-[#005EFF] mb-1">
                Sponsorship Package Enquiry
              </div>
              <h3 className="font-heading font-black text-2xl text-slate-900 mb-1">
                {selectedPackage.tier}
              </h3>
              <div className="font-heading font-black text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#005EFF] to-[#F40260] mb-4">
                {selectedPackage.price}
              </div>

              {enquirySent ? (
                <div className="py-8 text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-heading font-black text-lg text-slate-900 mb-1">
                    Enquiry Received
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto">
                    Thank you! Our partnerships director has received your request and will follow up within 24 business hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitEnquiry} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Contact Name</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Eleanor Vance"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-base sm:text-sm focus:outline-none focus:border-[#005EFF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Corporate Email</label>
                  <input
                    required
                    type="email"
                    placeholder="e.g. partnerships@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-base sm:text-sm focus:outline-none focus:border-[#005EFF]"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Company</label>
                    <input
                      required
                      type="text"
                      placeholder="Company name"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-base sm:text-sm focus:outline-none focus:border-[#005EFF]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+1 (xxx) xxx-xxxx"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-base sm:text-sm focus:outline-none focus:border-[#005EFF]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Specific Requirements or Booth Preference</label>
                  <textarea
                    rows="3"
                    placeholder="Tell us about your brand goals, preferred hall location, or delegation requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-base sm:text-sm focus:outline-none focus:border-[#005EFF]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-3.5 rounded-xl font-heading font-black text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#005EFF] to-[#F40260] shadow-md hover:opacity-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Sponsorship Request</span>
                </button>
              </form>
            )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
