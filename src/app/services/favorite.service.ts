import { Injectable } from '@angular/core';
import { UserFavorite } from '../models/user-favorite';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private readonly USER_KEY = 'FAVORITE';
  private _usersFavorites: UserFavorite[] = [];

  constructor() {
    const userFavString = localStorage.getItem(this.USER_KEY);
    if (userFavString) {
      this._usersFavorites = JSON.parse(userFavString);
    }
  }

  public addPokemonToFavorite(userFav: UserFavorite) {
    this._usersFavorites.push(userFav);
    localStorage.setItem(this.USER_KEY, JSON.stringify(this._usersFavorites));
  }

  public removePokemonToFavorite(pokemonId: string, userEmail: string) {
    this._usersFavorites = this._usersFavorites.filter(
      (userFav) =>
        userFav.userEmail !== userEmail || userFav.pokemonId !== pokemonId
    );

    localStorage.setItem(this.USER_KEY, JSON.stringify(this._usersFavorites));
  }

  public getUserFavorites(userEmail: string) {
    return this._usersFavorites.filter(
      (userFav) => userFav.userEmail === userEmail
    );
  }
}
