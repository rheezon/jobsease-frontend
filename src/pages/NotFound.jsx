import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ maxWidth: 520, textAlign: 'center' }}>
        <h1 style={{ fontSize: '56px', margin: '0 0 8px' }}>404</h1>
        <h2 style={{ margin: '0 0 16px' }}>Page not found</h2>
        <p style={{ color: '#64748b', margin: '0 0 24px' }}>
          The page you are looking for doesn’t exist or was moved.
        </p>
        <Link to="/dashboard" style={{ display: 'inline-block', padding: '10px 16px', background: '#2563eb', color: '#fff', borderRadius: 8 }}>
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}


