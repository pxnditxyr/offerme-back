# Offer Me 🌟 | Nest 🦁, GraphQL 🌐 & Prisma 📐 Back-end

The Discount Management System is a Nest.js-based backend solution that serves as the core engine for a web application focused on discounts. Its primary function is to provide business logic and data access for managing promotions, discount codes, and user and company authentication. The application utilizes GraphQL as a query interface to interact with the backend and Prisma as the ORM for database management, ensuring flexibility and efficiency in serving discount-related data and functionality to both users and businesses.

## Prerequisites 📋

Make sure you have the following programs installed before getting started:

- [Bun 🧄](https://bun.sh/) (version 1.0.3)
- [Docker 🐳](https://www.docker.com/) (if using a containerized database)

Or

- [Node.js 🐦](https://nodejs.org/) (version 20.X.X)
- [npm 📦](https://www.npmjs.com/) (version 10.X.X)

## Installation 🛠️

1. Clone the repository: 🧬

```bash
git clone https://github.com/pxnditxyr/offerme-back.git
```

2. Navigate to the project directory: 📂

```bash
cd offerme-back
```

3. Install dependencies:

```bash
bun i
```
4. 🚧 Fixing Bcrypt and Bun Incompatibility 🧩
Due to the incompatibility between bcrypt and bun, you should perform the following two commands in order to resolve this issue:

```bash
npm i bcrypt
```

followed by

```bash
rm package-lock.json
```

## Configuration ⚙️

### Environment Variables

1. Copy the example environment file to create you `.env` file: 🔑

```bash
cp .env.example .env
```

2. Update the `.env` file with your configuration values.

### Database 🗄️

1. If you're using a containerized database, you can use Docker Compose to start it: 🐋

```bash
docker compose up -d
```

2. Then, run Prisma migrations: 🔄

```bash
bunx prisma db push
```
### Other considerations 📋

1. In your database, you must record the roles accepted by your system, and the name of each role must be written 📝 in the same way in the file: 
./src/auth/enums/valid-roles.enum.ts 📂

## Usage 🚀

Run the application in Development Mode: 🚀

```bash
bun start:dev
```

The application will be available at `http://localhost:3001/graphql` 🌐.
You could also click on the latest log in your terminal with "bun start:dev" if you prefer to do it that way 🌐.

Finally you could run the seed mutation in the GraphQL link to have some essential data to start working

## Technologies Used 🛠️

- [NestJS 🦁](https://nestjs.com/)
- [Bun 🧄](https://babeljs.io/) 📜
- [Prisma 📐](https://www.prisma.io/)
- [GraphQL 🎯](https://graphql.org/)


## License 📄

This project is under the MIT License. Check the [LICENSE](LICENSE) file for more details. 📜
