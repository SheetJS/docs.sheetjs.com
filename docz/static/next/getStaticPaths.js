import Head from 'next/head';
import Link from "next/link";
import { readFile, set_fs, utils } from 'xlsx';
import { join } from 'path';
import { cwd } from 'process';

export default function Index({type, snames}) { return ( <div>
  <Head>
    <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>{`SheetJS Next.JS ${type} Demo`}</title>
    <style jsx>{`body, #app { height: 100%; };`}</style>
  </Head>
  <pre>
    <h3>{`SheetJS Next.JS ${type} Demo`}</h3>
    This demo reads from /sheetjs.xlsx<br/><br/>
    Each worksheet maps to a path:<br/><br/>
    <ul>
{snames.map((sname, idx) => (<li key={idx}>
  <Link href="/sheets/[id]" as={`/sheets/${idx}`}><a>{`Sheet index=${idx} name="${sname}"`}</a></Link>
</li>))}
    </ul>
  </pre>
</div> ); }

export async function getStaticProps() {
  set_fs(await import("fs"));
  const wb = readFile(join(cwd(), "sheetjs.xlsx"))
  return {
    props: {
      type: "getStaticPaths",
      snames: wb.SheetNames,
    },
  }
}
