import Link from "next/link";
import FadeSlideUp from "./animations/FadeSlideUp";
import AnimatedContainer from "./animations/AnimatedContainer";

export default function Hero() {
  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden p-8">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.1\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'4\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-indigo-400/20 rounded-full blur-xl animate-pulse delay-500"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeSlideUp delay={0.2}>
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-white mb-8">
              Discover Amazing
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Articles
              </span>
            </h1>
          </FadeSlideUp>

          <FadeSlideUp delay={0.4}>
            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Explore a world of knowledge with our curated collection of
              articles. From technology to lifestyle, find stories that inspire
              and inform.
            </p>
          </FadeSlideUp>

          <FadeSlideUp delay={0.6}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="/pages/articles"
                className="btn-primary group relative overflow-hidden"
              >
                <span className="relative z-10">Explore Articles</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              </Link>

              <Link href="/pages/about" className="btn-secondary group">
                Learn More
                <svg
                  className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </FadeSlideUp>

          {/* Stats Section */}
          <FadeSlideUp delay={0.8}>
            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="glass-card p-6 text-center">
                <div className="text-3xl font-bold text-white mb-2">1000+</div>
                <div className="text-blue-200">Articles Published</div>
              </div>
              <div className="glass-card p-6 text-center">
                <div className="text-3xl font-bold text-white mb-2">50K+</div>
                <div className="text-blue-200">Active Readers</div>
              </div>
              <div className="glass-card p-6 text-center">
                <div className="text-3xl font-bold text-white mb-2">100+</div>
                <div className="text-blue-200">Expert Writers</div>
              </div>
            </div>
          </FadeSlideUp>

          {/* Newsletter CTA */}
          <FadeSlideUp delay={1.0}>
            <div className="mt-20 max-w-xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Stay Updated!
              </h3>
              <p className="text-blue-100 mb-6">
                Subscribe to our newsletter for the latest articles and updates.
              </p>
              <form className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-3 rounded-lg focus:outline-none bg-white/20 text-white placeholder-white/70"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:brightness-110 transition"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </FadeSlideUp>
        </div>

        {/* Scroll Hint */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white text-sm opacity-70">
          Scroll Down to Explore
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>
    </>
  );
}
