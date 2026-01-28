import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, ArrowRight, Shield, Zap, Code } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Welcome() {
    return (
        <div className="min-h-screen bg-white">
            <nav className="border-b h-16 flex items-center justify-between px-8 max-w-7xl mx-auto">
                <div className="flex items-center gap-2">
                    <Activity className="text-primary" size={24} />
                    <span className="font-bold text-xl uppercase tracking-tighter">WebhookHub</span>
                </div>
                <Link to="/dashboard" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm transition-opacity hover:opacity-90">
                    Open App
                </Link>
            </nav>

            <main>
                <div className="max-w-7xl mx-auto px-8 pt-20 pb-32 flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-6 border border-blue-100"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        Beta: Production-Ready Webhook Monitoring
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-8 max-w-4xl">
                        Test and Debug Webhooks <span className="text-blue-600">Instantly.</span>
                    </h1>

                    <p className="text-lg text-gray-600 mb-10 max-w-2xl leading-relaxed">
                        Create unique endpoints, receive real-time payloads, and analyze headers with our high-performance webhook testing suite. Built for DevOps engineers and Full-stack developers.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mb-20">
                        <Link to="/dashboard" className="flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-lg hover:scale-105 transition-transform shadow-lg shadow-gray-200">
                            Get Started for Free
                            <ArrowRight size={20} />
                        </Link>
                        <a href="#features" className="px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-colors">
                            Read Docs
                        </a>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-10">
                        <FeatureCard
                            icon={<Zap className="text-blue-500" />}
                            title="Real-time Inspection"
                            description="See incoming requests the millisecond they hit our servers via WebSocket integration."
                        />
                        <FeatureCard
                            icon={<Shield className="text-green-500" />}
                            title="Secure by Design"
                            description="Enterprise-grade security for your data, with Postgres-backed persistent storage."
                        />
                        <FeatureCard
                            icon={<Code className="text-purple-500" />}
                            title="DevOps Ready"
                            description="Integrated with Prometheus metrics and Docker support for modern infra."
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}

function FeatureCard({ icon, title, description }) {
    return (
        <div className="p-8 rounded-2xl border border-gray-100 bg-white text-left card-shadow hover:border-gray-200 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mb-6">
                {icon}
            </div>
            <h3 className="font-bold text-lg mb-3">{title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
        </div>
    );
}
