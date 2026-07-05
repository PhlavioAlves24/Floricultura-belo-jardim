import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import heroImg from "@/assets/hero-bouquet.jpg";
import catFlores from "@/assets/cat-flores.jpg";
import catBuques from "@/assets/cat-buques.jpg";
import catPlantas from "@/assets/cat-plantas.jpg";
import catBonsais from "@/assets/cat-bonsais.jpg";
import catPresentes from "@/assets/cat-presentes.jpg";
import cultivarImg from "@/assets/cultivar.jpg";
import g1 from "@/assets/g1.jpg";
import g2 from "@/assets/g2.jpg";
import g3 from "@/assets/g3.jpg";
import g4 from "@/assets/g4.jpg";
import g5 from "@/assets/g5.jpg";
import g6 from "@/assets/g6.jpg";
import ocAniversario from "@/assets/oc-aniversario.jpg";
import ocNamoro from "@/assets/oc-namoro.jpg";
import ocCasamento from "@/assets/oc-casamento.jpg";
import ocMaes from "@/assets/oc-maes.jpg";
import ocCondolencias from "@/assets/oc-condolencias.jpg";
import ocDecoracao from "@/assets/oc-decoracao.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { property: "og:image", content: "https://id-preview--9e85612f-cb7a-49ab-92a2-a5f304dd7e8e.lovable.app/og.jpg" },
    ],
  }),
  component: Index,
});

// Placeholder — troque pelo número real (formato internacional, só dígitos)
const WHATSAPP_NUMBER = "5581973146238";
const wa = (msg: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

const CATEGORIES = [
  { name: "Flores", img: catFlores, msg: "Olá! Tenho interesse em Flores." },
  { name: "Buquês", img: catBuques, msg: "Olá! Tenho interesse em Buquês." },
  { name: "Plantas", img: catPlantas, msg: "Olá! Tenho interesse em Plantas." },
  { name: "Bonsais", img: catBonsais, msg: "Olá! Tenho interesse em Bonsais." },
  { name: "Presentes", img: catPresentes, msg: "Olá! Tenho interesse em Presentes." },
];

const OCCASIONS = [
  { title: "Aniversários", desc: "Buquês que marcam o dia.", img: ocAniversario },
  { title: "Pedidos de namoro", desc: "O gesto que muda tudo.", img: ocNamoro },
  { title: "Casamentos", desc: "Arranjos para um dia inesquecível.", img: ocCasamento },
  { title: "Dia das Mães", desc: "Um carinho que floresce.", img: ocMaes },
  { title: "Condolências", desc: "Palavras que as flores dizem.", img: ocCondolencias },
  { title: "Decoração", desc: "Beleza viva para sua casa.", img: ocDecoracao },
];

const GALLERY = [
  { src: g1, alt: "Rosas cor-de-rosa", h: "h-[420px]" },
  { src: g2, alt: "Bonsai na janela", h: "h-[300px]" },
  { src: g3, alt: "Arranjo de casamento", h: "h-[480px]" },
  { src: g4, alt: "Buquê de girassóis", h: "h-[340px]" },
  { src: g5, alt: "Suculentas em vasos", h: "h-[400px]" },
  { src: g6, alt: "Rosas vermelhas", h: "h-[340px]" },
];

const FAQS = [
  {
    q: "E se as flores não chegarem como esperado?",
    a: "Trabalhamos com flores frescas e produtos cuidadosamente preparados. Se algo não sair como esperado, fale com a gente pelo WhatsApp — vamos ouvir seu caso e buscar a melhor solução possível.",
  },
  {
    q: "Vocês fazem entrega no mesmo dia?",
    a: "Sim, para pedidos feitos com antecedência mínima no dia. Confirme a disponibilidade pelo WhatsApp com seu bairro e horário desejado.",
  },
  {
    q: "É possível personalizar arranjos e buquês?",
    a: "Totalmente. Conte a ocasião, cores preferidas e valor que gostaria de investir — montamos algo único para você.",
  },
  {
    q: "Como faço pedidos corporativos ou para eventos?",
    a: "Atendemos casamentos, aniversários e ambientações. Fale conosco pelo WhatsApp para orçamento personalizado.",
  },
];

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("reveal-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Index() {
  useReveal();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (dir: 1 | -1) => {
    const el = carouselRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="absolute top-0 left-0 right-0 z-30">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <a href="#top" className="font-display text-2xl tracking-wide text-primary">
            Encanto <span className="text-accent">·</span> Floricultura
          </a>
          <nav className="hidden gap-8 text-sm tracking-wide md:flex">
            <a href="#produtos" className="hover:text-accent">Produtos</a>
            <a href="#momentos" className="hover:text-accent">Momentos</a>
            <a href="#cultivar" className="hover:text-accent">Cultivar</a>
            <a href="#galeria" className="hover:text-accent">Galeria</a>
            <a href="#faq" className="hover:text-accent">FAQ</a>
          </nav>
          <a
            href={wa("Olá! Vim pelo site e gostaria de fazer um pedido.")}
            target="_blank"
            rel="noreferrer"
            className="hidden btn-whats btn-whats-hover md:inline-flex text-sm !py-2.5 !px-5"
          >
            WhatsApp
          </a>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2 md:gap-16">
          <div className="reveal">
            <p className="mb-6 text-xs uppercase tracking-[0.3em] text-accent">
              Floricultura artesanal
            </p>
            <h1 className="font-display text-5xl leading-[1.05] text-primary md:text-7xl">
              Flores que transformam momentos em memórias inesquecíveis.
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Arranjos, plantas e bonsais selecionados para surpreender quem
              você ama em qualquer ocasião.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={wa("Olá! Quero fazer um pedido especial.")}
                target="_blank"
                rel="noreferrer"
                className="btn-whats btn-whats-hover"
              >
                Peça pelo WhatsApp
              </a>
              <a
                href="#produtos"
                className="text-sm tracking-wide text-primary underline-offset-4 hover:underline"
              >
                Ver produtos ↓
              </a>
            </div>
          </div>

          <div className="reveal relative">
            <div className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-[color:var(--terracotta-soft)] md:h-40 md:w-40" />
            <img
              src={heroImg}
              alt="Buquê de rosas cor-de-rosa com eucalipto"
              width={1600}
              height={1280}
              className="relative aspect-[4/5] w-full rounded-sm object-cover shadow-[0_30px_80px_-40px_rgba(43,43,43,0.35)]"
            />
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="produtos" className="border-t border-border/60 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="reveal mb-16 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.3em] text-accent">Catálogo</p>
              <h2 className="font-display text-4xl text-primary md:text-6xl">Nossos Produtos</h2>
            </div>
            <p className="max-w-sm text-muted-foreground">
              Cada categoria é preparada com carinho e enviada com o mesmo
              cuidado que teria em nossas mãos.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5 md:gap-6">
            {CATEGORIES.map((c) => (
              <a
                key={c.name}
                href={wa(c.msg)}
                target="_blank"
                rel="noreferrer"
                className="reveal group block"
              >
                <div className="relative aspect-square overflow-hidden bg-secondary">
                  <img
                    src={c.img}
                    alt={c.name}
                    loading="lazy"
                    width={900}
                    height={900}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <h3 className="mt-5 font-display text-xl tracking-[0.15em] uppercase text-primary md:text-2xl">
                  {c.name}
                </h3>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Occasions */}
      <section id="momentos" className="border-t border-border/60 bg-secondary/50 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="reveal mb-12 flex items-end justify-between gap-6">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.3em] text-accent">Ocasiões</p>
              <h2 className="font-display text-4xl text-primary md:text-6xl">
                Para Cada Momento Especial
              </h2>
            </div>
            <div className="hidden gap-2 md:flex">
              <button
                onClick={() => scrollCarousel(-1)}
                aria-label="Anterior"
                className="grid h-11 w-11 place-items-center rounded-full border border-border text-primary transition hover:bg-primary hover:text-primary-foreground"
              >
                ←
              </button>
              <button
                onClick={() => scrollCarousel(1)}
                aria-label="Próximo"
                className="grid h-11 w-11 place-items-center rounded-full border border-border text-primary transition hover:bg-primary hover:text-primary-foreground"
              >
                →
              </button>
            </div>
          </div>

          <div
            ref={carouselRef}
            className="no-scrollbar -mx-6 flex snap-x snap-mandatory scroll-px-6 gap-5 overflow-x-auto px-6 pb-4"
          >
            {OCCASIONS.map((o, i) => (
              <a
                key={o.title}
                href={wa(`Olá! Gostaria de flores para ${o.title.toLowerCase()}.`)}
                target="_blank"
                rel="noreferrer"
                className="reveal group relative flex min-w-[75%] snap-start flex-col justify-end overflow-hidden rounded-sm bg-card p-8 shadow-[0_10px_40px_-20px_rgba(43,43,43,0.2)] md:min-w-[32%]"
                style={{ minHeight: "360px" }}
              >
                <div
                  className="absolute inset-0 bg-gradient-to-br opacity-90 transition-opacity group-hover:opacity-100"
                  style={{
                    background:
                      i % 2 === 0
                        ? "linear-gradient(160deg, var(--cream), color-mix(in oklab, var(--terracotta) 22%, var(--cream)))"
                        : "linear-gradient(160deg, var(--cream), color-mix(in oklab, var(--botanical) 22%, var(--cream)))",
                  }}
                />
                <div className="relative">
                  <span className="text-xs uppercase tracking-[0.3em] text-accent">
                    0{i + 1}
                  </span>
                  <h3 className="mt-3 font-display text-3xl text-primary md:text-4xl">
                    {o.title}
                  </h3>
                  <p className="mt-3 text-sm text-graphite/80">{o.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Cultivar (público 40+) */}
      <section id="cultivar" className="border-t border-border/60 py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 md:grid-cols-2 md:gap-20">
          <div className="reveal order-2 md:order-1">
            <img
              src={cultivarImg}
              alt="Especialista cuidando de bonsais e plantas em ambiente doméstico"
              loading="lazy"
              width={1400}
              height={1000}
              className="aspect-[4/3] w-full rounded-sm object-cover"
            />
          </div>
          <div className="reveal order-1 md:order-2">
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-accent">
              Bonsais & Plantas
            </p>
            <h2 className="font-display text-4xl leading-tight text-primary md:text-5xl">
              Para Quem Ama Cultivar
            </h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-graphite/85">
              <p>
                Bonsais e plantas selecionados com cuidado para quem transforma
                a casa e o jardim em um espaço vivo. Orientação personalizada
                na escolha e nos cuidados de cada espécie.
              </p>
              <p className="text-muted-foreground">
                Trabalhamos com espécies aclimatadas, mudas saudáveis e
                acompanhamento pós-venda. Se você está começando ou já tem uma
                coleção, conversamos sobre luz, rega, poda e substrato ideal
                para cada planta.
              </p>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Espécies aclimatadas
              </div>
              <div className="flex items-center gap-2 text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Orientação de cuidados
              </div>
              <div className="flex items-center gap-2 text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Acompanhamento pós-venda
              </div>
            </div>
            <a
              href={wa("Olá! Gostaria de falar com um especialista sobre bonsais e plantas.")}
              target="_blank"
              rel="noreferrer"
              className="btn-whats btn-whats-hover mt-10"
            >
              Fale com um especialista pelo WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Why */}
      <section
        className="border-t border-border/60 py-24 md:py-28"
        style={{ backgroundColor: "var(--terracotta-soft)" }}
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="reveal mb-16 text-center">
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-accent">Compromisso</p>
            <h2 className="font-display text-4xl text-primary md:text-5xl">
              Por Que Escolher Nossa Floricultura
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-14">
            {[
              {
                icon: "❋",
                title: "Frescor selecionado",
                text: "Flores e plantas frescas, cuidadosamente selecionadas.",
              },
              {
                icon: "❦",
                title: "Atendimento próximo",
                text: "Atendimento personalizado para cada momento especial.",
              },
              {
                icon: "✿",
                title: "Entrega com carinho",
                text: "Entrega com carinho, pontualidade e segurança.",
              },
            ].map((f) => (
              <div key={f.title} className="reveal text-center">
                <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full bg-primary text-2xl text-primary-foreground">
                  {f.icon}
                </div>
                <h3 className="font-display text-2xl text-primary">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-graphite/80">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="galeria" className="border-t border-border/60 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="reveal mb-14 text-center">
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-accent">Portfólio</p>
            <h2 className="font-display text-4xl text-primary md:text-6xl">
              Galeria de Inspiração
            </h2>
          </div>
          <div className="columns-2 gap-5 md:columns-3 [&>*]:mb-5">
            {GALLERY.map((g) => (
              <button
                key={g.alt}
                onClick={() => setLightbox(g.src)}
                className="reveal group block w-full overflow-hidden rounded-sm bg-secondary"
              >
                <img
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  className={`w-full ${g.h} object-cover transition-transform duration-700 group-hover:scale-105`}
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-border/60 py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6">
          <div className="reveal mb-14 text-center">
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-accent">Dúvidas</p>
            <h2 className="font-display text-4xl text-primary md:text-5xl">
              Perguntas Frequentes
            </h2>
          </div>

          <div className="divide-y divide-border">
            {FAQS.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q} className="reveal">
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="font-display text-xl text-primary md:text-2xl">
                      {f.q}
                    </span>
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-accent text-accent transition-transform ${
                        open ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={`grid overflow-hidden transition-all duration-300 ${
                      open ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"
                    }`}
                  >
                    <p className="min-h-0 text-base leading-relaxed text-muted-foreground">
                      {f.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 pb-24">
        <div
          className="reveal mx-auto max-w-6xl overflow-hidden rounded-sm px-8 py-20 text-center md:py-28"
          style={{ backgroundColor: "var(--botanical)" }}
        >
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-[color:var(--cream)]/70">
            Vamos conversar
          </p>
          <h2 className="mx-auto max-w-3xl font-display text-4xl leading-tight text-[color:var(--cream)] md:text-6xl">
            Transformamos sentimentos em presentes que emocionam e permanecem
            na memória.
          </h2>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
            <a
              href={wa("Olá! Quero fazer um pedido pelo site.")}
              target="_blank"
              rel="noreferrer"
              className="btn-whats btn-whats-hover !text-base !py-4 !px-8"
            >
              Peça pelo WhatsApp
            </a>
            <a
              href="#produtos"
              className="text-sm tracking-[0.15em] uppercase text-[color:var(--cream)] underline-offset-4 hover:underline"
            >
              Conheça nossos produtos
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/60 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted-foreground md:flex-row">
          <p className="font-display text-lg text-primary">Encanto Floricultura</p>
          <p>© {new Date().getFullYear()} — Feito com carinho.</p>
        </div>
      </footer>

      {/* Mobile sticky WhatsApp */}
      <a
        href={wa("Olá! Quero fazer um pedido.")}
        target="_blank"
        rel="noreferrer"
        className="btn-whats btn-whats-hover fixed bottom-4 left-4 right-4 z-40 md:hidden !py-4 shadow-2xl"
      >
        Peça pelo WhatsApp
      </a>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6 animate-[reveal-up_0.25s_ease-out]"
        >
          <img
            src={lightbox}
            alt=""
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
          <button
            aria-label="Fechar"
            className="absolute right-6 top-6 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white backdrop-blur"
          >
            ✕
          </button>
        </div>
      )}
    </main>
  );
}
