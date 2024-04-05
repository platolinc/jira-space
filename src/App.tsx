import React from 'react';
import './App.css';
// import { ProjectListScreen } from 'screens/project-list';
import { useAuth } from 'context/auth-context';
import AuthenticatedApp from 'authenticated-app';
import UnauthenticatedApp from 'unauthenticated-app';
import { FullPageErrorFallback } from 'components/lib';
import { ErrorBoundary } from 'components/error-boundary';

function App() {
  const {user} = useAuth()
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
