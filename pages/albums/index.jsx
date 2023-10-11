import Link from "next/link"
import Layout from "../../components/Layout"

export async function getStaticProps() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/albums`)
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

export default function Albums({ data, username }) {
  return (
    <>
      <Layout username={username} />
      <div>
        <p className="text-center mt-3 text-3xl">Albums List</p>
        <ul className="mt-4 list-disc list-inside pl-2">
          {data.map((album) => (
            <li key={album.id} className="hover:text-indigo-400" >
              <Link href="/albums/[id]" as={`/albums/${album.id}`}>{album.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

