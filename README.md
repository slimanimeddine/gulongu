# Gulongu

**Project Description**: Gulongu is a web application that serves as a clone of the famous novels website [wuxiaworld](https://www.wuxiaworld.com/), but only contains novels written by the author [Gu Long](https://en.wikipedia.org/wiki/Gu_Long).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/slimanimeddine/gulongu.git
   ```

2. Install frontend dependencies:
   ```bash
   cd gulongu
   cd frontend
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd ../backend
   composer install
   ```

4. Seed database:
   ```bash
   php artisan db:seed --class=NovelsSeeder
   php artisan db:seed --class=BWSeeder
   php artisan db:seed --class=HBMSSeeder
   php artisan db:seed --class=HSNTSeeder
   php artisan db:seed --class=SKSeeder
   ```

5. Run database migrations:
   ```bash
   php artisan migrate
   ```

6. Ensure that your backend's `APP_URL` and `FRONTEND_URL` environment variables are set to these values:
   ```bash
   APP_URL=http://localhost:8000
   FRONTEND_URL=http://localhost:3000
   ```

7. Ensure that your frontend's env file is set like this:
   ```bash
   NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
   ```

## License

[MIT](https://choosealicense.com/licenses/mit/)