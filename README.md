# Socially - A Modern Social Media Platform

A full-stack social media application built with Next.js 14, featuring real-time interactions, user authentication, and a responsive design. Users can create posts, interact through likes and comments, follow other users, and receive notifications.

## ✨ Features

### 🚀 Core Functionality
- **User Authentication** - Secure sign-in/sign-up with Clerk
- **Post Creation** - Create posts with text content and images
- **Social Interactions** - Like and comment on posts
- **User Profiles** - View and manage user profiles
- **Follow System** - Follow/unfollow other users
- **Real-time Notifications** - Get notified for likes, comments, and follows
- **Responsive Design** - Works seamlessly on desktop and mobile

### 🎨 UI/UX Features
- **Dark/Light Mode** - Toggle between themes
- **Mobile Navigation** - Optimized mobile experience with collapsible sidebar
- **Infinite Scroll** - Smooth post loading experience
- **Real-time Updates** - Optimistic UI updates for instant feedback
- **Modern Design** - Clean, Twitter-like interface using Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible UI components
- **Lucide React** - Beautiful icons
- **React Hot Toast** - Elegant notifications
- **Date-fns** - Date formatting utilities

### Backend & Database
- **Prisma** - Type-safe database ORM
- **PostgreSQL** - Robust relational database
- **Server Actions** - Next.js server-side data mutations

### Authentication & Deployment
- **Clerk** - Complete authentication solution
- **Vercel** - Deployment platform (recommended)

## 📁 Project Structure

```
src/
├── actions/           # Server actions for data mutations
│   ├── post.action.ts # Post-related operations
│   └── user.action.ts # User-related operations
├── app/              # Next.js app router pages
│   ├── layout.tsx    # Root layout with providers
│   └── page.tsx      # Home page with post feed
├── components/       # React components
│   ├── ui/           # Reusable UI components
│   ├── CreatePost.tsx
│   ├── PostCard.tsx
│   ├── NavBar.tsx
│   └── ...
├── lib/              # Utility functions
│   ├── prisma.ts     # Database client
│   └── utils.ts      # Helper functions
└── middleware.ts     # Clerk authentication middleware

prisma/
└── schema.prisma     # Database schema
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm
- PostgreSQL database
- Clerk account for authentication

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd socially
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/socially"
   
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
   ```

4. **Database Setup**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Push database schema
   npx prisma db push
   
   # (Optional) Seed database
   npx prisma db seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 Database Schema

The application uses a relational database with the following main entities:

- **Users** - Profile information and authentication
- **Posts** - User-generated content with optional images
- **Comments** - Threaded discussions on posts
- **Likes** - Post engagement tracking
- **Follows** - User relationship management
- **Notifications** - Real-time activity updates

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
npm run db:generate  # Generate Prisma client
npm run db:push     # Push schema to database
```

## 🚀 Deployment

### Deploy on Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add your environment variables in Vercel dashboard
4. Deploy automatically on every push

### Environment Variables for Production
Ensure all environment variables from `.env.local` are configured in your deployment platform.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Authentication by [Clerk](https://clerk.com/)
- Database ORM by [Prisma](https://www.prisma.io/)
