import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
    <Helmet>
      <title>Página não encontrada | DoctorChatBot</title>
      <meta name="robots" content="noindex,nofollow" />
    </Helmet>
    <h1 className="text-3xl font-bold text-slate-900 mb-3">Página não encontrada</h1>
    <p className="text-slate-500 mb-6">O endereço que você acessou não existe ou foi removido.</p>
    <Link to="/" className="text-sky-500 hover:text-sky-600 font-medium">
      Voltar para a página inicial
    </Link>
  </div>
);

export default NotFound;
