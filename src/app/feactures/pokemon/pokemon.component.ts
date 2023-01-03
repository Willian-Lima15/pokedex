import { FormComponent } from './../components/form/form.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PokemonModel } from './../../shared/models/pokemon-model';
import { PokedexFirestoreService } from './../../core/services/pokedex-firestore.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {

  form!:FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    public dialogRef:MatDialogRef<FormComponent>,
    private pokedexService: PokedexFirestoreService,
    @Inject(MAT_DIALOG_DATA) private readonly pokemon:PokemonModel
  ) { }

  ngOnInit(): void {
    this.setForm();
  }

  setForm(){
    this.form = this.formBuilder.group({
      name:[this.pokemon.name,[Validators.required]],
      type:[this.pokemon.type,[Validators.required]],
      description:[this.pokemon.description,[Validators.required]],
      height:[this.pokemon.height,[Validators.required]],
      weight:[this.pokemon.weight,[Validators.required]],
      imgUrl:[this.pokemon.imgUrl,[Validators.required]]
    })
  }

  submit(){
    this.dialogRef.close({...this.pokemon,...this.form.value})
  }

}
