import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Home, Plus, Webhook, Activity, Clock, 
  Copy, Trash2, RefreshCw, AlertCircle,
  CheckCircle, Database, Server, Zap
} from 'lucide-react'

const Dashboard = ({ onNavigate }) => {
  const [endpoints, setEndpoints] = useState([])
  const [webhooks, setWebhooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [newEndpointName, setNewEndpointName] = useState('')
  const [notification, setNotification] = useState('')

  const showNotification = (message) => {
    setNotification(message)
    setTimeout(() => setNotification(''), 3000)
  }

  const fetchData = async () => {
    try {
      const [endpointsRes, webhooksRes] = await Promise.all([
        fetch('/api/endpoints'),
        fetch('/api/webhooks')
      ])
      setEndpoints(await endpointsRes.json())
      setWebhooks(await webhooksRes.json())
    } catch (error) {
      console.error('Failed to fetch data:', error)
    }
  }

  const createEndpoint = async () => {
    if (!newEndpointName.trim()) return
    
    setLoading(true)
    try {
      const response = await fetch('/api/endpoints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newEndpointName })
      })
      
      if (response.ok) {
        setNewEndpointName('')
        fetchData()
        showNotification('Endpoint created successfully!')
      }
    } catch (error) {
      console.error('Failed to create endpoint:', error)
      showNotification('Failed to create endpoint')
    }
    setLoading(false)
  }

  const deleteEndpoint = async (id) => {
    try {
      await fetch(`/api/endpoints/${id}`, { method: 'DELETE' })
      fetchData()
      showNotification('Endpoint deleted')
    } catch (error) {
      console.error('Failed to delete endpoint:', error)
    }
  }

  const copyWebhookUrl = (id) => {
    const url = `${window.location.origin}/w/${id}`
    navigator.clipboard.writeText(url)
    showNotification('Webhook URL copied to clipboard!')
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50"
          >
            {notification}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-b border-gray-200 shadow-sm"
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Webhook className="w-6 h-6 text-blue-600 mr-3" />
            </motion.div>
            <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="ml-3"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full" />
            </motion.div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('home')}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm"
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </motion.button>
        </div>
      </motion.div>

      <div className="container mx-auto px-6 py-8">
        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-3 gap-6 mb-8"
        >
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Endpoints</p>
                <motion.p 
                  key={endpoints.length}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  className="text-2xl font-bold text-gray-900"
                >
                  {endpoints.length}
                </motion.p>
              </div>
              <Server className="w-8 h-8 text-blue-600" />
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Webhooks Received</p>
                <motion.p 
                  key={webhooks.length}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  className="text-2xl font-bold text-gray-900"
                >
                  {webhooks.length}
                </motion.p>
              </div>
              <Activity className="w-8 h-8 text-green-600" />
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Status</p>
                <p className="text-lg font-medium text-green-600 flex items-center">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                  </motion.div>
                  Online
                </p>
              </div>
              <Database className="w-8 h-8 text-purple-600" />
            </div>
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Endpoints */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <Server className="w-5 h-5 mr-2 text-blue-600" />
                Webhook Endpoints
              </h2>
              <motion.button
                whileHover={{ rotate: 180 }}
                onClick={fetchData}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
              </motion.button>
            </div>

            <div className="flex gap-2 mb-6">
              <input
                type="text"
                placeholder="Enter endpoint name"
                value={newEndpointName}
                onChange={(e) => setNewEndpointName(e.target.value)}
                className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                onKeyPress={(e) => e.key === 'Enter' && createEndpoint()}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={createEndpoint}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors disabled:opacity-50"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add
              </motion.button>
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto">
              <AnimatePresence>
                {endpoints.map((endpoint) => (
                  <motion.div 
                    key={endpoint.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{endpoint.name}</h3>
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => copyWebhookUrl(endpoint.id)}
                          className="p-1 text-gray-600 hover:text-gray-900 transition-colors"
                          title="Copy URL"
                        >
                          <Copy className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => deleteEndpoint(endpoint.id)}
                          className="p-1 text-gray-600 hover:text-red-600 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 font-mono">/w/{endpoint.id}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Created: {new Date(endpoint.createdAt).toLocaleDateString()}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {endpoints.length === 0 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8 text-gray-500"
                >
                  <AlertCircle className="w-8 h-8 mx-auto mb-3 opacity-50" />
                  <p>No endpoints yet</p>
                  <p className="text-xs mt-1">Create your first webhook endpoint above</p>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Webhooks */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-green-600" />
              Recent Webhooks
              {webhooks.length > 0 && (
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="ml-2 w-2 h-2 bg-green-500 rounded-full"
                />
              )}
            </h2>

            <div className="space-y-3 max-h-80 overflow-y-auto">
              <AnimatePresence>
                {webhooks.slice(0, 10).map((webhook) => (
                  <motion.div 
                    key={webhook.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-green-600">
                        {webhook.method} /{webhook.endpoint}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {new Date(webhook.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    
                    {webhook.body && (
                      <div className="mt-2">
                        <p className="text-xs text-gray-600 mb-1">Payload:</p>
                        <div className="text-xs text-gray-700 font-mono bg-white rounded p-2 max-h-16 overflow-y-auto border">
                          {typeof webhook.body === 'string' ? webhook.body : JSON.stringify(webhook.body, null, 2)}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {webhooks.length === 0 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8 text-gray-500"
                >
                  <Webhook className="w-8 h-8 mx-auto mb-3 opacity-50" />
                  <p>No webhooks received</p>
                  <p className="text-xs mt-1">Send a POST request to any endpoint</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard