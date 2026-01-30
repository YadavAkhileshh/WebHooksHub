import React from 'react'
import { ArrowRight, Zap, Shield, BarChart3, Globe, Terminal, CheckCircle2,Clock,Copy,Activity } from 'lucide-react'

const Home = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/90 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-12">
              <span className="text-xl font-bold text-gray-900 tracking-tight cursor-crosshair">WebhookHub</span>
              <div className="hidden md:flex items-center space-x-8">
                <a
                  href="#why"
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors relative group"
                >
                  Why
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300"></span>
                </a>
                <a
                  href="#how"
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors relative group"
                >
                  How
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300"></span>
                </a>
              </div>
            </div>
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-6 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition-all hover:shadow-lg hover:scale-105"
            >
              Try it free
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700 mb-8 shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              Production ready platform
            </div>

            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Test webhooks the way<br />
              they were meant to be
            </h1>

            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              A simple, reliable platform to capture, inspect, and debug webhooks in real-time. Built for developers who value simplicity.
            </p>

            <button
              onClick={() => onNavigate('dashboard')}
              className="inline-flex items-center px-8 py-3 bg-gray-900 text-white font-medium rounded hover:bg-gray-800 transition-all"
            >
              Start testing now
            </button>

            {/* Demo Preview */}
            <div className="mt-16">
              <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden max-w-4xl mx-auto">
                {/* Browser Chrome */}
                <div className="bg-gray-100 px-4 py-3 border-b border-gray-200 flex items-center">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 text-center">
                    <div className="inline-block bg-white px-4 py-1 rounded text-sm text-gray-600">
                      webhookshub.tool
                    </div>
                  </div>
                </div>

                {/* Dashboard Preview */}
                <div className="p-6 bg-gray-50">
                  <div className="grid grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-3">
                      <div className="bg-white rounded-lg border border-gray-200 p-3 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full" />
                            <span className="text-sm font-medium text-gray-700">stripe-webhooks</span>
                          </div>
                          <span className="text-xs text-gray-500">2m ago</span>
                        </div>
                        <div className="bg-gray-50 rounded px-2 py-1 font-mono text-xs text-gray-600">
                          POST /webhook/abc123
                        </div>
                      </div>

                      <div className="bg-white rounded-lg border border-gray-200 p-3 opacity-60 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full" />
                            <span className="text-sm font-medium text-gray-700">github-events</span>
                          </div>
                          <span className="text-xs text-gray-500">5m ago</span>
                        </div>
                        <div className="bg-gray-50 rounded px-2 py-1 font-mono text-xs text-gray-600">
                          POST /webhook/xyz789
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Terminal */}
                    <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm shadow-lg">
                      <div className="text-green-400">$ curl -X POST \</div>
                      <div className="text-blue-400 ml-2">https://webhooks-hub.vercel.com/abc123 \</div>
                      <div className="text-gray-300 ml-2">-H "Content-Type: application/json" \</div>
                      <div className="text-yellow-400 ml-2">-d '{"{"}"event": "Payment Done"{"}"}'</div>
                      <div className="text-green-300 mt-3">200 OK</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section id="why" className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700 mb-6 shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              Production ready platform
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Why WebhookHub?</h2>
            <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
              The essential tools you need, without the complexity you don't
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              <div className="relative bg-white border border-gray-200 rounded-2xl p-8 hover:border-gray-300 transition-all duration-300 hover:shadow-lg">
                <div className="w-14 h-14 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-shadow">
                  <Zap className="w-7 h-7 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 tracking-tight">Instant setup</h3>
                <p className="text-gray-600 leading-relaxed">
                  Create webhook endpoints in seconds. Copy the URL and start receiving data immediately. No configuration needed.
                </p>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center text-sm text-gray-500">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-green-600" />
                    <span>One-click generation</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              <div className="relative bg-white border border-gray-200 rounded-2xl p-8 hover:border-gray-300 transition-all duration-300 hover:shadow-lg">
                <div className="w-14 h-14 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-shadow">
                  <Terminal className="w-7 h-7 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 tracking-tight">Developer friendly</h3>
                <p className="text-gray-600 leading-relaxed">
                  See full request details including headers, body, and metadata. Everything you need to debug and test.
                </p>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center text-sm text-gray-500">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-green-600" />
                    <span>Complete request data</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              <div className="relative bg-white border border-gray-200 rounded-2xl p-8 hover:border-gray-300 transition-all duration-300 hover:shadow-lg">
                <div className="w-14 h-14 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-shadow">
                  <Shield className="w-7 h-7 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 tracking-tight">Production grade</h3>
                <p className="text-gray-600 leading-relaxed">
                  Built on reliable infrastructure with monitoring and analytics. Ready for your production workloads.
                </p>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center text-sm text-gray-500">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-green-600" />
                    <span>Enterprise ready</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">How it works</h2>
            <p className="text-lg text-gray-600 font-light">Simple, straightforward, and fast</p>
          </div>

          {/* Connection Line */}
          <div className="relative">
            <div className="hidden md:block absolute top-[60px] left-[16.66%] right-[16.66%] h-0.5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>

            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Step 1 */}
              <div className="group text-center">
                <div className="relative inline-block mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl flex items-center justify-center mx-auto shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
                    <Globe className="w-10 h-10 text-white" strokeWidth={2} />
                  </div>
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center text-base font-bold text-gray-900 shadow-lg border-2 border-gray-100 ring-4 ring-white">
                    1
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 tracking-tight">Create endpoint</h3>
                <p className="text-gray-600 leading-relaxed max-w-xs mx-auto">
                  Generate a unique webhook URL in one click. Give it a name and you're ready to go.
                </p>
                <div className="mt-6 inline-flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>~5 seconds</span>
                </div>
              </div>

              {/* Step 2 */}
              <div className="group text-center">
                <div className="relative inline-block mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl flex items-center justify-center mx-auto shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
                    <Terminal className="w-10 h-10 text-white" strokeWidth={2} />
                  </div>
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center text-base font-bold text-gray-900 shadow-lg border-2 border-gray-100 ring-4 ring-white">
                    2
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 tracking-tight">Configure service</h3>
                <p className="text-gray-600 leading-relaxed max-w-xs mx-auto">
                  Copy your webhook URL to any service like Stripe, GitHub, or Shopify. Start receiving webhooks.
                </p>
                <div className="mt-6 inline-flex items-center text-sm text-gray-500">
                  <Copy className="w-4 h-4 mr-2" />
                  <span>One-click copy</span>
                </div>
              </div>

              {/* Step 3 */}
              <div className="group text-center">
                <div className="relative inline-block mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl flex items-center justify-center mx-auto shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
                    <BarChart3 className="w-10 h-10 text-white" strokeWidth={2} />
                  </div>
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center text-base font-bold text-gray-900 shadow-lg border-2 border-gray-100 ring-4 ring-white">
                    3
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 tracking-tight">Inspect & debug</h3>
                <p className="text-gray-600 leading-relaxed max-w-xs mx-auto">
                  View every webhook in real-time with full details. Test, debug, and verify your integration.
                </p>
                <div className="mt-6 inline-flex items-center text-sm text-gray-500">
                  <Activity className="w-4 h-4 mr-2" />
                  <span>Real-time updates</span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all hover:shadow-lg cursor-pointer group">
              <span className="font-semibold">Get started for free</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-1">99.9%</div>
              <div className="text-sm text-gray-600">Uptime</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-1">&lt;50ms</div>
              <div className="text-sm text-gray-600">Response time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-1">1M+</div>
              <div className="text-sm text-gray-600">Webhooks processed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-1">5K+</div>
              <div className="text-sm text-gray-600">Developers</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Start testing webhooks today
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            No credit card required. Start for free in seconds.
          </p>
          <button
            onClick={() => onNavigate('dashboard')}
            className="inline-flex items-center px-8 py-3 bg-gray-900 text-white font-medium rounded hover:bg-gray-800"
          >
            Try it free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-gray-400">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-white font-bold">WebhookHub</span>
            </div>
            <div className="flex space-x-8 text-sm">
              <a href="#" className="hover:text-white">GitHub</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
            <p>Built with enterprise-grade infrastructure • Kubernetes • Prometheus • ELK Stack</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home