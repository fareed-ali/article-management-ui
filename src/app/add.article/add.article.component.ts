import { Component, OnInit } from '@angular/core';
import { CreateArticleDto } from '../models/article.create.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Item } from '../models/item.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from '../services/article.service';


@Component({
  selector: 'add-article',
  templateUrl: './add.article.component.html',
  styleUrls: ['./add.article.component.css']
})

export class AddArticleComponent implements OnInit {

  articleForm!: FormGroup;
  formErrors: { [key: string]: string[] } = {};
  articleCategories = this.articleService.getArticleCategories();
  bicycleCategories = this.articleService.getBicycleCategories();

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    public dialogRef: MatDialogRef<AddArticleComponent>,
  ) {}

  
  ngOnInit(): void {
    this.articleForm = this.fb.group({
      name: ['', Validators.required],
      material: [''],
      netWeight: [0],
      length: [0],
      width: [0],
      height: [0],
      articleCategoryId: [null, Validators.required],
      bicycleCategoryId: [null, Validators.required],
    });
  }

  save(): void {
    if (this.articleForm.valid) {

console.log('Submitting article:', this.articleForm.value);

      this.articleService.createArticle(this.articleForm.value).subscribe({
        next: (result) => this.dialogRef.close(result),
        error: (error) => {
          if (error.status === 400 && typeof error.error === 'object') {
            this.formErrors = error.error;


          } else {
            console.error('Unexpected error:', error);
          }
        }
      });
    } else {
      this.articleForm.markAllAsTouched(); // mark for UI feedback
    }
  }

cancel(): void {
    this.dialogRef.close();
  }

  getErrorMessages(field: string): string[] {

    
    return this.formErrors[field] || [];
  }

}
