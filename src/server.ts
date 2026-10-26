import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');
const app = express();
const angularApp = new AngularNodeAppEngine();
const tmdbApiUrl = process.env['TMDB_API_URL'] ?? 'https://api.themoviedb.org/3';

function queryString(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined;
}

app.get('/api/movies/:operation', async (req, res, next) => {
  const apiKey = process.env['TMDB_API_KEY'];
  if (!apiKey) {
    res.status(500).json({ error: 'TMDB_API_KEY no está configurada en el servidor.' });
    return;
  }

  const operation = req.params['operation'];
  if (operation !== 'popular' && operation !== 'search') {
    res.status(404).json({ error: 'Operación de películas no válida.' });
    return;
  }

  const page = Number.parseInt(queryString(req.query['page']) ?? '1', 10);
  if (!Number.isInteger(page) || page < 1) {
    res.status(400).json({ error: 'El parámetro page debe ser un entero positivo.' });
    return;
  }

  const query = queryString(req.query['query']);
  if (operation === 'search' && !query) {
    res.status(400).json({ error: 'El parámetro query es obligatorio para buscar.' });
    return;
  }

  const endpoint = operation === 'popular' ? '/movie/popular' : '/search/movie';
  const params = new URLSearchParams({
    api_key: apiKey,
    language: 'es-MX',
    page: page.toString(),
  });
  if (query) {
    params.set('query', query);
  }

  try {
    const response = await fetch(`${tmdbApiUrl}${endpoint}?${params}`);
    const body = await response.text();
    res.status(response.status).type('application/json').send(body);
  } catch (error) {
    next(error);
  }
});

app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

export const reqHandler = createNodeRequestHandler(app);
