import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, Plus, Activity, Clock, Copy, Trash2, RefreshCw,
  CheckCircle2, Server, Zap, ExternalLink, AlertCircle,
  Globe2, Terminal, Code2, ArrowRight, TrendingUp, Box
} from 'lucide-react'
import { apiRequest, getWebhookUrl } from '../utils/api'
import WebhookTester from './WebhookTester'

const Dashboard = ({ onNavigate }) => {
  const [endpoints, setEndpoints] = useState([])
  const [webhooks, setWebhooks] = useState([])
  const [selectedEndpoint, setSelectedEndpoint] = useState(null)
  const [loading, setLoading] = useState(false)
  const [newEndpointName, setNewEndpointName] = useState('')
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' })
  const [filter, setFilter] = useState('all')

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type })
    setTimeout(() => setNotification({ show: false, message: '', type: 'success' }), 3000)
  }

  const fetchData = async () => {
    try {
      const [endpointsRes, webhooksRes] = await Promise.all([
        apiRequest('/api/endpoints'),
        apiRequest('/api/webhooks')
      ])
      const endpointsData = await endpointsRes.json()
      const webhooksData = await webhooksRes.json()
      setEndpoints(endpointsData)
      setWebhooks(webhooksData)

      if (!selectedEndpoint && endpointsData.length > 0) {
        setSelectedEndpoint(endpointsData[0])
      }
    } catch (error) {
      console.error('Failed to fetch data:', error)
    }
  }

  const createEndpoint = async () => {
    if (!newEndpointName.trim()) {
      showNotification('Please enter an endpoint name', 'error')
      return
    }

    setLoading(true)
    try {
      const response = await apiRequest('/api/endpoints', {
        method: 'POST',
        body: JSON.stringify({ name: newEndpointName })
      })

      if (response.ok) {
        const newEndpoint = await response.json()
        setNewEndpointName('')
        fetchData()
        setSelectedEndpoint(newEndpoint)
        showNotification('Endpoint created successfully', 'success')
      }
    } catch (error) {
      showNotification('Failed to create endpoint', 'error')
    }
    setLoading(false)
  }

  const deleteEndpoint = async (id) => {
    if (!confirm('Delete this endpoint? All webhook data will be lost.')) return

    try {
      await apiRequest(`/api/endpoints/${id}`, { method: 'DELETE' })
      if (selectedEndpoint?.id === id) {
        setSelectedEndpoint(null)
      }
      fetchData()
      showNotification('Endpoint deleted', 'success')
    } catch (error) {
      showNotification('Failed to delete endpoint', 'error')
    }
  }

  const copyWebhookUrl = (id) => {
    const url = getWebhookUrl(id)
    navigator.clipboard.writeText(url)
    showNotification('URL copied to clipboard', 'success')
  }

  const getFilteredWebhooks = () => {
    if (filter === 'all') return webhooks
    return webhooks.filter(w => w.endpointId === filter)
  }

  const getEndpointWebhooks = (endpointId) => {
    return webhooks.filter(w => w.endpointId === endpointId)
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 3000)
    return () => clearInterval(interval)
  }, [])

  const stats = {
    total: endpoints.length,
    requests: webhooks.length,
    recentRequests: webhooks.filter(w => {
      const hourAgo = new Date(Date.now() - 60 * 60 * 1000)
      return new Date(w.timestamp) > hourAgo
    }).length
  }

  const filteredWebhooks = getFilteredWebhooks()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notification Toast */}
      <AnimatePresence>
        {notification.show && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 right-6 z-50"
          >
            <div className={`px-6 py-4 rounded-xl shadow-2xl flex items-center space-x-3 border ${
              notification.type === 'success'
                ? 'bg-white border-green-200 text-gray-900'
                : 'bg-white border-red-200 text-gray-900'
              }`}>
              {notification.type === 'success' ? (
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>
              ) : (
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
              )}
              <span className="font-medium text-sm">{notification.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl flex items-center justify-center shadow-lg">
                  <Zap className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <span className="text-xl font-bold text-gray-900 tracking-tight">WebhookHub</span>
                  <div className="flex items-center space-x-2 -mt-0.5">
                    <span className="text-xs text-gray-500 font-medium">Dashboard</span>
                    <div className="w-1 h-1 bg-gray-300 rounded-full" />
                    <div className="flex items-center space-x-1.5">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                      <span className="text-xs text-green-600 font-semibold">Live</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={fetchData}
                className="p-2.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all"
                title="Refresh data"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <div className="w-px h-6 bg-gray-200" />
              <button
                onClick={() => onNavigate('home')}
                className="flex items-center px-4 py-2.5 text-sm font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Home
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center">
                <Globe2 className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex items-center space-x-1 text-green-600">
                <TrendingUp className="w-3 h-3" />
                <span className="text-xs font-semibold">Active</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium mb-1">Total Endpoints</p>
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex items-center space-x-1 text-purple-600">
                <Box className="w-3 h-3" />
                <span className="text-xs font-semibold">All time</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium mb-1">Total Requests</p>
              <p className="text-3xl font-bold text-gray-900">{stats.requests}</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div className="flex items-center space-x-1 text-orange-600">
                <Activity className="w-3 h-3" />
                <span className="text-xs font-semibold">1 hour</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium mb-1">Recent Activity</p>
              <p className="text-3xl font-bold text-gray-900">{stats.recentRequests}</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 text-white shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center space-x-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                </span>
              </div>
            </div>
            <div>
              <p className="text-sm text-white/70 font-medium mb-1">System Status</p>
              <p className="text-2xl font-bold">Operational</p>
            </div>
          </motion.div>
        </div>

        {/* Quick Start Guide */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 border border-green-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center mb-5">
              <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                <Zap className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <h3 className="text-lg font-bold text-green-900">Quick Start Guide</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start">
                <div className="w-7 h-7 bg-green-600 text-white rounded-lg flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0 shadow-md">
                  1
                </div>
                <div>
                  <p className="font-bold text-green-900 mb-1.5 text-sm">Create Endpoint</p>
                  <p className="text-sm text-green-700 leading-relaxed">
                    Enter a name in the left panel and click + to generate your webhook URL instantly
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-7 h-7 bg-green-600 text-white rounded-lg flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0 shadow-md">
                  2
                </div>
                <div>
                  <p className="font-bold text-green-900 mb-1.5 text-sm">Copy & Configure</p>
                  <p className="text-sm text-green-700 leading-relaxed">
                    Click copy to get URL for Stripe, GitHub, or any webhook service you use
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-7 h-7 bg-green-600 text-white rounded-lg flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0 shadow-md">
                  3
                </div>
                <div>
                  <p className="font-bold text-green-900 mb-1.5 text-sm">Test & Monitor</p>
                  <p className="text-sm text-green-700 leading-relaxed">
                    Use built-in tester or send from external services to see real-time results
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left - Endpoints Panel */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold text-gray-900">Endpoints</h2>
                  <span className="px-2.5 py-1 bg-gray-900 text-white text-xs font-bold rounded-lg">
                    {endpoints.length}
                  </span>
                </div>
              </div>

              <div className="p-6">
                {/* Create Endpoint */}
                <div className="mb-6">
                  <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                    New Endpoint
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g., stripe-payments"
                      value={newEndpointName}
                      onChange={(e) => setNewEndpointName(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && createEndpoint()}
                      className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 transition-all"
                    />
                    <button
                      onClick={createEndpoint}
                      disabled={loading || !newEndpointName.trim()}
                      className="px-4 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl disabled:shadow-none"
                    >
                      <Plus className="w-4 h-4" strokeWidth={2.5} />
                    </button>
                  </div>
                </div>

                {/* Endpoints List */}
                <div className="space-y-3 max-h-[500px] overflow-y-auto">
                  {endpoints.map((endpoint) => {
                    const webhookCount = getEndpointWebhooks(endpoint.id).length
                    const isSelected = selectedEndpoint?.id === endpoint.id

                    return (
                      <motion.div
                        key={endpoint.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`border rounded-xl p-4 transition-all cursor-pointer ${
                          isSelected
                            ? 'border-gray-900 bg-gray-50 shadow-md'
                            : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                        }`}
                        onClick={() => setSelectedEndpoint(endpoint)}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <span className="relative flex h-2.5 w-2.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                            </span>
                            <h3 className="font-bold text-gray-900 text-sm">{endpoint.name}</h3>
                          </div>
                          <div className="flex items-center space-x-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                copyWebhookUrl(endpoint.id)
                              }}
                              className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                              title="Copy URL"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                deleteEndpoint(endpoint.id)
                              }}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="text-xs font-mono text-gray-600 bg-gray-100 p-2.5 rounded-lg border border-gray-200 mb-3 overflow-x-auto">
                          {getWebhookUrl(endpoint.id)}
                        </div>

                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-500 font-medium">
                            {new Date(endpoint.createdAt).toLocaleDateString()}
                          </span>
                          <div className="flex items-center px-2 py-1 bg-gray-100 rounded-lg">
                            <Activity className="w-3 h-3 mr-1.5 text-gray-600" />
                            <span className="font-bold text-gray-900">{webhookCount}</span>
                            <span className="text-gray-500 ml-1">requests</span>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}

                  {endpoints.length === 0 && (
                    <div className="text-center py-16">
                      <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Globe2 className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-gray-900 font-semibold text-sm mb-1">No endpoints yet</p>
                      <p className="text-gray-500 text-xs">Create your first endpoint above</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Middle - Tester Panel */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold text-gray-900">Webhook Tester</h2>
                  <Terminal className="w-4 h-4 text-gray-400" />
                </div>
              </div>
              <div className="p-6">
                <WebhookTester endpoints={endpoints} onWebhookSent={fetchData} />
              </div>
            </div>
          </div>

          {/* Right - Recent Webhooks */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold text-gray-900">Recent Webhooks</h2>
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="text-xs border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:border-gray-900 font-medium"
                  >
                    <option value="all">All Endpoints</option>
                    {endpoints.map(ep => (
                      <option key={ep.id} value={ep.id}>{ep.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-3 max-h-[500px] overflow-y-auto">
                  {filteredWebhooks.slice(0, 20).map((webhook) => {
                    const endpoint = endpoints.find(e => e.id === webhook.endpointId)
                    return (
                      <motion.div 
                        key={webhook.id} 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="border border-gray-200 rounded-xl p-4 hover:border-gray-300 hover:shadow-sm transition-all"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold shadow-sm ${
                              webhook.method === 'POST' ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                              webhook.method === 'GET' ? 'bg-green-100 text-green-700 border border-green-200' :
                              webhook.method === 'PUT' ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' :
                              webhook.method === 'DELETE' ? 'bg-red-100 text-red-700 border border-red-200' :
                              'bg-gray-100 text-gray-700 border border-gray-200'
                            }`}>
                              {webhook.method}
                            </span>
                            <span className="text-sm font-bold text-gray-900">
                              {endpoint?.name || 'Unknown'}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500 font-medium">
                            {new Date(webhook.timestamp).toLocaleTimeString()}
                          </span>
                        </div>

                        {webhook.headers && (
                          <div className="text-xs text-gray-600 mb-2 flex items-center px-2 py-1 bg-gray-50 rounded-lg w-fit">
                            <Code2 className="w-3 h-3 mr-1.5" />
                            <span className="font-semibold">{Object.keys(webhook.headers).length}</span>
                            <span className="ml-1">headers</span>
                          </div>
                        )}

                        {webhook.body && (
                          <div className="bg-gray-50 rounded-lg p-3 mb-3 border border-gray-200">
                            <pre className="text-xs font-mono text-gray-700 max-h-24 overflow-y-auto">
                              {typeof webhook.body === 'string'
                                ? webhook.body
                                : JSON.stringify(webhook.body, null, 2)}
                            </pre>
                          </div>
                        )}

                        <div className="flex items-center justify-between text-xs pt-3 border-t border-gray-100">
                          <span className="text-gray-500 font-mono">
                            {webhook.ip || 'Unknown IP'}
                          </span>
                          <div className="flex items-center px-2 py-1 bg-green-50 text-green-700 rounded-lg border border-green-200">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            <span className="font-semibold">Received</span>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}

                  {filteredWebhooks.length === 0 && (
                    <div className="text-center py-16">
                      <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Activity className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-gray-900 font-semibold text-sm mb-1">No webhooks yet</p>
                      <p className="text-gray-500 text-xs">
                        {filter === 'all'
                          ? 'Test a webhook to see it here'
                          : 'No webhooks for this endpoint'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Monitoring Tools Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-base font-bold text-gray-900">Advanced Monitoring</h3>
              <span className="text-xs text-gray-500 font-medium">External Tools</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a
                href="http://localhost:3001"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center p-4 border border-gray-200 rounded-xl hover:border-gray-900 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl flex items-center justify-center mr-4">
                  <Server className="w-6 h-6 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 text-sm mb-0.5">Grafana</h4>
                  <p className="text-xs text-gray-600">Metrics & dashboards</p>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-900 transition-colors" />
              </a>

              <a
                href="http://localhost:9090"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center p-4 border border-gray-200 rounded-xl hover:border-gray-900 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-red-50 to-red-100 rounded-xl flex items-center justify-center mr-4">
                  <Activity className="w-6 h-6 text-red-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 text-sm mb-0.5">Prometheus</h4>
                  <p className="text-xs text-gray-600">Metrics collection</p>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-900 transition-colors" />
              </a>

              <a
                href="http://localhost:5601"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center p-4 border border-gray-200 rounded-xl hover:border-gray-900 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl flex items-center justify-center mr-4">
                  <Terminal className="w-6 h-6 text-cyan-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 text-sm mb-0.5">Kibana</h4>
                  <p className="text-xs text-gray-600">Log analysis</p>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-900 transition-colors" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard