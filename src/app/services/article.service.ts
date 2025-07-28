import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Article } from '../models/article.list.model';
import { CreateArticleDto } from '../models/article.create.model';
import { UpdateArticleDto } from '../models/article.update.model';
import { Item } from '../models/item.model';
import { ArticleDetail } from '../models/article.detail.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private baseAddress = 'http://localhost:5132/api/articles';

  constructor(private http: HttpClient) { }

getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.baseAddress);
  }


createArticle(article: CreateArticleDto): Observable<Article> {
    return this.http.post<Article>(this.baseAddress, article);
  }

  updateArticle(id: number, article: UpdateArticleDto): Observable<void> {
    return this.http.put<void>(`${this.baseAddress}/${id}`, article);
  }

  getArticle(id: number): Observable<ArticleDetail> {
  return this.http.get<ArticleDetail>(`${this.baseAddress}/${id}`);
}

//Point: No need to use observable for categories as they are static
// TODO: later to be moved in endpoint
getArticleCategories(): Item[] {
  return [
    { id: 1, name: 'Hub' },
    { id: 2, name: 'Crank arm' }
  ];
}

getBicycleCategories(): Item[] {
  return [
    { id: 1, name: 'e-City' },
    { id: 2, name: 'Road' },
    { id: 3, name: 'e-Trekking' },
    { id: 4, name: 'Gravel' },
    { id: 5, name: 'Foldable' }
  ];
}

}
