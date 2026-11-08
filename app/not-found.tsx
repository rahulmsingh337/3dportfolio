import Link from "next/link";

export default function NotFound() {
  return (
    <section className="nf">
      <div className="wrap nf-in">
        <p className="eyebrow">Error 404</p>
        <h1 className="display nf-h">This page has been <em className="grad">remediated</em> out of existence.</h1>
        <p className="lede">The link may be old, or the address mistyped. The good news: the core is intact.</p>
        <Link href="/" className="btn btn-primary">Back to the portfolio</Link>
      </div>
    </section>
  );
}
