import Link from "next/link"
import Layout from "../components/Layout"
import { hasUsername } from '../utils/helpers';

export default function Home({username, posts, albums, postsNumber, albumsNumber}) {
  return (
    <>
      <Layout username={username} />
      <div className="pt-6 pb-16 sm:pb-24">
        <div className="text-center">
          {username ?
            <div>
              <p className='text-3xl text-indigo-400'>Hi {username}</p>
              <div className='grid grid-cols-2 gap-4 mt-4'>
                <div>
                  <p className="text-center mt-3 text-3xl">Posts List</p>
                  <ul className="mt-4 list-disc list-inside pl-2">
                    {posts.map((post) => (
                      <li key={post.id} className="hover:text-indigo-400" >
                        <Link href="/posts/[id]/" as={`/posts/${post.id}`}>{post.title}</Link>
                      </li>
                    ))}
                  </ul>
                  <p className="text-2xl text-green-900 mt-2">Visited posts: {postsNumber}</p>
                </div>
                <div>
                  <p className="text-center mt-3 text-3xl">Albums List</p>
                  <ul className="mt-4 list-disc list-inside pl-2">
                    {albums.map((album) => (
                      <li key={album.id} className="hover:text-indigo-400" >
                        <Link href="/albums/[id]/" as={`/albums/${album.id}`}>{album.title}</Link>
                      </li>
                    ))}
                  </ul>
                  <p className="text-2xl text-green-900 mt-2">Visited albums: {albumsNumber}</p>
                </div>
              </div>
            </div>: 
            <div>
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Welcome!!!</span>
              </h1>

              <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                <div className="rounded-md shadow">
                  <Link
                    href="/login"
                    className="w-full flex items-center justify-center px-8 py-1 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:text-lg"
                  >
                    Login
                  </Link>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const { username, id, postsNumber, albumsNumber } = hasUsername(context)
  const urls = [
    `https://jsonplaceholder.typicode.com/posts?userId=${id}`,
    `https://jsonplaceholder.typicode.com/albums?userId=${id}`,
  ]
  const apiAll = await Promise.all(urls.map(e => fetch(e)))
  const [posts, albums ]  = await Promise.all(apiAll.map(e => e.json()))

  return {
    props: {
      username,
      posts,
      albums,
      postsNumber,
      albumsNumber,
    }
  };
};