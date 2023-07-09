import { Author } from './globalFeed.response';

export interface FavoriteResponse {
  article: ArticleFavorite;
}

export interface ArticleFavorite {
  id: number;
  slug: string;
  title: string;
  description: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  authorId: number;
  tagList: string[];
  author: Author;
  favoritedBy: FavoritedBy[];
  favorited: boolean;
  favoritesCount: number;
}

export interface FavoritedBy {
  id: number;
  email: string;
  username: string;
  password: string;
  image: string;
  bio?: string;
  demo: boolean;
}
