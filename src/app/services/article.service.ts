import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Article } from '../models/article.list.model';
import { CreateArticleDto } from '../models/article.create.model';
import { UpdateArticleDto } from '../models/article.update.model';
import { Item } from '../models/item.model';
import { ArticleDetail } from '../models/article.detail.model';
 import { environment } from 'src/environments/environment';
import { PagedResult } from '../models/paged.result.model';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private readonly baseAddress = `${environment.apiBaseUrl}/articles`;

  constructor(private http: HttpClient) {}

  getArticles(
    pageNumber: number,
    pageSize: number,
    articleCategoryId?: number,
    bicycleCategoryIds?: number[]
  ): Observable<PagedResult<Article>> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    if (articleCategoryId !== undefined && articleCategoryId !== 0) {
      params = params.set('articleCategoryId', articleCategoryId.toString());
    }

    if (bicycleCategoryIds && bicycleCategoryIds.length > 0) {
      bicycleCategoryIds.forEach((id) => {
        params = params.append('bicycleCategoryIds', id.toString());
      });
    }
    return this.http.get<PagedResult<Article>>(this.baseAddress, { params });
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
      { id: 2, name: 'Crank arm' },
    ];
  }

  getBicycleCategories(): Item[] {
    return [
      { id: 1, name: 'e-City' },
      { id: 2, name: 'Road' },
      { id: 3, name: 'e-Trekking' },
      { id: 4, name: 'Gravel' },
      { id: 5, name: 'Foldable' },
    ];
  }
}
