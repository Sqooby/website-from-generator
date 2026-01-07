import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/young-wedding-couple-their-wedding.jpg"
            alt="Wedding couple"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-rose-30/95 via-stone-50/90 to-rose-50/95"></div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-72 h-72 bg-rose-200/20 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-20 left-10 w-96 h-96 bg-stone-200/30 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mb-8 inline-block">
              <span className="text-sm font-medium text-rose-600 tracking-[0.2em] uppercase">
                Wedding Websites Reimagined
              </span>
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-light mb-8 text-stone-900 leading-[1.1] tracking-tight animate-fade-in">
              Your Love Story,
              <br />
              <span className="font-semibold italic">Beautifully Told</span>
            </h1>

            <p
              className="text-xl md:text-2xl text-stone-600 mb-12 max-w-2xl mx-auto leading-relaxed font-light animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              Create a stunning wedding website that captures your unique
              journey. Elegant templates, effortless customization,
              unforgettable impressions.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up"
              style={{ animationDelay: "0.4s" }}
            >
              <Link href="/templates">
                <Button size="lg" className="min-w-[200px]">
                  Explore Templates
                </Button>
              </Link>
              <Link href="/pricing">
                <Button size="lg" variant="outline" className="min-w-[200px]">
                  View Pricing
                </Button>
              </Link>
            </div>

            <div
              className="mt-16 text-sm text-stone-500 animate-fade-in"
              style={{ animationDelay: "0.6s" }}
            >
              <span className="inline-flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-rose-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Trusted by 2,000+ couples worldwide
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 80C1200 80 1320 70 1380 65L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Image Gallery Showcase */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl group">
              <Image
                src="/images/closeup-shot-bride-holding-bouquet.jpg"
                alt="Bride holding bouquet"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl group lg:translate-y-12">
              <Image
                src="/images/bride-groom-having-their-wedding-beach.jpg"
                alt="Beach wedding"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl group">
              <Image
                src="/images/pexels-asadphoto-169190.jpg"
                alt="Wedding rings"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-6 text-stone-900">
              Three Steps to
              <span className="font-semibold italic block mt-2">
                Your Perfect Website
              </span>
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Creating your wedding website shouldn't be complicated. We've made
              it beautifully simple.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 lg:gap-16 max-w-6xl mx-auto">
            {[
              {
                number: "01",
                title: "Choose Your Template",
                description:
                  "Browse our curated collection of elegant, professionally designed templates. Each one crafted with love and attention to detail.",
              },
              {
                number: "02",
                title: "Personalize Everything",
                description:
                  "Add your photos, story, and wedding details. Customize colors, fonts, and sections to perfectly match your vision.",
              },
              {
                number: "03",
                title: "Share with Guests",
                description:
                  "Your website goes live instantly. Share your unique URL and let guests RSVP, view details, and celebrate with you.",
              },
            ].map((step, index) => (
              <div key={index} className="relative group">
                <div className="mb-6">
                  <span className="text-7xl font-serif font-light text-rose-200 group-hover:text-rose-300 transition-colors duration-300">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-2xl font-serif font-semibold mb-4 text-stone-900">
                  {step.title}
                </h3>
                <p className="text-stone-600 leading-relaxed">
                  {step.description}
                </p>
                <div className="absolute -bottom-4 left-0 w-16 h-0.5 bg-gradient-to-r from-rose-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features - Editorial Split Layout */}
      <section className="bg-white">
        {/* Feature 1: Templates & Customization */}
        <div className="grid lg:grid-cols-2 min-h-[80vh]">
          {/* Text Content - Left */}
          <div className="flex items-center py-20 px-6 lg:px-12 xl:px-20 bg-stone-50">
            <div className="max-w-xl">
              <div className="mb-6">
                <span className="text-xs font-medium text-rose-600 tracking-[0.3em] uppercase">Design Excellence</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light mb-6 text-stone-900 leading-[1.1]">
                Templates That
                <span className="font-semibold italic block mt-2">Tell Your Story</span>
              </h2>
              <p className="text-lg text-stone-600 mb-10 leading-relaxed">
                Choose from our curated collection of elegant designs. Every template is crafted with meticulous attention to detail and fully customizable to match your unique vision.
              </p>

              <ul className="space-y-3 mb-10">
                {[
                  'Professionally designed editorial layouts',
                  'Unlimited color & typography customization',
                  'Drag-and-drop section builder',
                  'Real-time preview of all changes',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-stone-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-500 flex-shrink-0"></div>
                    {item}
                  </li>
                ))}
              </ul>

              <Link href="/templates">
                <Button size="lg" variant="primary">
                  Explore All Templates
                </Button>
              </Link>
            </div>
          </div>

          {/* Image - Right */}
          <div className="relative min-h-[400px] lg:min-h-full overflow-hidden group">
            <Image
              src="/images/young-wedding-couple-their-wedding.jpg"
              alt="Beautiful wedding templates"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Feature 2: Guest Experience */}
        <div className="grid lg:grid-cols-2 min-h-[80vh]">
          {/* Image - Left */}
          <div className="relative min-h-[400px] lg:min-h-full overflow-hidden group order-2 lg:order-1">
            <Image
              src="/images/closeup-shot-bride-holding-bouquet.jpg"
              alt="Guest experience"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Text Content - Right */}
          <div className="flex items-center py-20 px-6 lg:px-12 xl:px-20 bg-rose-50/50 order-1 lg:order-2">
            <div className="max-w-xl lg:ml-auto">
              <div className="mb-6">
                <span className="text-xs font-medium text-rose-600 tracking-[0.3em] uppercase">Effortless Management</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light mb-6 text-stone-900 leading-[1.1]">
                Guest Experience,
                <span className="font-semibold italic block mt-2">Perfected</span>
              </h2>
              <p className="text-lg text-stone-600 mb-10 leading-relaxed">
                From RSVP tracking to photo galleries, give your guests an unforgettable digital experience that's as beautiful as your celebration.
              </p>

              <ul className="space-y-3 mb-10">
                {[
                  'Smart RSVP system with meal preferences',
                  'Interactive timeline & event schedule',
                  'Stunning photo galleries with unlimited uploads',
                  'Guest messaging & Q&A section',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-stone-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-500 flex-shrink-0"></div>
                    {item}
                  </li>
                ))}
              </ul>

              <Link href="/features">
                <Button size="lg" variant="primary">
                  See All Features
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Feature 3: Mobile & Custom Domain */}
        <div className="grid lg:grid-cols-2 min-h-[80vh]">
          {/* Text Content - Left */}
          <div className="flex items-center py-20 px-6 lg:px-12 xl:px-20 bg-stone-50">
            <div className="max-w-xl">
              <div className="mb-6">
                <span className="text-xs font-medium text-rose-600 tracking-[0.3em] uppercase">Professional Polish</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light mb-6 text-stone-900 leading-[1.1]">
                Beautiful on Every
                <span className="font-semibold italic block mt-2">Device & Domain</span>
              </h2>
              <p className="text-lg text-stone-600 mb-10 leading-relaxed">
                Your website looks pixel-perfect on phones, tablets, and desktops. Add your custom domain for that extra professional touch.
              </p>

              <ul className="space-y-3 mb-10">
                {[
                  'Responsive design optimized for all screens',
                  'Lightning-fast loading on mobile networks',
                  'Custom domain support (yournames.com)',
                  'Advanced analytics & guest insights',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-stone-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-500 flex-shrink-0"></div>
                    {item}
                  </li>
                ))}
              </ul>

              <Link href="/pricing">
                <Button size="lg" variant="primary">
                  View Pricing Plans
                </Button>
              </Link>
            </div>
          </div>

          {/* Image - Right */}
          <div className="relative min-h-[400px] lg:min-h-full overflow-hidden group">
            <Image
              src="/images/bride-groom-having-their-wedding-beach.jpg"
              alt="Mobile perfect experience"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Testimonial with Image */}
      <section className="py-32 bg-stone-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/images/notebook-3820634.jpg"
            alt="Wedding planning"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-stone-900/80"></div>

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <svg
                className="w-12 h-12 text-rose-400 mx-auto"
                fill="currentColor"
                viewBox="0 0 32 32"
              >
                <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.7 1.3-3 3-3V8zm16 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.7 1.3-3 3-3V8z" />
              </svg>
            </div>
            <blockquote className="text-2xl md:text-3xl font-serif font-light leading-relaxed mb-8 text-stone-100">
              "Évora made creating our wedding website an absolute joy. The
              templates are stunning, and customizing everything was so
              intuitive. Our guests can't stop complimenting it!"
            </blockquote>
            <div>
              <p className="font-medium text-lg text-white">Sarah & Michael</p>
              <p className="text-stone-400 text-sm mt-1">Married August 2024</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-br from-rose-500 via-rose-400 to-rose-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-serif font-light mb-6 leading-tight">
              Ready to Create Something
              <span className="font-semibold italic block mt-2">
                Unforgettable?
              </span>
            </h2>
            <p className="text-xl md:text-2xl mb-10 text-rose-50 font-light max-w-2xl mx-auto leading-relaxed">
              Join thousands of couples who've shared their love stories with
              Évora
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/templates">
                <Button
                  size="lg"
                  variant="secondary"
                  className="min-w-[200px] bg-white text-rose-600 hover:bg-stone-50"
                >
                  Get Started Free
                </Button>
              </Link>
              <Link href="/pricing">
                <Button
                  size="lg"
                  variant="outline"
                  className="min-w-[200px] border-2 border-white text-white hover:bg-white/10"
                >
                  See Pricing
                </Button>
              </Link>
            </div>
            <p className="mt-8 text-sm text-rose-100">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
