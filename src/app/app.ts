import { Component, signal } from '@angular/core';
import { MovieListComponent } from './components/movie-list/movie-list.component';

@Component({
  imports: [MovieListComponent],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
  standalone: true,
})
export class AppComponent {
  title = 'movie-catalog';
}
