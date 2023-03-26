import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './useAuth';
import { SettingsProvider } from './useSettings';

const queryClient = new QueryClient();

const AppProvider: React.FCWC = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <SettingsProvider>
      <AuthProvider>{children}</AuthProvider>
    </SettingsProvider>
  </QueryClientProvider>
);

export default AppProvider;
