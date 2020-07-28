import {ApolloClient, InMemoryCache} from "@apollo/client";
import {WebSocketLink} from "apollo-link-ws";

/*const client = new ApolloClient({
    uri: 'https://todos-graphql-v2.herokuapp.com/v1/graphql',
    cache: new InMemoryCache()
});*/

const client = new ApolloClient({
    link: new WebSocketLink({
        uri: 'wss://todos-graphql-v2.herokuapp.com/v1/graphql',
        options: {
            reconnect: true
        }
    }),
    cache: new InMemoryCache()
})

export default client;
