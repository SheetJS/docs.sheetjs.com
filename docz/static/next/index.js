import Head from 'next/head';

export default function Index() { return ( <div>
  <Head>
    <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>SheetJS Next.JS Demo</title>
    <style jsx>{`body, #app { height: 100%; };`}</style>
  </Head>
  <pre>
    <h3>SheetJS Next.JS Demo</h3>
    This demo reads from /sheetjs.xlsx<br/><br/>
    - <a href="/getStaticProps">getStaticProps</a><br/><br/>
    - <a href="/getServerSideProps">getServerSideProps</a><br/><br/>
    - <a href="/getStaticPaths">getStaticPaths</a><br/>
  </pre>
</div> ); }
