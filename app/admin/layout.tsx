// app/admin/layout.tsx
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="admin-layout">
      <header>
        <h2>Admin Panel</h2>
      </header>
      <main>{children}</main>
      <footer>
        <p>Admin Footer</p>
      </footer>
    </div>
  );
}
