import React from 'react'
import { ArrowRight, Globe, Shield, Zap, BarChart3, Code, CheckCircle } from 'lucide-react'

const Home = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center mr-3">
                <Globe className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-semibold text-slate-900">WebhookHub</span>
            </div>
            <button
              onClick={() => onNavigate('dashboard')}
              className="inline-flex items-center px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-md hover:bg-slate-800 transition-colors"
            >
              Open Dashboard
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
            Professional Webhook
            <span className="block text-slate-600">Testing Platform</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            Inspect, debug, and monitor webhooks in real-time. Built for developers who need reliable webhook testing and monitoring.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('dashboard')}
              className="inline-flex items-center px-6 py-3 bg-slate-900 text-white font-medium rounded-md hover:bg-slate-800 transition-colors"
            >
              Get Started
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Everything you need</h2>
            <p className="text-lg text-slate-600">Powerful features for webhook testing and monitoring</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Instant Endpoints</h3>
              <p className="text-slate-600">Create webhook endpoints instantly. No configuration required.</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Real-time Monitoring</h3>
              <p className="text-slate-600">Monitor webhook requests in real-time with detailed payload inspection.</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Secure & Reliable</h3>
              <p className="text-slate-600">Enterprise-grade security with reliable webhook delivery.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">How it works</h2>
            <p className="text-lg text-slate-600">Get started in three simple steps</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 border border-slate-200">
              <div className="w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center text-sm font-bold mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Create Endpoint</h3>
              <p className="text-slate-600">Generate a unique webhook URL instantly with a custom name.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-slate-200">
              <div className="w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center text-sm font-bold mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Configure Service</h3>
              <p className="text-slate-600">Add the webhook URL to your service (Stripe, GitHub, etc.).</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-slate-200">
              <div className="w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center text-sm font-bold mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Monitor Requests</h3>
              <p className="text-slate-600">View real-time webhook requests with full payload details.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-slate-900 mb-2">99.9%</div>
              <div className="text-slate-600">Uptime</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900 mb-2">&lt;100ms</div>
              <div className="text-slate-600">Response Time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900 mb-2">1M+</div>
              <div className="text-slate-600">Webhooks Processed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900 mb-2">24/7</div>
              <div className="text-slate-600">Monitoring</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to get started?</h2>
          <p className="text-xl text-slate-300 mb-8">Start testing your webhooks in seconds</p>
          <button
            onClick={() => onNavigate('dashboard')}
            className="inline-flex items-center px-6 py-3 bg-white text-slate-900 font-medium rounded-md hover:bg-slate-100 transition-colors"
          >
            Open Dashboard
            <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-slate-900 rounded flex items-center justify-center mr-2">
                <Globe className="w-3 h-3 text-white" />
              </div>
              <span className="text-slate-600">WebhookHub</span>
            </div>
            <div className="text-sm text-slate-500">
              Built for developers, by developers
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home