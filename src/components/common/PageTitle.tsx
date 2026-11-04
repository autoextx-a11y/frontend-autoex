/** Patterned title band used at the top of every inner page. */
export function PageTitle({ title }: { title: string }) {
  return (
    <section className="bg-page-title mb-8 py-12">
      <div className="container-site">
        <h1 className="animate-fade-up text-center text-xl font-bold uppercase tracking-wide text-ink sm:text-[2rem]">
          {title}
        </h1>
      </div>
    </section>
  );
}
