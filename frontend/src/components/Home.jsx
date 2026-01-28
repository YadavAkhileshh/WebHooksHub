import React from 'react'
import { motion } from 'framer-motion'
import { Webhook, Shield, Activity, Zap, ArrowRight, Github, Container, Database, Play, Code, Monitor } from 'lucide-react'

const Home = ({ onNavigate }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-16">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="flex justify-center items-center mb-6">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Webhook className="w-16 h-16 text-blue-600 mr-4" />
            </motion.div>
            <h1 className="text-5xl font-bold text-gray-900">WebhookHub</h1>
          </motion.div>
          
          <motion.p variants={itemVariants} className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Professional webhook monitoring and testing platform
            <br />
            <span className="text-blue-600 font-semibold">Built for DevOps Excellence</span>
          </motion.p>

          <motion.div variants={itemVariants} className="flex justify-center gap-4 mb-12">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center bg-gray-100 px-4 py-2 rounded-full border border-gray-200"
            >
              <Play className="w-4 h-4 text-green-600 mr-2" />
              <span className="text-sm text-gray-700">Live Monitoring</span>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center bg-gray-100 px-4 py-2 rounded-full border border-gray-200"
            >
              <Shield className="w-4 h-4 text-blue-600 mr-2" />
              <span className="text-sm text-gray-700">Secure</span>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center bg-gray-100 px-4 py-2 rounded-full border border-gray-200"
            >
              <Container className="w-4 h-4 text-purple-600 mr-2" />
              <span className="text-sm text-gray-700">Docker Ready</span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* How it Works Section */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <motion.h2 variants={itemVariants} className="text-3xl font-bold text-gray-900 text-center mb-12">
            How It Works
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="text-center"
            >
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Create Endpoint</h3>
              <p className="text-gray-600 text-sm">Generate a unique webhook URL for your application</p>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="text-center"
            >
              <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Send Webhooks</h3>
              <p className="text-gray-600 text-sm">Configure your services to send webhooks to your URL</p>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="text-center"
            >
              <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Monitor & Debug</h3>
              <p className="text-gray-600 text-sm">View real-time requests with full payload inspection</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-3 gap-6 mb-16"
        >
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm"
          >
            <Activity className="w-8 h-8 text-green-600 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time Monitoring</h3>
            <p className="text-gray-600 text-sm">Monitor webhook requests as they happen with detailed payload inspection and headers</p>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm"
          >
            <Shield className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Enterprise Security</h3>
            <p className="text-gray-600 text-sm">Secure credential management, environment isolation, and production-ready security</p>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm"
          >
            <Monitor className="w-8 h-8 text-purple-600 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">DevOps Stack</h3>
            <p className="text-gray-600 text-sm">Docker, Kubernetes, Prometheus, Grafana monitoring stack included</p>
          </motion.div>
        </motion.div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <motion.button
            onClick={() => onNavigate('dashboard')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 inline-flex items-center shadow-lg"
          >
            <Play className="mr-2 w-5 h-5" />
            Launch Dashboard
            <ArrowRight className="ml-2 w-5 h-5" />
          </motion.button>
          
          <div className="mt-8 text-sm text-gray-500">
            <p className="mb-2">🚀 Production Ready • 🔒 Secure • 📊 Observable</p>
            <div className="flex justify-center items-center gap-4 text-xs">
              <span className="flex items-center"><Code className="w-3 h-3 mr-1" /> React + Node.js</span>
              <span className="flex items-center"><Database className="w-3 h-3 mr-1" /> PostgreSQL</span>
              <span className="flex items-center"><Container className="w-3 h-3 mr-1" /> Docker</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Home