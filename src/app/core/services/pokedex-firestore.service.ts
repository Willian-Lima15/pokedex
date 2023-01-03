import { Injectable } from '@angular/core';

import {CollectionReference, DocumentData,addDoc , collection, deleteDoc, doc, updateDoc} from '@firebase/firestore';
import {Firestore, collectionData, docData} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { PokemonModel } from 'src/app/shared/models/pokemon-model';


@Injectable({
  providedIn: 'root'
})
export class PokedexFirestoreService {

  private pokemonCollection: CollectionReference<DocumentData>;

constructor(private readonly firestore: Firestore) {
  this.pokemonCollection = collection(this.firestore, 'pokemon');
 }

 getAll(){
  return collectionData(this.pokemonCollection, {
    idField:'id',
  }) as Observable<PokemonModel[]>;
 }

 get(id:string){
  const pokemonDocumentReference = doc(this.firestore,`pokemon/${id}`);
  return docData(pokemonDocumentReference, {idField:'id'})
 }

 create(pokemon: PokemonModel){
  return addDoc(this.pokemonCollection, pokemon);
 }

 update(pokemon:PokemonModel){
  const pokemonDocumentReference = doc(
    this.firestore, `pokemon/${pokemon.id}`
  );
  return updateDoc(pokemonDocumentReference,{...pokemon});
 }

 delete(id:string){
  const pokemonDocumentReference = doc(this.firestore, `pokemon/${id}`);
  return deleteDoc(pokemonDocumentReference);
 }

}
