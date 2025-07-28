import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../models/article.list.model';
import { CreateArticleDto } from '../models/article.create.model';
import { UpdateArticleDto } from '../models/article.update.model';

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

  getArticle(id: number): Observable<UpdateArticleDto> {
  return this.http.get<UpdateArticleDto>(`${this.baseAddress}/${id}`);
}

}
