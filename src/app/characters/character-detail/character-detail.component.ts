import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharacterService } from '../character.service';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})
export class CharacterDetailComponent implements OnInit {
  character: any;
  species: string[] = [];
  movies: string[] = [];
  starships: string[] = [];
  vehicles: string[] = [];

  constructor(
    private route: ActivatedRoute, 
    private characterService: CharacterService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.characterService.getCharacter(+id).subscribe(char => {
        this.character = char;

        forkJoin([
          ...char.species.map((url: string) => this.characterService.getResource(url)),
          ...char.films.map((url: string) => this.characterService.getResource(url)),
          ...char.starships.map((url: string) => this.characterService.getResource(url)),
          ...char.vehicles.map((url: string) => this.characterService.getResource(url))
        ]).subscribe((res: any[]) => {
          let index = 0;

          this.species = res.slice(index, index + char.species.length).map(s => s.name);
          index += char.species.length;

          this.movies = res.slice(index, index + char.films.length).map(f => f.title);
          index += char.films.length;

          this.starships = res.slice(index, index + char.starships.length).map(s => s.name);
          index += char.starships.length;

          this.vehicles = res.slice(index, index + char.vehicles.length).map(v => v.name);
        });
      });
    }
  }
}
