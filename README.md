# Article Management System

This project is a full-stack application built with Angular (frontend) and ASP.NET Core Web API (backend) for managing bicycle article parts. It supports creating, reading, updating, and filtering articles with pagination.


# Tech Stack

Frontend :
This project has generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.0.

- Angular 15+
- Angular Material (UI components)
- RxJS
- TypeScript
- CSS

Backend :

- ASP.NET Core Web API (.NET 6/7)
- Entity Framework Core
- AutoMapper
- SQLite - please use 
- Swagger for API documentation

# Features
- List all articles 
- Filter articles by Article Category and Bicycle Category
- Sort articles ny Net Weight and Article Category
- Add, view, and update article
- API and form validations
- Responsive Angular Material UI
- RESTful API 
- Seed test data in SQLLight DB


# Setup Instructions
 
 1. Clone the both front-end and backend repos

    front-end: [Clone the Repo](https://github.com/fareed-ali/article-management-ui.git)

    Back-end:  [Clone the Repo](https://github.com/fareed-ali/article-management-api.git)

2. Backend Setup (.NET Core API)
   - Either run and open solution with visual studio in debug mode
   - Or by Command
        `cd Article_Management_API`
        `dotnet restore`
        `dotnet ef database update`  # Applies migrations
        `dotnet run`

    - The SQLLight Database will be created for the first time on application start.
    - Use SQlLight DB Browser to open database if needed (https://sqlitebrowser.org/)
    - On successfull build and run you can view swagger documentation. 
    - The API will be available at `https://localhost:5001/swagger/index.html` , `http://localhost:5132/swagger/index.html` (or specified port)

3. Frontend Setup (Angular)
    - After cloning reporsitory
    - Open in any code editor or visual code.
    - open terminal and run below command
      `cd article-management-ui`
      `npm install`
    - Run command `ng update` if required for missing dependencies 
    - Navigate to `environments/environment.ts` and update the value of `apiBaseUrl` with running backend API address  
    - Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.   

# Endpoints
- GET	/api/articles	List articles with filters & pagination
- GET	/api/articles/{id}	Get article by ID
- POST	/api/articles	Create new article
- PUT	/api/articles/{id}	Update existing article

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
