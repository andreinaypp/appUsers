import Link from "next/link"
import Layout from "../../components/Layout"

export async function getStaticProps() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`)
  const data = await res.json()

  if (!data) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: { data },
    revalidate: 1,
  }
}

export default function Posts({ data }) {
  return (
    <>
      <Layout />
      <div>
        <p className="text-center mt-3 text-3xl">Posts List</p>
        <ul className="mt-4 list-disc list-inside pl-2">
          {data.map((post) => (
            <li key={post.id} className="hover:text-indigo-400" >
              <Link href="/posts/[id]/" as={`/posts/${post.id}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

