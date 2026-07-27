import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CheckCircle2, AlertCircle, MessageCircle, ExternalLink } from 'lucide-react';
import { getLandingPageBySlug } from '../data/landingPages';
import { waLink } from '../utils/whatsapp';
import InformacoesNavbar from '../components/landing/InformacoesNavbar';
import Footer from '../components/Footer';
import NotFound from './NotFound';

const SITE_URL = 'https://doctorchatbot.com.br';

const InformacoesLandingPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const page = getLandingPageBySlug(slug);

  if (!page) return <NotFound />;

  const canonical = `${SITE_URL}/informacoes/${page.slug}`;
  const waHref = `https://wa.me/5531991666106?text=${encodeURIComponent(page.whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{page.seo.title}</title>
        <meta name="description" content={page.seo.description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={page.seo.title} />
        <meta property="og:description" content={page.seo.description} />
        <meta property="og:url" content={canonical} />
        {page.heroImage && <meta property="og:image" content={`${SITE_URL}${page.heroImage}`} />}
        <meta name="robots" content="index,follow" />
      </Helmet>

      <InformacoesNavbar />

      <main>
        {/* Hero */}
        <section
          className="relative bg-slate-900 text-white"
          style={
            page.heroImage
              ? {
                  backgroundImage: `linear-gradient(to bottom, rgba(15,23,42,0.75), rgba(15,23,42,0.9)), url(${page.heroImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }
              : undefined
          }
        >
          {!page.heroImage && (
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900" />
          )}
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <span className="inline-block bg-sky-500/20 border border-sky-400/40 text-sky-300 text-xs font-semibold tracking-wide uppercase px-3 py-1 rounded-full mb-5">
              {page.niche} · {page.stateUf}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">{page.headline}</h1>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-8">{page.subheadline}</p>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <MessageCircle size={18} />
              Quero ver na prática
            </a>
          </div>
        </section>

        {/* Intro */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <p className="text-slate-600 text-lg leading-relaxed">{page.introParagraph}</p>
        </section>

        {/* Pain points */}
        <section className="bg-slate-50 py-14">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
              O que trava a agenda de clínicas médicas {page.stateIn}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {page.painPoints.map((item) => (
                <div key={item.title} className="bg-white rounded-xl p-6 border border-slate-200">
                  <AlertCircle className="text-amber-500 mb-3" size={22} />
                  <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-14">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Como o DoctorChatBot resolve</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {page.benefits.map((item) => (
                <div key={item.title} className="rounded-xl p-6 border border-sky-100 bg-sky-50">
                  <CheckCircle2 className="text-sky-500 mb-3" size={22} />
                  <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partner block — só nas páginas piloto, ver CLAUDE.md */}
        {page.partner && (
          <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
            <div className="border border-slate-200 rounded-xl p-6 flex items-start gap-4">
              <ExternalLink className="text-slate-400 flex-shrink-0 mt-1" size={20} />
              <p className="text-slate-500 text-sm leading-relaxed">
                {page.partner.description}{' '}
                <a
                  href={page.partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-600 hover:text-sky-700 underline font-medium"
                >
                  {page.partner.name}
                </a>
              </p>
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="bg-slate-50 py-14">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Perguntas frequentes</h2>
            <div className="space-y-4">
              {page.faq.map((item) => (
                <div key={item.question} className="bg-white rounded-xl p-5 border border-slate-200">
                  <h3 className="font-semibold text-slate-900 mb-2">{item.question}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="py-16 text-center px-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Pronto para automatizar a agenda da sua clínica {page.stateIn}?
          </h2>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            <MessageCircle size={18} />
            Falar no WhatsApp agora
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default InformacoesLandingPage;
