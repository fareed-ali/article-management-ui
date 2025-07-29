import { Component, OnInit, ViewChild } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from '../models/article.list.model';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddArticleComponent } from '../add.article/add.article.component';
import { EditArticleComponent } from '../edit.article/edit.article.component';
import { SearchComponent } from '../search/search.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css'],
})
export class ArticleListComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(SearchComponent) searchComponent!: SearchComponent;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private articleService: ArticleService,
    private dialog: MatDialog
  ) {}


  displayedColumns: string[] = [
    'number',
    'name',
    'articleCategoryText',
    'bicycleCategoryText',
    'material',
    'netWeight',
    'actions',
  ];
  allArticles: Article[] = [];
  articlesDataSource = new MatTableDataSource<Article>();
  totalItems = 0;
  pageSize = 5;
  pageNumber = 0;

  // Store current filter selections
  selectedArticleCategoryId: number = 0;
  selectedBicycleCategoryIds: number[] = [];

  ngOnInit(): void {
   // this.articleCategories.push({ id: 0, name: 'All' }); // Default Selected for search filter
    this.fetchArticles();
  }

  fetchArticles() {
    this.articleService
      .getArticles(
        this.pageNumber,
        this.pageSize,
        this.selectedArticleCategoryId,
        this.selectedBicycleCategoryIds
      )
      .subscribe({
        next: (data) => {
          this.articlesDataSource.data = data.items;
          this.totalItems = data.totalCount;
          this.pageSize = data.pageSize;
          this.articlesDataSource.sort = this.sort;
        },
        error: (ex) => {
          console.error('Failed to load articles:', ex);
        },
      });
  }

  applyFilters(eventData: {
    articleCategoryId: number;
    bicycleCategoryIds: number[];
  }) {
    this.selectedArticleCategoryId = eventData.articleCategoryId;
    this.selectedBicycleCategoryIds = eventData.bicycleCategoryIds;
    this.pageNumber = 0;
    this.paginator.firstPage();
    this.fetchArticles();
  }

  resetFilter(): void {
    this.searchComponent.resetFilter();
    this.selectedArticleCategoryId = 0;
    this.selectedBicycleCategoryIds = [];
    this.pageNumber = 0;
    this.fetchArticles();
  }

  handlePageEvent(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex;
    this.fetchArticles();
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddArticleComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.resetFilter();
      if (result) {
        this.fetchArticles();
      }
    });
  }

  openEditDialog(id: number) {
    this.articleService.getArticle(id).subscribe({
      next: (article) => {
        const dialogRef = this.dialog.open(EditArticleComponent, {
          width: '500px',
          data: { id },
        });

        dialogRef.afterClosed().subscribe((result) => {
          this.resetFilter();
          if (result) this.fetchArticles();
        });
      },
      error: (err) => console.error('Failed to fetch article:', err),
    });
  }
}
