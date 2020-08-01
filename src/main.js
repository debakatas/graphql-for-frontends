import client from './apollo';
import * as utils from './utils';
import gql from 'graphql-tag';

import GetViewer from '../graphql/GetViewer.gql';
import GetUser from '../graphql/GetUser.gql';

const NODES = {
    form: null,
    list: null,
    cleanerButton: null,
    searchedUser: null,
    currentUser: null,
};

const createGithubUser = ({ login,
    avatarUrl,
    contributionsCollection }, userElement, doMojo = false) => {

    const mojo = utils.createMojo(contributionsCollection);

    userElement.querySelector('h2').innerText = login;
    userElement.querySelector('img').setAttribute('src', avatarUrl);
    userElement.querySelector('small span').innerText = mojo;

    if (doMojo) utils.runMojo(mojo);
    userElement.style.setProperty('display', 'flex');
};

const createRepositories = (repositories) => {
    NODES.list.innerHTML = repositories.map(
        ({ name, languages, stargazers, url, description }) => `
    <li>
        <article>
            <h3>
                <a
                    href="${url}"
                >
                    ${name}
                </a>
            </h3>
            <i> ${stargazers.totalCount} <span>☆</span> </i>
            <p>
                ${description}
            </p>
            <ul>
                ${languages.nodes.map(({ name }) => `
                    <li class="${name.toLowerCase()}">${name}</li>
                `).join("\n")}
            </ul>
        </article>
    </li>
        `
    ).join('\n');
};

const getUserByForm = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const { data } = await client.query(
        {
            query: GetUser,
            variables: {
                user: formData.get('user')
            }
        }
    );

    createGithubUser(data.user, NODES.searchedUser, true);

    createRepositories(data.user.repositories.nodes);

};

const cleanUser = () => {
    NODES.list.innerHTML = "";
    NODES.searchedUser.style.setProperty('display', 'none');
};

const getCurrentUser = async () => {
    const { data } = await client.query({
        query: GetViewer
    });

    createGithubUser(data.viewer, NODES.currentUser);
};


document.addEventListener('DOMContentLoaded', () => {
    NODES.form = document.querySelector('form');
    NODES.list = document.querySelector('ul');
    NODES.cleanerButton = document.querySelector('button[type=button]');
    NODES.searchedUser = document.querySelector('figure.searched-user');
    NODES.currentUser = document.querySelector('figure.user');

    NODES.form.addEventListener('submit', getUserByForm);
    NODES.cleanerButton.addEventListener('click', cleanUser);
});

getCurrentUser();

