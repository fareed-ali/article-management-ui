export interface CreateArticleDto {
  name: string;
  material: string;
  netWeight: number;
  length: number;
  width: number;
  height: number;
  articleCategoryId: number;
  bicycleCategoryId: number;
}