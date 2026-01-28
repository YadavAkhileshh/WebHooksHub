import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, Plus, Globe, Activity, Clock, 
  Copy, Trash2, RefreshCw, AlertTriangle,
  CheckCircle2, Database, Server, Zap, ExternalLink
} from 'lucide-react'
import { apiRequest, getWebhookUrl } from '../utils/api'

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
        apiRequest('/api/endpoints'),
        apiRequest('/api/webhooks')
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
      const response = await apiRequest('/api/endpoints', {
        method: 'POST',
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
      await apiRequest(`/api/endpoints/${id}`, { method: 'DELETE' })
      fetchData()
      showNotification('Endpoint deleted')
    } catch (error) {
      console.error('Failed to delete endpoint:', error)
    }
  }

  const copyWebhookUrl = (id) => {
    const url = getWebhookUrl(id)
    navigator.clipboard.writeText(url)
    showNotification('Webhook URL copied to clipboard!')
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 right-4 bg-emerald-600 text-white px-4 py-3 rounded-md shadow-lg z-50 border border-emerald-500"
          >
            <div className="flex items-center">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              {notification}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center mr-3">
                  <Globe className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-slate-900">WebhookHub</h1>
                  <p className="text-xs text-slate-500">Dashboard</p>
                </div>
              </div>
              <div className="ml-4 flex items-center">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="ml-2 text-sm text-slate-600">Live</span>
              </div>
            </div>
            <button
              onClick={() => onNavigate('home')}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Server className="w-5 h-5 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Active Endpoints</p>
                <p className="text-2xl font-bold text-slate-900">{endpoints.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Total Requests</p>
                <p className="text-2xl font-bold text-slate-900">{webhooks.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center">
                <Database className="w-5 h-5 text-slate-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">System Status</p>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2" />
                  <p className="text-sm font-medium text-emerald-600">Operational</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Endpoints Panel */}
          <div className="bg-white rounded-lg border border-slate-200">
            <div className="px-6 py-4 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900">Webhook Endpoints</h2>
                <button
                  onClick={fetchData}
                  className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex gap-3 mb-6">
                <input
                  type="text"
                  placeholder="Enter endpoint name (e.g., stripe-webhooks)"
                  value={newEndpointName}
                  onChange={(e) => setNewEndpointName(e.target.value)}
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && createEndpoint()}
                />
                <button
                  onClick={createEndpoint}
                  disabled={loading || !newEndpointName.trim()}
                  className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-md hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {endpoints.map((endpoint) => (
                  <div key={endpoint.id} className="border border-slate-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3" />
                        <h3 className="font-medium text-slate-900">{endpoint.name}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => copyWebhookUrl(endpoint.id)}
                          className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors"
                          title="Copy URL"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteEndpoint(endpoint.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="text-xs font-mono text-slate-500 bg-slate-50 rounded px-2 py-1">
                      /w/{endpoint.id}
                    </div>
                    <p className="text-xs text-slate-400 mt-2">
                      Created {new Date(endpoint.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
                
                {endpoints.length === 0 && (
                  <div className="text-center py-12">
                    <Server className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-sm font-medium text-slate-900 mb-2">No endpoints yet</h3>
                    <p className="text-sm text-slate-500">Create your first webhook endpoint to get started</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Webhooks Panel */}
          <div className="bg-white rounded-lg border border-slate-200">
            <div className="px-6 py-4 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900">Recent Activity</h2>
            </div>
            
            <div className="p-6">
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {webhooks.slice(0, 10).map((webhook) => (
                  <div key={webhook.id} className="border border-slate-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                          webhook.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                          webhook.method === 'GET' ? 'bg-emerald-100 text-emerald-800' :
                          webhook.method === 'PUT' ? 'bg-amber-100 text-amber-800' :
                          'bg-slate-100 text-slate-800'
                        }`}>
                          {webhook.method}
                        </span>
                        <span className="ml-2 text-sm font-medium text-slate-900">
                          /{webhook.endpoint}
                        </span>
                      </div>
                      <div className="flex items-center text-xs text-slate-500">
                        <Clock className="w-3 h-3 mr-1" />
                        {new Date(webhook.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                    
                    {webhook.body && (
                      <div className="mt-3">
                        <div className="text-xs font-mono text-slate-600 bg-slate-50 rounded p-2 max-h-20 overflow-y-auto">
                          {typeof webhook.body === 'string' ? webhook.body.substring(0, 200) : JSON.stringify(webhook.body, null, 2).substring(0, 200)}
                          {(typeof webhook.body === 'string' ? webhook.body : JSON.stringify(webhook.body)).length > 200 && '...'}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                
                {webhooks.length === 0 && (
                  <div className="text-center py-12">
                    <Activity className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-sm font-medium text-slate-900 mb-2">No activity yet</h3>
                    <p className="text-sm text-slate-500">Webhook requests will appear here</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard