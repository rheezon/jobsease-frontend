import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../components/AuthProvider';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError('');
    
    try {
      await login(data.email, data.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modern-auth-container">
      {/* Left side - Marketing/Visual section */}
      <div className="auth-visual-section">
        <div className="visual-elements">
          {/* Geometric shapes and graphics */}
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
          <div className="shape shape-5"></div>
          <div className="shape shape-6"></div>
          <div className="shape shape-7"></div>
          <div className="shape shape-8"></div>
          <div className="shape shape-9"></div>
          <div className="shape shape-10"></div>
          
          {/* Person avatars */}
          <div className="avatar avatar-1">
            <div className="avatar-face"></div>
          </div>
          <div className="avatar avatar-2">
            <div className="avatar-face"></div>
          </div>
          <div className="avatar avatar-3">
            <div className="avatar-face"></div>
          </div>
          
          {/* 3D Objects */}
          <div className="object-3d laptop">
            <div className="laptop-screen"></div>
          </div>
          <div className="object-3d keyboard">
            <div className="keyboard-keys"></div>
          </div>
          <div className="object-3d microphone">
            <div className="mic-stand"></div>
          </div>
        </div>
        
        <div className="marketing-content">
          <h1 className="marketing-title">Find the job made for you.</h1>
          <p className="marketing-subtitle">Browse over 130K jobs at top companies and fast-growing startups.</p>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="auth-form-section">
        <div className="auth-form-container">
          <div className="auth-header">
            <h2 className="brand-name">Welcome to Jobsease</h2>
            <h1 className="auth-title">Login</h1>
            <p className="auth-tagline">Find the job made for you!</p>
          </div>

          <div className="auth-options">
            <button className="google-auth-btn">
              <div className="google-logo">
                <div className="google-g">G</div>
              </div>
              Log in with Google
            </button>
            
            <div className="divider">
              <span>or Login with Email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
            {error && <div className="error-message" style={{ textAlign: 'center' }}>{error}</div>}
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-container">
                <input
                  type="email"
                  id="email"
                  placeholder="mail@website.com"
                  {...register('email')}
                  className={errors.email ? 'error' : ''}
                />
              </div>
              {errors.email && <span className="field-error">{errors.email.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="min 8 characters"
                  {...register('password')}
                  className={errors.password ? 'error' : ''}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <span className="field-error">{errors.password.message}</span>}
            </div>

            <div className="forgot-password">
              <Link to="/forgot-password" className="forgot-link">
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="auth-submit-btn" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Log in'}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Not registered? <Link to="/signup" className="auth-link">Create an Account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;