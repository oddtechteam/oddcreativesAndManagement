import { oddtech } from "@/lib/oddtech";

// The /oddtech pages have moved to OddTech's own domain. This is a static
// export (no server redirects), so app/layout.tsx redirects with JS before
// first paint; the meta refresh and link cover visitors without JS.
export default function RedirectToOddTech({ path = "/" }: { path?: string }) {
  const to = oddtech.url + path;
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4 text-center">
      <meta httpEquiv="refresh" content={`0; url=${to}`} />
      <p>
        OddTech has moved to <a href={to} className="underline">{oddtech.url.replace(/^https?:\/\//, "")}</a>.
      </p>
    </main>
  );
}
