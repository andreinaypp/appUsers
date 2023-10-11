import Cookies from 'cookies'
const { createHash } = require('node:crypto');

export default async function handler(req, res) {
  if (req.method == "POST") {
    const username = req.body['email']
    const guess = req.body['password']

    const api = await fetch('https://jsonplaceholder.typicode.com/users');
    const allUsers = await api.json();

    const users = allUsers.map(({ id, email }) => ({
      id: `${id}`,
      nick: `${email}`,
      Password: '5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5'
    }
    ));

    const index = users.findIndex(
      (user) => user.nick === username
    )

    if (index === -1) {
      res.redirect("/login?msg=Incorrect username or password");
      return;
    }

    const user = users[index]
    const guess_hash = createHash('sha256').update(guess).digest('hex');

    if (guess_hash == user.Password) {
      const cookies = new Cookies(req, res)
      cookies.set('id', user.id)
      cookies.set('username', username)
      cookies.set('posts', '0')
      cookies.set('albums', '0')
      res.redirect("/")
    } else {
      res.redirect("/login?msg=Incorrect username or password")
    }
  } else {
    res.redirect("/")
  }
}