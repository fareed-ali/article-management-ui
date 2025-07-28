import { Component, OnInit, ViewChild  } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from '../models/article.list.model';
import { Item } from '../models/item.model';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CreateArticleDto } from '../models/article.create.model';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
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

   articleCategories = [
      { id: 0, name: 'All' },
      { id: 1, name: 'Hub' },
      { id: 2, name: 'Crank arm' }
    ];

  bicycleCategories = [
      { id: 1, name: 'e-City' },
      { id: 2, name: 'Road' },
      { id: 3, name: 'e-Trekking' },
      { id: 4, name: 'Gravel' },
      { id: 5, name: 'Foldable' }
    ];

 //articles: Article[] = [];
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



// Show all if no filters selected
  // if (articleCategoryId === 0 && bicycleCategoryIds.length === 0) {
  //   this.articlesDataSource.data = this.allArticles;
  //   return;
  // }


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

  // dialogRef.afterClosed().subscribe((result: CreateArticleDto) => {
  //   if (result) {
  //     this.articleService.createArticle(result).subscribe({
  //       next: (newArticle) => {
  //         this.fetchArticles(); // Reload data
  //       },
  //       error: (err) => console.error('Failed to create article:', err)
  //     });
  //   }
  // });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // The dialog already handles validation.
        // This block only runs if form was valid and dialog closed with article data.
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
