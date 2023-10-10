import Layout from "../../components/Layout";

export async function getStaticPaths() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await res.json();

  const paths = posts.map(({ id }) => ({ params: { id: `${id}` } }));
  return { paths, fallback: false };
}


export async function getStaticProps({ params }) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}/comments`)
  const data = await res.json()

  return { props: { data } }
}

export default function Post({ data }) {
  if (typeof window !== 'undefined') {
    localStorage.setItem("key", parseInt(localStorage.getItem('key')) + 1);
  }
  return (
    <>
      <Layout />
      <ul className="p-4">
        {data.map((comments) => (
          <li>
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