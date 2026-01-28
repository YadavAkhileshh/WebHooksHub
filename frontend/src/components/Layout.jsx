import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Settings as SettingsIcon, Activity, ExternalLink, Menu, X } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const SidebarItem = ({ href, icon: Icon, children }) => {
    const location = useLocation();
    const isActive = location.pathname === href;

    return (
        <Link
            to={href}
            className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-gray-100"
            )}
        >
            <Icon size={18} />
            <span className="font-medium text-sm">{children}</span>
        </Link>
    );
};

export default function Layout() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    return (
        <div className="flex min-h-screen bg-gray-50/50">
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex w-64 flex-col border-r bg-white p-4 sticky top-0 h-screen">
                <div className="flex items-center gap-2 px-2 mb-8">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <Activity className="text-primary-foreground" size={20} />
                    </div>
                    <span className="font-bold text-xl tracking-tight">WebhookHub</span>
                </div>

                <nav className="space-y-1 flex-1">
                    <SidebarItem href="/dashboard" icon={LayoutDashboard}>Dashboard</SidebarItem>
                    <SidebarItem href="/settings" icon={SettingsIcon}>Settings</SidebarItem>
                </nav>

                <div className="pt-4 border-t mt-auto">
                    <p className="text-xs text-gray-500 px-2 uppercase font-semibold">Support</p>
                    <a
                        href="#"
                        className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:text-primary transition-colors mt-2"
                    >
                        <ExternalLink size={16} />
                        Documentation
                    </a>
                </div>
            </aside>

            {/* Mobile Nav */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b flex items-center justify-between px-4 z-50">
                <div className="flex items-center gap-2">
                    <Activity className="text-primary" size={20} />
                    <span className="font-bold text-lg">WebhookHub</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 md:pt-0 pt-16">
                <header className="h-16 border-b bg-white hidden md:flex items-center justify-between px-8">
                    <h1 className="font-semibold text-lg text-gray-800">Workspace</h1>
                    <div className="flex items-center gap-4">
                        <div className="h-8 w-8 rounded-full bg-gray-200 border flex items-center justify-center overflow-hidden">
                            <span className="text-xs font-medium">JD</span>
                        </div>
                    </div>
                </header>
                <div className="flex-1 p-4 md:p-8 overflow-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
