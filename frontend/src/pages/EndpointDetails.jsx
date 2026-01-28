import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Terminal,
    Copy,
    Check,
    Loader2,
    AlertCircle,
    Clock,
    ArrowRight,
    Database,
    Info
} from 'lucide-react';
import api from '../lib/api';
import { formatDistanceToNow } from 'date-fns';

export default function EndpointDetails() {
    const { id } = useParams();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [copied, setCopied] = useState(false);

    const endpointUrl = `${window.location.protocol}//${window.location.host.split(':')[0]}:3000/w/${id}`;

    useEffect(() => {
        fetchRequests();

        // Simple polling for "real-time" feel without WS for now
        const interval = setInterval(fetchRequests, 5000);
        return () => clearInterval(interval);
    }, [id]);

    const fetchRequests = async () => {
        try {
            const res = await api.get(`/endpoints/${id}/requests`);
            setRequests(res.data);
            if (!selectedRequest && res.data.length > 0) {
                setSelectedRequest(res.data[0]);
            }
        } catch (err) {
            console.error('Failed to fetch requests', err);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(endpointUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-140px)]">
            {/* Header Info */}
            <div className="mb-6 bg-white p-6 rounded-2xl border shadow-sm">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                            <Terminal size={20} />
                        </div>
                        <div>
                            <h2 className="font-bold text-xl text-gray-900 leading-none">Live Inspection</h2>
                            <p className="text-sm text-gray-500 mt-1 font-mono">{id}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <div className="bg-gray-100 px-4 py-2 rounded-lg font-mono text-sm text-gray-600 truncate flex-1 md:w-96">
                            {endpointUrl}
                        </div>
                        <button
                            onClick={copyToClipboard}
                            className="p-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                        >
                            {copied ? <Check size={18} /> : <Copy size={18} />}
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex gap-6 overflow-hidden">
                {/* Logs List */}
                <div className="w-1/3 flex flex-col bg-white border rounded-2xl overflow-hidden shadow-sm">
                    <div className="p-4 border-b bg-gray-50/50 flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Events</span>
                        <span className="text-xs px-2 py-0.5 bg-gray-200 rounded-full font-medium">{requests.length}</span>
                    </div>

                    <div className="flex-1 overflow-auto divide-y">
                        {loading ? (
                            <div className="p-8 text-center"><Loader2 className="animate-spin mx-auto text-gray-400" /></div>
                        ) : requests.length === 0 ? (
                            <div className="p-8 text-center">
                                <p className="text-sm text-gray-400">Waiting for requests...</p>
                                <div className="mt-4 flex justify-center">
                                    <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse"></div>
                                </div>
                            </div>
                        ) : (
                            requests.map((req) => (
                                <button
                                    key={req.id}
                                    onClick={() => setSelectedRequest(req)}
                                    className={`w-full text-left p-4 hover:bg-gray-50 transition-colors flex flex-col gap-1 ${selectedRequest?.id === req.id ? 'bg-blue-50/50 border-l-4 border-l-primary' : 'border-l-4 border-l-transparent'}`}
                                >
                                    <div className="flex justify-between items-center">
                                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${req.method === 'POST' ? 'bg-green-100 text-green-700' :
                                                req.method === 'GET' ? 'bg-blue-100 text-blue-700' :
                                                    'bg-gray-100 text-gray-700'
                                            }`}>
                                            {req.method}
                                        </span>
                                        <span className="text-[10px] text-gray-400 font-mono">
                                            {formatDistanceToNow(new Date(req.received_at), { addSuffix: true })}
                                        </span>
                                    </div>
                                    <span className="text-xs font-mono text-gray-600 truncate mt-1">
                                        {req.id.toString().substring(0, 8)}...
                                    </span>
                                </button>
                            ))
                        )}
                    </div>
                </div>

                {/* Request Details */}
                <div className="flex-1 bg-white border rounded-2xl overflow-hidden shadow-sm flex flex-col">
                    {selectedRequest ? (
                        <>
                            <div className="p-6 border-b flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <h3 className="font-bold text-lg">Request Details</h3>
                                    <span className="px-2 py-1 bg-gray-100 rounded text-xs font-mono text-gray-600">{selectedRequest.id}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-400 text-xs">
                                    <Clock size={14} />
                                    {new Date(selectedRequest.received_at).toLocaleString()}
                                </div>
                            </div>

                            <div className="flex-1 overflow-auto p-6 space-y-8">
                                {/* Meta Cards */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Source IP</p>
                                        <p className="font-mono text-sm">{selectedRequest.ip_address}</p>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Content-Type</p>
                                        <p className="font-mono text-sm">{JSON.parse(selectedRequest.headers)['content-type'] || 'n/a'}</p>
                                    </div>
                                </div>

                                <Section title="Payload" icon={<Database size={16} />}>
                                    <pre className="p-4 bg-gray-900 text-blue-100 rounded-xl overflow-auto text-xs font-mono leading-relaxed max-h-96">
                                        {JSON.stringify(typeof selectedRequest.body === 'string' ? JSON.parse(selectedRequest.body) : selectedRequest.body, null, 2)}
                                    </pre>
                                </Section>

                                <Section title="Headers" icon={<Info size={16} />}>
                                    <div className="border rounded-xl overflow-hidden">
                                        <table className="w-full text-left text-xs font-mono">
                                            <thead className="bg-gray-50 border-b">
                                                <tr>
                                                    <th className="px-4 py-2 font-bold text-gray-500">Key</th>
                                                    <th className="px-4 py-2 font-bold text-gray-500">Value</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y">
                                                {Object.entries(JSON.parse(selectedRequest.headers)).map(([key, val]) => (
                                                    <tr key={key}>
                                                        <td className="px-4 py-2 text-primary font-semibold">{key}</td>
                                                        <td className="px-4 py-2 text-gray-600 break-all">{val}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </Section>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 text-gray-300">
                                <AlertCircle size={40} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">No request selected</h3>
                            <p className="text-gray-500 mt-2">Select a request from the sidebar to view its details.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function Section({ title, icon, children }) {
    return (
        <div className="space-y-3">
            <div className="flex items-center gap-2 text-gray-500">
                {icon}
                <h4 className="text-sm font-bold uppercase tracking-wider">{title}</h4>
            </div>
            {children}
        </div>
    );
}
