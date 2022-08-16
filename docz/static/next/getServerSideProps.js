import Head from 'next/head';
import { readFile, set_fs, utils } from 'xlsx';
import { join } from 'path';
import { cwd } from 'process';

export default function Index({type, html}) { return ( <div>
  <Head>
    <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>{`SheetJS Next.JS ${type} Demo`}</title>
    <style jsx>{`body, #app { height: 100%; };`}</style>
  </Head>
  <pre>
    <h3>{`SheetJS Next.JS ${type} Demo`}</h3>
    This demo reads from /sheetjs.xlsx<br/><br/>
    It generates HTML from the first sheet.<br/><br/>
    <div dangerouslySetInnerHTML={{ __html: html }} />
  </pre>
</div> ); }

export async function getServerSideProps() {
  set_fs(await import("fs"));
  const wb = readFile(join(cwd(), "sheetjs.xlsx"))
  return {
    props: {
      type: "getServerSideProps",
      html: utils.sheet_to_html(wb.Sheets[wb.SheetNames[0]]),
    },
  }
}
