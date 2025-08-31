import { Routes } from '@angular/router';
import { CharacterListComponent } from './characters/character-list/character-list.component';
import { CharacterDetailComponent } from './characters/character-detail/character-detail.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/characters',
        pathMatch: 'full'
    },
    {
        path:'characters',
        component: CharacterListComponent
    },
    {
        path:'characters/:id',
        component: CharacterDetailComponent
    }

];
