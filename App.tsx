import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Navigator from "./navigation/Navigator";

export default function App() {
	return (
		<QueryClientProvider client={new QueryClient()}>
			<Navigator />
		</QueryClientProvider>
	);
}
