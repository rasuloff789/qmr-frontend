// apolloClient.js
import {
	ApolloClient,
	InMemoryCache,
	HttpLink,
	from,
	ApolloLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

const httpLink = new HttpLink({
	uri: "http://localhost:4000/graphql",
	credentials: "include",
});

// Request logging link
const requestLoggingLink = new ApolloLink((operation, forward) => {
	console.log(`🚀 GraphQL Request: ${operation.operationName}`);
	console.log(`📝 Variables:`, operation.variables);
	console.log(`📋 Query:`, operation.query.loc?.source?.body);
	console.log(`🔗 Context:`, operation.getContext());
	return forward(operation);
});

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem("authentification"); // "Bearer <token>"
	return {
		headers: {
			...headers,
			authorization: token ? token : "",
			"Content-Type": "application/json",
		},
	};
});

// Error handling link
const errorLink = onError(
	({ graphQLErrors, networkError, operation, forward }) => {
		if (graphQLErrors) {
			graphQLErrors.forEach(({ message, locations, path }) => {
				console.error(
					`GraphQL error: Message: ${message}, Location: ${locations}, Path: ${path}`
				);
			});
		}

		if (networkError) {
			console.error(`Network error: ${networkError}`);
			console.error(`Operation: ${operation.operationName}`);
			console.error(`Variables:`, operation.variables);
		}
	}
);

const client = new ApolloClient({
	link: from([requestLoggingLink, authLink, errorLink, httpLink]),
	cache: new InMemoryCache(),
	defaultOptions: {
		watchQuery: {
			errorPolicy: "all",
		},
		mutate: {
			errorPolicy: "all",
		},
	},
});

export default client;
