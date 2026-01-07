import Link from 'next/link'
import { Button } from '@/components/ui/button'

const plans = [
  {
    name: 'Essential',
    price: 99,
    period: 'year',
    description: 'Perfect for intimate celebrations',
    features: [
      { text: 'Choose from 3 curated templates', included: true },
      { text: 'Essential customization options', included: true },
      { text: 'Event details & countdown timer', included: true },
      { text: 'Mobile-responsive design', included: true },
      { text: 'Personalized subdomain', included: true },
      { text: 'Email support', included: true },
      { text: 'RSVP system', included: false },
      { text: 'Photo gallery', included: false },
    ],
    cta: 'Start Free Trial',
    highlighted: false,
    badge: null,
  },
  {
    name: 'Complete',
    price: 149,
    period: 'year',
    description: 'Our most popular choice',
    features: [
      { text: 'All premium templates', included: true },
      { text: 'Full design customization', included: true },
      { text: 'RSVP system (up to 150 guests)', included: true },
      { text: 'Photo gallery (50 photos)', included: true },
      { text: 'Interactive timeline', included: true },
      { text: 'Thank you page', included: true },
      { text: 'Email notifications', included: true },
      { text: 'Priority support', included: true },
    ],
    cta: 'Start Free Trial',
    highlighted: true,
    badge: 'Most Popular',
  },
  {
    name: 'Luxe',
    price: 249,
    period: 'year',
    description: 'The ultimate wedding website',
    features: [
      { text: 'Everything in Complete', included: true },
      { text: 'Custom domain support', included: true },
      { text: 'Unlimited RSVP guests', included: true },
      { text: 'Unlimited photo uploads', included: true },
      { text: 'Advanced analytics', included: true },
      { text: 'Remove Évora branding', included: true },
      { text: 'White-glove support', included: true },
      { text: 'Early access to new features', included: true },
    ],
    cta: 'Start Free Trial',
    highlighted: false,
    badge: 'Premium',
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-b from-rose-50/50 to-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <span className="text-sm font-medium text-rose-600 tracking-[0.2em] uppercase">Transparent Pricing</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-light mb-6 text-stone-900 leading-tight">
              One Price,
              <span className="font-semibold italic block mt-2">Unlimited Possibilities</span>
            </h1>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
              Simple, transparent pricing with no hidden fees. Choose the plan that fits your celebration.
            </p>
          </div>
        </div>
      </section>

      {/* Billing Toggle */}
      <div className="py-8 bg-white">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-4 p-1 bg-stone-100 rounded-full">
            <button className="px-6 py-2 rounded-full bg-white shadow-sm text-sm font-medium text-stone-900">
              Annual
              <span className="ml-2 text-xs text-rose-600 font-semibold">Save 20%</span>
            </button>
            <button className="px-6 py-2 rounded-full text-sm font-medium text-stone-600 hover:text-stone-900">
              Monthly
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={plan.name}
                className={`relative rounded-3xl p-8 transition-all duration-300 ${
                  plan.highlighted
                    ? 'bg-gradient-to-br from-rose-500 to-rose-600 text-white shadow-2xl scale-105 md:scale-110 z-10'
                    : 'bg-white border-2 border-stone-200 hover:border-rose-200 shadow-sm hover:shadow-xl'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className={`inline-block px-4 py-1 rounded-full text-xs font-semibold ${
                      plan.highlighted
                        ? 'bg-white text-rose-600'
                        : 'bg-rose-100 text-rose-700'
                    }`}>
                      {plan.badge}
                    </span>
                  </div>
                )}

                {/* Header */}
                <div className="text-center mb-8 pt-4">
                  <h3 className={`text-2xl font-serif font-semibold mb-2 ${
                    plan.highlighted ? 'text-white' : 'text-stone-900'
                  }`}>
                    {plan.name}
                  </h3>
                  <p className={`text-sm mb-6 ${
                    plan.highlighted ? 'text-rose-100' : 'text-stone-600'
                  }`}>
                    {plan.description}
                  </p>

                  <div className="mb-6">
                    <span className={`text-5xl font-serif font-bold ${
                      plan.highlighted ? 'text-white' : 'text-stone-900'
                    }`}>
                      ${plan.price}
                    </span>
                    <span className={`text-lg ${
                      plan.highlighted ? 'text-rose-100' : 'text-stone-600'
                    }`}>
                      /{plan.period}
                    </span>
                  </div>

                  <Link href="/register">
                    <Button
                      size="lg"
                      variant={plan.highlighted ? 'secondary' : 'primary'}
                      className={`w-full ${
                        plan.highlighted
                          ? 'bg-white text-rose-600 hover:bg-stone-50'
                          : ''
                      }`}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </div>

                {/* Features */}
                <ul className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                        feature.included
                          ? plan.highlighted
                            ? 'bg-white/20'
                            : 'bg-rose-100'
                          : plan.highlighted
                            ? 'bg-white/10'
                            : 'bg-stone-100'
                      }`}>
                        {feature.included ? (
                          <svg className={`w-3 h-3 ${plan.highlighted ? 'text-white' : 'text-rose-600'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className={`w-3 h-3 ${plan.highlighted ? 'text-white/40' : 'text-stone-400'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <span className={`text-sm ${
                        feature.included
                          ? plan.highlighted
                            ? 'text-white'
                            : 'text-stone-700'
                          : plan.highlighted
                            ? 'text-white/50'
                            : 'text-stone-400'
                      }`}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Note */}
          <div className="mt-16 text-center">
            <p className="text-stone-600 mb-2">All plans include:</p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-stone-500">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-rose-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                14-day free trial
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-rose-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                No credit card required
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-rose-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Cancel anytime
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-rose-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Money-back guarantee
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-stone-50">
        <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-light mb-4 text-stone-900">
              Questions?
              <span className="font-semibold italic block mt-2">We Have Answers</span>
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                q: 'Can I change my plan later?',
                a: 'Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect immediately.'
              },
              {
                q: 'What happens after my subscription expires?',
                a: 'Your website will remain published for 7 days after expiration, giving you time to renew. After that, it will be unpublished but your data is safely stored.'
              },
              {
                q: 'Can I use my own domain name?',
                a: 'Yes! The Complete and Luxe plans include custom domain support. We\'ll guide you through the setup process.'
              },
              {
                q: 'Do you offer refunds?',
                a: 'We offer a 14-day money-back guarantee. If you\'re not completely satisfied, contact us for a full refund.'
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
                <h3 className="font-serif font-semibold text-lg text-stone-900 mb-2">
                  {faq.q}
                </h3>
                <p className="text-stone-600 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-stone-600 mb-4">Still have questions?</p>
            <Link href="/contact">
              <Button variant="outline">Contact Our Team</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
