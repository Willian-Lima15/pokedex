import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { PokemonModel } from 'src/app/shared/models/pokemon-model';

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
  styleUrls: ['./list-pokemon.component.css']
})
export class ListPokemonComponent implements OnInit {

  @Input() pokemon$:Observable<PokemonModel[]>
  @Output() pokemonEmitter = new EventEmitter<PokemonModel>()

  constructor() { }

  ngOnInit() {
  }

  selectPokemon(pokemon: PokemonModel){
    this.pokemonEmitter.emit(pokemon)
  }

}
