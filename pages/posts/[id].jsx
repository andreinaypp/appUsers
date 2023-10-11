import Layout from "../../components/Layout";
import { hasUsername } from '../../utils/helpers';
import { getCookie, setCookie } from 'cookies-next';

export async function getServerSideProps(context) {
  const { username } = hasUsername(context)
  const posts = getCookie('posts', { req: context.req, res: context.res });
  setCookie('posts', parseInt(posts)+1, { req: context.req, res: context.res })


  if (username === '') {
    return {
      redirect: {
        permanent: false,
        destination: "/"
      }
    }
  }

  const resp = await fetch(`https://jsonplaceholder.typicode.com/posts/${context.params.id}/comments`)
  const data = await resp.json()

  return { props: { data, username } };
}

export default function Post({ data, username }) {
  return (
    <>
      <Layout username={username}/>
      <ul className="p-4">
        {data.map((comments) => (
          <li key={comments.id}>
            <div className="relative pb-8">
              <div className="relative flex items-start">
                <div className="min-w-0 flex-1">
                  <div>
                    <p className="font-bold">{comments.name}</p>
                    <p className="text-sm text-gray-400">{comments.email}</p>
                    <p>{comments.body}</p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}