import Layout from "../../components/Layout";
import { hasUsername } from '../../utils/helpers';
import { getCookie, setCookie } from 'cookies-next';

export async function getServerSideProps(context) {
  const { username } = hasUsername(context)
  const albumsCookie = getCookie('albums', { req: context.req, res: context.res });
  setCookie('albums', parseInt(albumsCookie) + 1, { req: context.req, res: context.res })

  if (username === '') {
    return {
      redirect: {
        permanent: false,
        destination: "/"
      }
    }
  }

  const resp = await fetch(`https://jsonplaceholder.typicode.com/albums/${context.params.id}/photos`)
  const data = await resp.json()
  const urls = [
    `https://jsonplaceholder.typicode.com/albums/${context.params.id}`,
    `https://jsonplaceholder.typicode.com/albums/${context.params.id}/photos`
  ]
  const apiAll = await Promise.all(urls.map(e => fetch(e)))
  const [album, photos ]  = await Promise.all(apiAll.map(e => e.json()))

  return { props: { album, photos, username } };
}

export default function Album({ album, photos, username }) {
  return (<>
    <Layout username={username}/>
    <div className="m-4">
      <h1 className="text-center text-3xl pb-4">Album: {album.title}</h1>
      <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
        {photos.map((photo) => (
          <li key={photo.url} className="relative">
            <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
              <img src={photo.url} alt="" className="object-cover pointer-events-none group-hover:opacity-75" />
            </div>
            <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">{photo.title}</p>
          </li>
        ))}
      </ul>
    </div>
  </>)
}