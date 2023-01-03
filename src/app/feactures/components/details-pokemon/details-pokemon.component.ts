import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PokemonModule } from '../../pokemon/pokemon.module';


@Component({
  selector: 'app-details-pokemon',
  templateUrl: './details-pokemon.component.html',
  styleUrls: ['./details-pokemon.component.css']
})
export class DetailsPokemonComponent implements OnInit {

  @Input() pokemon: PokemonModule;
  @Output() updatePokemon = new EventEmitter<void>();
  @Output() deletePokemon = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  update(){
    this.updatePokemon.emit();
  }

  delete(){
    this.deletePokemon.emit();
  }

}
