
# # Undo Migrations and seeders
npx dotenv sequelize db:seed:undo:all
npx dotenv sequelize db:migrate:undo:all

# Migrations and seeders
npx dotenv sequelize db:migrate
npx dotenv sequelize db:seed:all
