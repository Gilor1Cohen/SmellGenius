# SmellGenius

SmellGenius is an AI-powered luxury fragrance recommendation platform. It delivers personalized perfume suggestions based on user preferences, purchase history, and contextual scenarios (e.g. date night, office, summer). The platform offers a premium user experience inspired by Apple's iOS 17–26 design with glassmorphism and elegant visuals.

---

## ✨ Key Features

- AI-generated fragrance recommendations
- Scent suggestions tailored to specific occasions
- Personalized offers and exclusive perfume deals
- Modern, luxurious UI/UX (glassmorphism, soft gold accents)

---

## 🛠 Tech Stack

### Backend (Node.js + Express)

- `express` ^5.1.0
- `dotenv` ^16.5.0
- `cors` ^2.8.5
- `cookie-parser` ^1.4.7
- `jsonwebtoken` ^9.0.2
- `nodemon` ^3.1.10
- `mongoose` ^8.16.0
- `bcryptjs` ^3.0.2
- `openai` ^5.8.1

### Frontend (React 19)

- `react` ^19.1.0
- `react-dom` ^19.1.0
- `react-router-dom` ^7.6.2
- `react-hook-form` ^7.58.1
- `axios` ^1.10.0
- Built with Vite, TypeScript, and ESLint

---

## 🚀 Getting Started

### Clone the repo

```bash
git clone https://github.com/Gilor1Cohen/SmellGenius
cd SmellGenius
```

### Install dependencies

#### Server

```bash
cd server
npm install
```

#### Client

```bash
cd client
npm install
```

### Run the app

```bash
# Terminal 1 - server
cd server
nodemon index

# Terminal 2 - client
cd client
npm run dev
```

---

### Environment Variables

Your `.env` file in the `server` directory should include:

```env
MONGO_URL="mongodb://localhost:27017/SmellGenius"
OPENAI_API_KEY=your_openai_api_key_here
```

---

## 🗄️ MongoDB Setup

This project requires a MongoDB database.

> **Note:**
> In the `server` folder, you will find two JSON files:
>
> - One containing all perfumes
> - One containing the shop items
>
> **You need to import both JSON files into your MongoDB database.**
>
> **Make sure to name each collection correctly** –
> The required collection names can be found in the `models` folder inside `server`.

### Option 1: Local MongoDB

1. [Download and install MongoDB Community Edition](https://www.mongodb.com/try/download/community)

2. Start MongoDB locally:

   ```bash
   mongod
   ```

3. Make sure your .env file contains:
   ```bash
   MONGO_URL=mongodb://localhost:27017/SmellGenius
   ```

### Option 2: MongoDB Atlas (Cloud)

1. Register for MongoDB Atlas

2. Create a cluster and get your connection string.

3. Update your .env:
   ```bash
   MONGO_URL=mongodb+srv://<username>:<password>@<cluster-url>/SmellGenius
   ```

Once MongoDB is running and your connection string is set, you can start the server as described in the main instructions.

## Contact

Created by Gilor Cohen
