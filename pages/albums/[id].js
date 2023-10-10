import Layout from "../../components/Layout";

export async function getStaticPaths() {
  const res = await fetch('https://jsonplaceholder.typicode.com/albums');
  const albums = await res.json();

  const paths = albums.map(({ id }) => ({ params: { id: `${id}` } }));
  return { paths, fallback: false };
}


export async function getStaticProps({ params }) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/albums/${params.id}/photos`)
  const data = await res.json()

  return { props: { data } }
}

export default function Album({ data }) {
  if (typeof window !== 'undefined') {
    localStorage.setItem("key", parseInt(localStorage.getItem('key')) + 1);
  }
  return (<>
    <Layout />
    <div className="m-4">
      <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
        {data.map((photo) => (
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