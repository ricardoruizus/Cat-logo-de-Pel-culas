# Catalogo-de-Peliculas

Plataforma interactiva de catálogo de películas que consume datos en tiempo real desde una API externa. Permite a los usuarios descubrir estrenos, buscar títulos específicos, filtrar por género o popularidad y consultar fichas técnicas detalladas (sinopsis, reparto, calificación y fecha de lanzamiento) a través de una interfaz rápida y adaptable a cualquier dispositivo.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.1.8.

## Development server

The TMDB API key is read only by the server. It must not be placed in Angular
environment files, committed to Git, or exposed in browser code.

Create a local `.env` file from `.env.example` and set `TMDB_API_KEY`:

```bash
cp .env.example .env
```

Or provide it directly in the shell:

```bash
TMDB_API_KEY=your_key npm start
```

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful schematics for generating components, directives, services, and more:

```bash
ng generate component component-name
```

For a complete list of available schematics, run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute the unit tests with the Vitest test runner, use:

```bash
ng test
```

## Running end-to-end tests

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional resources

For more information about Angular CLI, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli).
