import AdminNavbar from '@/components/admin/AdminNavbar';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({ children }) {
  return (<div className="flex"><AdminSidebar /><div className="flex-1"><AdminNavbar />{children}</div></div>);
}