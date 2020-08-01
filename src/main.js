import client from './apollo';
import * as utils from './utils';
import gql from 'graphql-tag';

client.query({
    query: gql`
       query {
            viewer{
                login
                avatarUrl(size: 80)
                contributionsCollection {
                    totalCommitContributions
                    totalIssueContributions
                    totalRepositoryContributions
                    totalPullRequestContributions
                }
            }
        }
    `
}).then(
    ({data})=>{
        const {
            login,
            avatarUrl,
            contributionsCollection
        } = data.viewer;

        const userElem = document.querySelector('figure.user');

        userElem.querySelector('h2').innerText = login;
        userElem.querySelector('img').setAttribute('src', avatarUrl)
        userElem.querySelector('small span').innerText= utils.createMojo(contributionsCollection)
    }
);

const NODES = {
    form: null,
}

const getUserByForm = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const {data} = await client.query(
        {
            query: gql`
               query ($user: String!) {
                    user(login: $user) {
                        login
                        avatarUrl(size: 80)
                        contributionsCollection {
                        totalCommitContributions
                        totalIssueContributions
                        totalRepositoryContributions
                        totalPullRequestContributions
                        }
                    }
                    }
            `,
            variables: {
                user: formData.get('user')
            }
        }
    )

    console.log(data);
}

document.addEventListener('DOMContentLoaded', () => {
    NODES.form = document.querySelector('form');
    NODES.form.addEventListener('submit', getUserByForm)
})

