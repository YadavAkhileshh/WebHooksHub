import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Clock, Hash, ChevronRight, Loader2, Globe } from 'lucide-react';
import api from '../lib/api';
import { formatDistanceToNow } from 'date-fns';

export default function Dashboard() {
    const [endpoints, setEndpoints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);
    const [newEndpointName, setNewEndpointName] = useState('');

    useEffect(() => {
        fetchEndpoints();
    }, []);

    const fetchEndpoints = async () => {
        try {
            setLoading(true);
            const res = await api.get('/endpoints');
            setEndpoints(res.data);
        } catch (err) {
            console.error('Failed to fetch endpoints', err);
        } finally {
            setLoading(false);
        }
    };

    const createEndpoint = async (e) => {
        e.preventDefault();
        if (!newEndpointName.trim()) return;

        setIsCreating(true);
        try {
            await api.post('/endpoints', { name: newEndpointName });
            setNewEndpointName('');
            fetchEndpoints();
        } catch (err) {
            console.error('Failed to create endpoint', err);
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Endpoints</h2>
                    <p className="text-gray-500">Manage your webhook listening points</p>
                </div>

                <form onSubmit={createEndpoint} className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Endpoint name (e.g. Stripe Dev)"
                        className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none w-full md:w-64"
                        value={newEndpointName}
                        onChange={(e) => setNewEndpointName(e.target.value)}
                    />
                    <button
                        type="submit"
                        disabled={isCreating}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                        {isCreating ? <Loader2 className="animate-spin" size={18} /> : <Plus size={18} />}
                        Create
                    </button>
                </form>
            </div>

            {loading ? (
                <div className="h-64 flex items-center justify-center">
                    <Loader2 className="animate-spin text-primary" size={32} />
                </div>
            ) : endpoints.length === 0 ? (
                <div className="bg-white border-2 border-dashed rounded-2xl p-12 text-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                        <Globe size={32} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">No endpoints found</h3>
                    <p className="text-gray-500 max-w-sm mx-auto mt-2">Create your first endpoint to start receiving webhooks and inspecting payloads in real-time.</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {endpoints.map((endpoint) => (
                        <Link
                            key={endpoint.id}
                            to={`/endpoint/${endpoint.id}`}
                            className="bg-white border rounded-xl p-6 hover:border-primary/50 transition-all flex items-center justify-between group group-hover:shadow-sm"
                        >
                            <div className="flex items-center gap-6">
                                <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center text-primary border border-gray-100">
                                    <Hash size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-gray-900">{endpoint.name}</h4>
                                    <div className="flex items-center gap-4 mt-1">
                                        <span className="text-sm text-gray-500 flex items-center gap-1.5">
                                            <Clock size={14} />
                                            {endpoint.last_request_at
                                                ? `Last seen ${formatDistanceToNow(new Date(endpoint.last_request_at))} ago`
                                                : 'Never active'}
                                        </span>
                                        <span className="text-sm text-gray-500 font-medium px-2 py-0.5 bg-gray-100 rounded">
                                            {endpoint.request_count} requests
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right hidden sm:block">
                                    <p className="text-xs font-mono text-gray-400 uppercase tracking-wider">ID</p>
                                    <p className="text-sm font-mono font-medium text-gray-600">{endpoint.id}</p>
                                </div>
                                <ChevronRight className="text-gray-300 group-hover:text-primary transition-colors" />
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
