const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })
  return response
}

export const getWebhookUrl = (endpointId) => {
  return `${API_BASE_URL}/w/${endpointId}`
}

export { API_BASE_URL }