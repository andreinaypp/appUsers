import Head from "next/head";
import Header from "./Header";

export default function Layout(props, { children }) {
  return (
    <>
      <Head>
        <title>App Prueba</title>
      </Head>
      <Header username={props.username}/>
    </>
  );
}