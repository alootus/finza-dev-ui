import { ReactNode, Component, ErrorInfo } from 'react';
import { AuthProvider } from './context/AuthContext';
import {
  Navigate,
  createBrowserRouter,
  RouterProvider,
  useLocation
} from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import LoginView from './views/LoginView';
import DashboardView from './views/DashboardView';
import ErrorView from './views/ErrorView';
import PageNotFoundView from './views/PageNotFoundView';

interface AuthRouteGuardProps {
  children: ReactNode;
}


interface Props {
	children?: ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
	error?: Error;
}

export const urlMap = {
	root: '/',
	dashboard: '/dashboard',
  login: '/login'
};

class ErrorBoundary extends Component<Props, ErrorBoundaryState> {
	public state: ErrorBoundaryState = {
		hasError: false,
	};

	public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return { hasError: true, error };
	}

	public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error('Uncaught error:', error, errorInfo);
	}

	public render() {
		if (this.state.hasError) {
			return <ErrorView />;
		}

		return this.props.children;
	}
}

export const AuthRouteGuard = ({ children }: AuthRouteGuardProps) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={urlMap.login} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={urlMap.login} />,
  },
  {
    path: urlMap.login,
    element: <LoginView />,
    errorElement: <ErrorView />
  },
  {
    path: urlMap.dashboard,
    element:
      <AuthRouteGuard>
        <DashboardView />
      </AuthRouteGuard>,
      errorElement: <ErrorView />
  },
  {
		path: '/*',
		element: <PageNotFoundView />,
	},
])

function App() {
 
  return (
    <ErrorBoundary>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App
