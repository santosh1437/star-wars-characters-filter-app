import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-character-filter',
  standalone: true,
  imports:[
    FormsModule
  ],
  templateUrl: './character-filter.component.html',
  styleUrls: ['./character-filter.component.css']
})
export class CharacterFilterComponent {
  filters = {
    movie: '',
    species: '',
    birthYearMin: null,
    birthYearMax: null
  };

  @Output() filterChange = new EventEmitter<any>();

  apply() {
    this.filterChange.emit(this.filters);
  }
}
