import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ArticleService } from '../services/article.service';
import { Item } from '../models/item.model';
import { UpdateArticleDto } from '../models/article.update.model';

@Component({
  selector: 'edit-article',
  templateUrl: './edit.article.component.html',
  styleUrls: ['./edit.article.component.css']
})

export class EditArticleComponent implements OnInit {
  articleForm!: FormGroup;
  formErrors: { [key: string]: string[] } = {};
    articleCategories = this.articleService.getArticleCategories();
  bicycleCategories = this.articleService.getBicycleCategories();

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private dialogRef: MatDialogRef<EditArticleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ) {}

  ngOnInit(): void {
    // this.articleForm = this.fb.group({
    //   number: [this.data.article.number],
    //   name: [this.data.article.name, Validators.required],
    //   material: [this.data.article.material],
    //   netWeight: [this.data.article.netWeight],
    //   length: [this.data.article.length],
    //   width: [this.data.article.width],
    //   height: [this.data.article.height],
    //   articleCategoryId: [this.data.article.articleCategoryId, Validators.required],
    //   bicycleCategoryId: [this.data.article.bicycleCategoryId, Validators.required],
    // });
    this.articleCategories = this.articleService.getArticleCategories();
    this.bicycleCategories = this.articleService.getBicycleCategories();
    this.showArticle(this.data.id);
  }

 showArticle(id: number): void {
  this.articleService.getArticle(id).subscribe({
    next: (article) => {
      this.articleForm = this.fb.group({
        number: [article.number],
        name: [article.name, Validators.required],
        material: [article.material],
        netWeight: [article.netWeight],
        length: [article.length],
        width: [article.width],
        height: [article.height],
        articleCategoryId: [article.articleCategoryId, Validators.required],
        bicycleCategoryId: [article.bicycleCategoryId, Validators.required],
      });
    },
    error: (err) => {
      console.error('Failed to load article:', err);
    }
  });
}

  save(): void {
    if (this.articleForm.valid) {
      this.articleService.updateArticle(this.articleForm.value.number, this.articleForm.value).subscribe({
        next: () => this.dialogRef.close(true),
        error: (error) => {
          if (error.status === 400 && typeof error.error === 'object') {
            this.formErrors = error.error;
          } else {
            console.error('Unexpected error:', error);
          }
        }
      });
    } else {
      this.articleForm.markAllAsTouched();
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }

  getErrorMessages(field: string): string[] {
    return this.formErrors[field] || [];
  }
}