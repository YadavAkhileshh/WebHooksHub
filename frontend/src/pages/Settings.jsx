import React from 'react';
import { Shield, Bell, User, Cpu, Github, ExternalLink } from 'lucide-react';

export default function Settings() {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
                <p className="text-gray-500">Configure your personal preferences and system integrations</p>
            </div>

            <div className="grid gap-6">
                <SettingSection
                    title="Account Information"
                    icon={<User className="text-blue-500" />}
                    description="Manage your profile and linked accounts"
                >
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-400 uppercase">Display Name</label>
                                <input type="text" className="w-full px-3 py-2 border rounded-lg bg-gray-50 text-gray-500" value="Demo User" readOnly />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-400 uppercase">User ID</label>
                                <input type="text" className="w-full px-3 py-2 border rounded-lg bg-gray-50 text-gray-500 font-mono" value="demo-user" readOnly />
                            </div>
                        </div>
                    </div>
                </SettingSection>

                <SettingSection
                    title="System Status"
                    icon={<Cpu className="text-green-500" />}
                    description="View the current status of the backend services"
                >
                    <div className="flex gap-4">
                        <StatusIndicator label="API" status="online" />
                        <StatusIndicator label="Database" status="online" />
                        <StatusIndicator label="Redis" status="online" />
                        <StatusIndicator label="Metrics" status="online" />
                    </div>
                </SettingSection>

                <SettingSection
                    title="Security"
                    icon={<Shield className="text-amber-500" />}
                    description="API keys and access control"
                >
                    <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl text-amber-800 text-sm">
                        <p className="font-semibold">Security Note</p>
                        <p className="mt-1 opacity-80">This demo environment uses a default user ID. In a production environment, you would use OAuth2 or JWT for endpoint ownership.</p>
                    </div>
                </SettingSection>

                <div className="pt-8 border-t flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <a href="https://github.com" className="text-gray-400 hover:text-gray-900 transition-colors">
                            <Github size={20} />
                        </a>
                    </div>
                    <p className="text-xs text-gray-400 font-medium">WebhookHub v1.0.0-release</p>
                </div>
            </div>
        </div>
    );
}

function SettingSection({ title, icon, description, children }) {
    return (
        <div className="bg-white border rounded-2xl overflow-hidden shadow-sm">
            <div className="p-6 border-b flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
                    {icon}
                </div>
                <div>
                    <h3 className="font-bold text-gray-900">{title}</h3>
                    <p className="text-sm text-gray-500">{description}</p>
                </div>
            </div>
            <div className="p-6">
                {children}
            </div>
        </div>
    );
}

function StatusIndicator({ label, status }) {
    return (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border">
            <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs font-semibold text-gray-600 uppercase tracking-tight">{label}</span>
        </div>
    );
}
