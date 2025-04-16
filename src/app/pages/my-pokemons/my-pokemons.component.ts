import { Component, inject } from '@angular/core';
import { FavoriteService } from '../../services/favorite.service';
import { UserService } from '../../services/user.service';
import { PokemonsService } from '../../services/pokemons.service';
import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card.component';
import { Observable } from 'rxjs';
import { UserFavorite } from '../../models/user-favorite';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-my-pokemons',
  imports: [PokemonCardComponent],
  templateUrl: './my-pokemons.component.html',
  styleUrl: './my-pokemons.component.scss',
})
export class MyPokemonsComponent {
  private readonly userService = inject(UserService);
  private readonly userFavoriteService = inject(FavoriteService);
  public readonly pokemonService = inject(PokemonsService);

  public pokemonList: UserFavorite[] =
    this.userFavoriteService.getUserFavorites(
      this.userService.getUserLogged()!.email
    );

  onUserRm(pokemonId: string): void {
    const userEmail = this.userService.getUserLogged()!.email;
    this.userFavoriteService.removePokemonToFavorite(pokemonId, userEmail);

    this.pokemonList = this.userFavoriteService.getUserFavorites(userEmail);
  }
}
