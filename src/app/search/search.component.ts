import { Component, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'search-article',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent  implements OnInit {

    @Output() searchEmitter = new EventEmitter<{ articleCategoryId: number, bicycleCategoryIds: number[]}>();

  selectedArticleCategory: number = 0;
  selectedBicycleCategories: number[] = [];

  // TODO: Can be fetch from endpoint
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


ngOnInit(): void {
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
