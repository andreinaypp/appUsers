import { getCookie } from 'cookies-next';

export const hasUsername = ({ req, res }) => {
  let username = getCookie('username', { req, res });
  let id = getCookie('id', { req, res });
  let postsNumber = getCookie('posts', { req, res });
  let albumsNumber = getCookie('albums', { req, res });

  if (username === undefined)
    return { username: '', id: '', postsNumber: '', albumsNumber: '' };
  else
    return { username, id, postsNumber, albumsNumber }
}
