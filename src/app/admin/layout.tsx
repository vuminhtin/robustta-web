import type { Metadata } from 'next';
import Sidebar from '@/components/admin/Sidebar';
import '../globals.css';
import './admin.css';

export const metadata: Metadata = {
  title: 'Admin — RobustTA',
  description: 'RobustTA Coffee Admin Panel',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-root admin-area">
      <Sidebar />
      <main className="admin-main">
        {children}
      </main>
    </div>
  );
}
