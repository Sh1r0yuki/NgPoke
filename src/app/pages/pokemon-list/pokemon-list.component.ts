import { Component, inject } from '@angular/core';
import { PokemonsService } from '../../services/pokemons.service';
import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card.component';
import { AsyncPipe } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, switchMap } from 'rxjs';
import {
  PokemonLink,
  PokemonListDto,
} from '../../models/pokemon-list-dto.interface';
import { FavoriteService } from '../../services/favorite.service';
import { UserService } from '../../services/user.service';
import { UserFavorite } from '../../models/user-favorite';

@Component({
  selector: 'app-pokemon-list',
  imports: [PokemonCardComponent, AsyncPipe, MatPaginatorModule],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss',
})
export class PokemonListComponent {
  private readonly pokemonService = inject(PokemonsService);
  private readonly favoriteService = inject(FavoriteService);
  private readonly userService = inject(UserService);

  public readonly paginatorClicked$ = new BehaviorSubject<string | undefined>(
    undefined
  );

  public pokemonList$ = this.paginatorClicked$.pipe(
    switchMap((value) => this.pokemonService.getList(value))
  );

  public userFav!: UserFavorite[];
  public isOnUserFav = (pokemonName: string) =>
    this.userFav.findIndex((pokemon) => pokemonName === pokemon.pokemonName) >
    -1;

  ngOnInit(): void {
    const userEmail = this.userService.getUserLogged()!.email;
    this.userFav = this.favoriteService.getUserFavorites(userEmail);
  }

  onPageChange(e: PageEvent, next?: string, previous?: string) {
    if (!e.previousPageIndex || e.previousPageIndex! < e.pageIndex) {
      this.paginatorClicked$.next(next);
    } else {
      this.paginatorClicked$.next(previous);
    }
  }

  onUserAdd(pokemon: PokemonLink): void {
    const userEmail = this.userService.getUserLogged()!.email;
    const pokemonId = this.pokemonService.getIdFromUrl(pokemon.url);
    if (this.isOnUserFav(pokemon.name)) {
      this.favoriteService.removePokemonToFavorite(pokemonId, userEmail);
    } else {
      this.favoriteService.addPokemonToFavorite({
        pokemonId,
        userEmail,
        pokemonName: pokemon.name,
        detailUrl: pokemon.url,
      });
    }

    this.userFav = this.favoriteService.getUserFavorites(userEmail);
  }
}
