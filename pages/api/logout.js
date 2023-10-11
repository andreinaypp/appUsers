import Cookies from 'cookies'

export default async function handler(req, res) {
  if (req.method == "GET") {
    const cookies = new Cookies(req, res)
    cookies.set('username')
    cookies.set('id')
    cookies.set('posts')
    cookies.set('albums')
    res.redirect("/")
  } else {
    res.redirect("/")
  }
}