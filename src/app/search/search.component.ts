import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'search-article',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent  implements OnInit {

    @Output() searchEmitter = new EventEmitter<{ articleCategoryId: number, bicycleCategoryIds: number[]}>();

  selectedArticleCategory: number = 0;
  selectedBicycleCategories: number[] = [];

      articleCategories = this.articleService.getArticleCategories();
   bicycleCategories = this.articleService.getBicycleCategories();

    constructor(
       private articleService: ArticleService
     ) {}

ngOnInit(): void {
  this.articleCategories.unshift({ id: 0, name: 'All' }); // Default Selected for search filter
    this.selectedArticleCategory=0;
  }


    onSearch() : void {
     this.searchEmitter.emit({ articleCategoryId: this.selectedArticleCategory, bicycleCategoryIds: this.selectedBicycleCategories });
  }

resetFilter(): void {
  this.selectedArticleCategory = 0;
  this.selectedBicycleCategories = [];
  this.onSearch(); 
}

}
