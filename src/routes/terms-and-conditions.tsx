import { createFileRoute } from "@tanstack/react-router";
import { PageTitle } from "@/components/common/PageTitle";
import terms from "@/data/terms.json";

type Block = { t: "h" | "p"; x: string } | { t: "ul"; x: string[] };

export const Route = createFileRoute("/terms-and-conditions")({
  head: () => ({
    meta: [
      { title: "Terms and Conditions | AutoEx" },
      { name: "description", content: "AutoEx website Terms and Conditions of Use." },
      { property: "og:title", content: "Terms and Conditions | AutoEx" },
      { property: "og:description", content: "AutoEx website Terms and Conditions of Use." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <>
      <PageTitle title="Terms and Conditions" />
      <article className="container-site max-w-5xl space-y-4 pb-16 leading-relaxed">
        {(terms as Block[]).map((b, i) =>
          b.t === "h" ? (
            <h2 key={i} className="pt-4 font-display text-xl font-bold">
              {b.x}
            </h2>
          ) : b.t === "ul" ? (
            <ul key={i} className="bullet-list space-y-1.5">
              {b.x.map((li) => (
                <li key={li}>{li}</li>
              ))}
            </ul>
          ) : (
            <p key={i}>{b.x}</p>
          ),
        )}
      </article>
    </>
  );
}
