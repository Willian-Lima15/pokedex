import { Observable } from 'rxjs';
import { FormComponent } from './../components/form/form.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PokemonModel } from './../../shared/models/pokemon-model';
import { PokedexFirestoreService } from './../../core/services/pokedex-firestore.service';
import { Component, Inject, OnInit } from '@angular/core';
import { tap,filter } from 'rxjs/operators';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
  pokemon$:Observable<PokemonModel[]>;
  selectedPokemon:PokemonModel;

  constructor(
    private pokedexService:PokedexFirestoreService,
    private dialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.pokemon$ = this.pokedexService.getAll();
  }

  addPokemon(){
    const dialogRef = this.dialog.open(FormComponent, {
      data:{},
      width:'40%',
    });

    dialogRef
      .afterClosed()
      .pipe(filter(Boolean),tap((res:any)=> this.pokedexService.create(res))
      )
      .subscribe();
  }

  update(){
    const dialogRef = this.dialog.open(FormComponent, {
      data:{...this.selectedPokemon},
      width:'40%',
    });
    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((res:any) => this.pokedexService.update(res)),
        tap((res) => this.selectPokemon(res))
      )
      .subscribe();
  }

  selectPokemon(pokemon: PokemonModel){
    this.selectedPokemon = pokemon;
  }



}
