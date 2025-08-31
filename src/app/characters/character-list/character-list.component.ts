import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../character.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CharacterFilterComponent } from '../character-filter/character-filter.component';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports:[
    RouterModule,
    CommonModule,
    CharacterFilterComponent
  ],
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {
  characters: any[] = [];
  filteredCharacters: any[] = [];

  filters = {
    movie: '',
    species: '',
    birthYearMin: null,
    birthYearMax: null
  };

  constructor(private characterService: CharacterService) {}

  ngOnInit() {
  this.characterService.getAllCharacters().subscribe(res => {
    this.characters = res.results;
    console.log("this.characters::", this.characters);
    this.characters.forEach(char => {
      if (char.species.length) {
        Promise.all(char.species.map((url: string) => 
          this.characterService.getResource(url).toPromise()
        )).then(speciesData => {
          char.speciesNames = speciesData.map(s => s.name);
        });
      } else {
        char.speciesNames = [];
      }

      if (char.films.length) {
        Promise.all(char.films.map((url: string) => 
          this.characterService.getResource(url).toPromise()
        )).then(filmData => {
          char.filmNames = filmData.map(f => f.title);
        });
      } else {
        char.filmNames = [];
      }
    });

    this.filteredCharacters = this.characters;
  });
}

applyFilters(filters: any) {
  this.filters = filters;
  this.filteredCharacters = this.characters.filter(c => {
    let pass = true;

    if (filters.movie && c.filmNames?.length) {
      pass = pass && c.filmNames.some((title: string) =>
        title.toLowerCase().includes(filters.movie.toLowerCase())
      );
    }

    if (filters.species && c.speciesNames?.length) {
      pass = pass && c.speciesNames.some((name: string) =>
        name.toLowerCase().includes(filters.species.toLowerCase())
      );
    }

    if (filters.birthYearMin || filters.birthYearMax) {
      if (c.birth_year && c.birth_year !== 'unknown') {
        const year = this.parseBirthYear(c.birth_year);

        if (filters.birthYearMin) pass = pass && year >= filters.birthYearMin;
        if (filters.birthYearMax) pass = pass && year <= filters.birthYearMax;
      } else {
        pass = false;
      }
    }

    return pass;
  });
}

parseBirthYear(birthYear: string): number {
  if (birthYear.endsWith('BBY')) {
    return parseFloat(birthYear.replace('BBY', '').trim());
  } else if (birthYear.endsWith('ABY')) {
    return -parseFloat(birthYear.replace('ABY', '').trim());
  }
  return 0;
}

}
