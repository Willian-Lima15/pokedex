import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PokedexFirestoreService } from 'src/app/core/services/pokedex-firestore.service';
import { PokemonModel } from 'src/app/shared/models/pokemon-model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  form!:FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    public dialogRef:MatDialogRef<FormComponent>,
    private pokedexService: PokedexFirestoreService,
    @Inject(MAT_DIALOG_DATA) private readonly pokemon:PokemonModel
  ) { }

  ngOnInit() {
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
