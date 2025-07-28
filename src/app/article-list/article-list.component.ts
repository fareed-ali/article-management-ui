import { Component, OnInit, ViewChild  } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from '../models/article.list.model';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddArticleComponent } from '../add.article/add.article.component';
import { EditArticleComponent } from '../edit.article/edit.article.component';


@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})

export class ArticleListComponent implements OnInit  {

  @ViewChild(MatSort) sort!: MatSort;
  constructor(private articleService: ArticleService, private dialog: MatDialog) {}

   articleCategories = this.articleService.getArticleCategories();
  bicycleCategories = this.articleService.getBicycleCategories();


  displayedColumns: string[] = [
    'number',
    'name',
    'articleCategoryText',
    'bicycleCategoryText',
    'material',
    'netWeight',
    'actions'
  ];

  allArticles: Article[] = [];


articlesDataSource = new MatTableDataSource<Article>();
  ngOnInit(): void {

    this.articleCategories.push({ id: 0, name: 'All' }); // Default Selected for search filter
    this.fetchArticles();
  }

 fetchArticles() {
    this.articleService.getArticles().subscribe({
      next: (data) => {
        this.allArticles = data;
        this.articlesDataSource.data = data;
        this.articlesDataSource.sort = this.sort;
      },
      error: (ex) => {
        console.error('Failed to load articles:', ex);
      }
    });
  }


applyFilters(eventData: { articleCategoryId: number, bicycleCategoryIds: number[] }) {
  
    const { articleCategoryId, bicycleCategoryIds } = eventData;
    const filtered = this.allArticles.filter(article => {
      const matchesArticleCategory =
        articleCategoryId == 0 ? true : article.articleCategoryId === articleCategoryId;

      const matchesBicycleCategory =
        bicycleCategoryIds.length === 0 ? true : bicycleCategoryIds.includes(article.bicycleCategoryId);

      return matchesArticleCategory && matchesBicycleCategory;
    });

  this.articlesDataSource.data = filtered;
}
 

openAddDialog() {
  const dialogRef = this.dialog.open(AddArticleComponent, {
    width: '500px',
     data: {
       articleCategories: this.articleCategories,
       bicycleCategories: this.bicycleCategories
     }
  });
    dialogRef.afterClosed().subscribe((result) => {
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
        data: {
          article,
          articleCategories: this.articleCategories,
          bicycleCategories: this.bicycleCategories
        }
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) this.fetchArticles();
      });
    },
    error: (err) => console.error('Failed to fetch article:', err)
  });
}


}
