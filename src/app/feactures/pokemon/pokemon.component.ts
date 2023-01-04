import { Observable, Subject } from 'rxjs';
import { FormComponent } from './../components/form/form.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PokemonModel } from './../../shared/models/pokemon-model';
import { PokedexFirestoreService } from './../../core/services/pokedex-firestore.service';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { tap,filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit, OnDestroy {
  pokemon$:Observable<PokemonModel[]>;
  destroyed$ = new Subject<void>();
  selectedPokemon:PokemonModel;

  constructor(
    private pokedexService:PokedexFirestoreService,
    private dialog:MatDialog
  ) { }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

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
      .pipe(filter(Boolean),tap((res:any)=> this.pokedexService.create(res)),
      takeUntil(this.destroyed$)
      )
      .subscribe();
  }

  updatePokemon(){
    const dialogRef = this.dialog.open(FormComponent, {
      data:{...this.selectedPokemon},
      width:'40%',
    });
    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((res:any) => this.pokedexService.update(res)),
        tap((res) => this.selectPokemon(res)),
        takeUntil(this.destroyed$)
      )
      .subscribe();
  }

  selectPokemon(pokemon: PokemonModel){
    this.selectedPokemon = pokemon;
  }

  deletePokemon(){
    this.pokedexService.delete(this.selectedPokemon.id);
  }

}
