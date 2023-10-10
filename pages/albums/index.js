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

export default function Albums({ data }) {
  return (
    <>
      <Layout />
      <div className="grid grid-cols-2 gap-4 mt-4">
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
        <div>
          <p className="text-center mt-3 text-3xl">My albums</p>
          <button
            type="button"
            className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            My Albums
          </button>
        </div>
      </div>
    </>
  )
}

