import { ListPokemonComponent } from './../components/list-pokemon/list-pokemon.component';
import { PokedexFirestoreService } from './../../core/services/pokedex-firestore.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonRoutingModule } from './pokemon-routing.module';
import { PokemonComponent } from './pokemon.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormComponent } from '../components/form/form.component';


@NgModule({
  declarations: [
    PokemonComponent,
    FormComponent,
    ListPokemonComponent
  ],
  imports: [
    CommonModule,
    PokemonRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatDialogModule,
    MatCardModule
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
    PokedexFirestoreService
 ],

})
export class PokemonModule { }
