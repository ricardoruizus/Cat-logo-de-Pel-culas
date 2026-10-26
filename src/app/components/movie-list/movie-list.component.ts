import { ChangeDetectorRef, Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent implements OnInit {
    private readonly movieService = inject(MovieService);
    private readonly cdr = inject(ChangeDetectorRef);
    private readonly platformId = inject(PLATFORM_ID);

    movies: Movie[] = [];
    searchQuery: string = '';
    loading: boolean = false;
    imageBaseUrl: string = environment.imageBaseUrl;

    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.loadPopularMovies();
        }
    }

    loadPopularMovies(): void {
        this.loading = true;
        this.movieService.getPopularMovies().subscribe({
            next: (response) => {
                this.movies = response.results;
                this.loading = false;
                this.cdr.detectChanges();
            },
            error: (error) => {
                console.error('Error al cargar las películas populares:', error);
                this.loading = false;
                this.cdr.detectChanges();
            }
        });
    }

    onSearch(): void {
        const query = this.searchQuery.trim();
        if(!query){
            this.loadPopularMovies();
            return;
        }

        this.loading = true;
        this.movieService.searchMovies(query).subscribe({
            next: (response) => {
                this.movies = response.results;
                this.loading = false;
                this.cdr.detectChanges();
            },
            error: (error) => {
                console.error('Error al buscar películas:', error);
                this.loading = false;
                this.cdr.detectChanges();
            }
        });
    }
}
