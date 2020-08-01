import client from './apollo';
import * as utils from './utils';

const user = "nikodermus"

fetch(
    'https://api.github.com/graphql',
    {
        method: 'POST',
        headers: {
            authorization: "Bearer 71980d60c8fd5c5e0234704da1d414b342ce9782"
        },
        body: JSON.stringify(
            {
                query: `
                    query (
                        $user: String!
                    ) {
                        user(login: $user ){
                            bio
                            company
                        }
                    }
                `,
                variables:{
                    user: user
                }
            }
        )
    }
)
