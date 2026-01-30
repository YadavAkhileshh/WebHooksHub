import React, { useState } from 'react'
import { Send, Copy, CheckCircle, AlertCircle } from 'lucide-react'

const WebhookTester = ({ endpoints }) => {
  const [selectedEndpoint, setSelectedEndpoint] = useState('')
  const [method, setMethod] = useState('POST')
  const [headers, setHeaders] = useState('{\n  "Content-Type": "application/json",\n  "User-Agent": "WebhookHub-Tester/1.0"\n}')
  const [payload, setPayload] = useState('{\n  "event": "test",\n  "message": "Hello from WebhookHub!",\n  "timestamp": "' + new Date().toISOString() + '",\n  "data": {\n    "user": "testuser",\n    "action": "webhook_test"\n  }\n}')
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)

  const sendWebhook = async () => {
    if (!selectedEndpoint) {
      alert('Please select an endpoint first')
      return
    }

    setLoading(true)
    try {
      const parsedHeaders = JSON.parse(headers)
      const webhookUrl = `http://localhost:3005/w/${selectedEndpoint}`
      
      const res = await fetch(webhookUrl, {
        method,
        headers: parsedHeaders,
        body: method !== 'GET' ? payload : undefined
      })
      
      const responseData = await res.json()
      setResponse({
        status: res.status,
        statusText: res.statusText,
        data: responseData,
        success: res.ok
      })
    } catch (error) {
      setResponse({
        status: 0,
        statusText: 'Error',
        data: { error: error.message },
        success: false
      })
    }
    setLoading(false)
  }

  const copyWebhookUrl = () => {
    if (selectedEndpoint) {
      const url = `http://localhost:3005/w/${selectedEndpoint}`
      navigator.clipboard.writeText(url)
      alert('Webhook URL copied to clipboard!')
    }
  }

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
        <Send className="w-5 h-5 mr-2 text-blue-600" />
        Webhook Tester
      </h3>

      {/* Endpoint Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Select Endpoint
        </label>
        <div className="flex gap-2">
          <select
            value={selectedEndpoint}
            onChange={(e) => setSelectedEndpoint(e.target.value)}
            className="flex-1 border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Choose an endpoint...</option>
            {endpoints.map((endpoint) => (
              <option key={endpoint.id} value={endpoint.id}>
                {endpoint.name} ({endpoint.id})
              </option>
            ))}
          </select>
          <button
            onClick={copyWebhookUrl}
            disabled={!selectedEndpoint}
            className="px-3 py-2 border border-slate-300 rounded-md hover:bg-slate-50 disabled:opacity-50"
            title="Copy Webhook URL"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
        {selectedEndpoint && (
          <p className="text-xs text-slate-500 mt-1 font-mono">
            http://localhost:3005/w/{selectedEndpoint}
          </p>
        )}
      </div>

      {/* HTTP Method */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          HTTP Method
        </label>
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="PATCH">PATCH</option>
          <option value="DELETE">DELETE</option>
          <option value="GET">GET</option>
        </select>
      </div>

      {/* Headers */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Headers (JSON)
        </label>
        <textarea
          value={headers}
          onChange={(e) => setHeaders(e.target.value)}
          className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
        />
      </div>

      {/* Payload */}
      {method !== 'GET' && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Request Body (JSON)
          </label>
          <textarea
            value={payload}
            onChange={(e) => setPayload(e.target.value)}
            className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={8}
          />
        </div>
      )}

      {/* Send Button */}
      <button
        onClick={sendWebhook}
        disabled={loading || !selectedEndpoint}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Sending...
          </>
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            Send Webhook
          </>
        )}
      </button>

      {/* Response */}
      {response && (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-slate-700 mb-2 flex items-center">
            {response.success ? (
              <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600 mr-2" />
            )}
            Response ({response.status} {response.statusText})
          </h4>
          <div className="bg-slate-50 border border-slate-200 rounded-md p-3">
            <pre className="text-xs font-mono text-slate-700 whitespace-pre-wrap">
              {JSON.stringify(response.data, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  )
}

export default WebhookTester