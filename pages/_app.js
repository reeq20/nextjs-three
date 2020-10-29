import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div id={`Application`}>
      <Component {...pageProps}></Component>
    </div>
  );
}

export default MyApp;
