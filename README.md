# Job Portal & Hiring Platform

A modern, full-stack web application that connects job seekers with employers. This platform allows users to browse jobs, apply for positions, save favorites, and manage their applications—all in one place. For administrators, there's a complete dashboard to manage jobs, review applications, and oversee the platform.

## 🌐 Live Deployment

### Backend API
- **URL:** https://job-application-1-59ln.onrender.com
- **Platform:** Render
- **Database:** PostgreSQL on Render
- **Status:** ✅ Running

### Frontend
- Ready to deploy to Vercel, Netlify, or similar
- Update `CORS_ORIGIN` environment variable on backend after frontend deployment
- Update frontend API baseURL in `axiosInstance.js` (already configured)

---

## 🚀 Features

### For Job Seekers
- **Browse Jobs** - Search and filter through available job listings
- **Apply for Jobs** - Submit applications directly through the platform
- **Save Favorites** - Bookmark jobs you're interested in for later
- **Track Applications** - Monitor the status of your applications
- **User Profile** - Manage your profile and credentials

### For Employers
- **Post Jobs** - Create and manage job listings
- **Review Applications** - View and manage candidate applications
- **Analytics** - See insights about your job postings

### For Admins
- **Full Control** - Manage all users, jobs, and applications
- **User Management** - Create, update, or remove user accounts
- **Content Moderation** - Oversee all platform activity

## 🛠️ Tech Stack

### Backend
- **Node.js & Express** - Server framework
- **PostgreSQL** - Database for storing all data
- **JWT** - Secure user authentication
- **Bcrypt** - Password encryption for security

### Frontend
- **React 19** - Modern UI framework with hooks
- **Vite 7** - Lightning-fast build tool & dev server
- **React Router 7** - Client-side routing & navigation
- **Tailwind CSS 3** - Utility-first CSS framework
- **Axios** - HTTP client with interceptors for API calls
- **Context API** - State management for authentication




## 🔧 Installation

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd MedaiVm
```

### 2. Setup Backend

Navigate to the backend folder:
```bash
cd backend
```

Install dependencies:
```bash
npm install
```

Create a `.env` file in the backend folder with your database credentials:
```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=job_portal
PORT=5000
JWT_SECRET=your_secret_key_here
```

Initialize the database:
```bash
npm run setup-db
```

Start the backend server:
```bash
npm run dev
```

You should see:
```
✅ Database connected at: [timestamp]
🚀 Server running on http://localhost:5000
```

### 3. Setup Frontend

Open a new terminal and navigate to the frontend folder:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

Start the frontend development server:
```bash
npm run dev
```

Your application will be available at `http://localhost:5173`

## 📁 Project Structure

```
MedaiVm/
├── backend/                    # Backend API
│   ├── config/                # Database configuration
│   ├── controllers/           # Business logic for each feature
│   ├── routes/               # API endpoints
│   ├── middleware/           # Authentication & authorization
│   ├── database/             # Database schema and setup
│   ├── app.js                # Express app setup
│   ├── server.js             # Server startup
│   └── package.json          # Dependencies
│
├── frontend/                   # React Frontend
│   ├── src/
│   │   ├── pages/            # Main pages
│   │   │   ├── Home.jsx              # Landing page
│   │   │   ├── Login.jsx             # User login
│   │   │   ├── Register.jsx          # User registration
│   │   │   ├── Candidate/
│   │   │   │   ├── Jobs.jsx          # Browse jobs
│   │   │   │   ├── JobDetails.jsx    # Job details & apply
│   │   │   │   ├── MyApplications.jsx # View applications
│   │   │   │   └── MyFavourites.jsx  # Saved jobs
│   │   │   └── Admin/
│   │   │       ├── AdminJobs.jsx     # Manage jobs
│   │   │       ├── JobForm.jsx       # Create/edit jobs
│   │   │       ├── Applicants.jsx    # View applicants
│   │   │       └── Dashboard.jsx     # Admin dashboard
│   │   ├── components/       # Reusable components
│   │   │   ├── Navbar.jsx           # Navigation bar
│   │   │   ├── Loader.jsx           # Loading spinner
│   │   │   ├── JobCard.jsx          # Job listing card
│   │   │   └── ProtectedRoute.jsx   # Auth wrapper
│   │   ├── context/          # State management
│   │   │   └── AuthContext.jsx      # Authentication state
│   │   ├── api/              # API client
│   │   │   └── axiosInstance.js     # Axios with interceptor
│   │   ├── App.jsx           # Main app component
│   │   ├── main.jsx          # Entry point
│   │   ├── index.css         # Global styles
│   │   └── App.css           # App component styles
│   ├── public/               # Static assets
│   ├── vite.config.js        # Vite configuration
│   ├── tailwind.config.js    # Tailwind CSS config
│   ├── postcss.config.js     # PostCSS config
│   └── package.json          # Dependencies
└── README.md                  # Documentation
```

## 🎨 Frontend Architecture

### Pages & Components

#### Public Pages
- **Home.jsx** - Landing page with features & statistics
- **Login.jsx** - User login with email/password
- **Register.jsx** - Registration with role selection (Candidate/Admin)

#### Candidate Pages (Protected)
- **Jobs.jsx** - Browse, search, and filter job listings
  - Search by job title
  - Filter by location
  - Filter by job type (Full-time, Part-time, etc.)
  - Save to favorites
- **JobDetails.jsx** - View full job information
  - Apply button
  - Save to favorites
  - Application status
- **MyApplications.jsx** - View all submitted applications
- **MyFavourites.jsx** - View saved jobs

#### Admin Pages (Protected)
- **AdminJobs.jsx** - Manage all job postings
  - Create, Edit, Delete jobs
  - View applicant count
  - View applications for each job
- **JobForm.jsx** - Create and edit job listings
  - Form validation
  - Title, description, location, job type
- **Applicants.jsx** - View candidates who applied
  - Applicant information
  - Application date
  - Contact information
- **Dashboard.jsx** - Admin statistics
  - Total jobs posted
  - Total applications received
  - Total candidates
  - Average applications per job

#### Reusable Components
- **Navbar.jsx** - Navigation with role-based menus
  - Links for candidates & admins
  - Mobile responsive hamburger menu
  - Logout functionality
- **ProtectedRoute.jsx** - Authentication wrapper
  - Redirects unauthenticated users to login
  - Enforces role-based access
- **Loader.jsx** - Loading spinner
  - Used during API calls
  - Fullscreen option available
- **JobCard.jsx** - Reusable job listing card

### State Management

**AuthContext.jsx** - Centralized authentication state
- User information (name, email, role)
- Authentication token (JWT)
- Login/Register/Logout functions
- Loading states
- localStorage persistence

### API Integration

**axiosInstance.js** - Configured HTTP client
- Base URL: `https://job-application-1-59ln.onrender.com/api`
- Automatic JWT token insertion in headers
- Error handling with interceptors
- Request/response transformation

### Styling

- **Tailwind CSS 3.3.6** - Utility-first styling
  - Custom color theme (primary, secondary colors)
  - Responsive design classes
  - Dark mode support ready
- **PostCSS** - CSS processing
- **Autoprefixer** - Browser compatibility

### Key Features

✨ **Authentication**
- Secure JWT token handling
- Role-based access control (Candidate/Admin)
- Session persistence with localStorage

✨ **User Experience**
- Loading spinners during API calls
- Error messages for failed requests
- Form validation before submission
- Responsive mobile design

✨ **Performance**
- Code splitting with React Router
- Lazy loading of pages
- Optimized Vite build
- Fast HMR (Hot Module Replacement) in dev

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Create a new user account
- `POST /api/auth/login` - Login to your account
- `GET /api/auth/me` - Get your profile

### Jobs
- `GET /api/jobs` - Get all job listings
- `POST /api/jobs` - Post a new job (admin/employer)
- `GET /api/jobs/:id` - Get details of a specific job
- `PUT /api/jobs/:id` - Update a job listing
- `DELETE /api/jobs/:id` - Remove a job listing

### Applications
- `GET /api/applications` - View your applications
- `POST /api/applications` - Apply for a job
- `GET /api/applications/:id` - Get application details
- `PUT /api/applications/:id` - Update application status

### Favorites
- `GET /api/favourites` - Get your saved jobs
- `POST /api/favourites` - Save a job
- `DELETE /api/favourites/:id` - Remove from favorites

### Admin
- `GET /api/admin/users` - View all users
- `GET /api/admin/jobs` - View all jobs
- `GET /api/admin/applications` - View all applications

## 📊 Database Schema

The database includes these main tables:
- **users** - User accounts and profiles
- **jobs** - Job listings
- **applications** - Job applications
- **favorites** - Saved jobs by users

Run `npm run setup-db` to automatically create these tables.

## 🚀 Running the Application

### Development Mode
Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

### Production Mode
Backend:
```bash
cd backend
npm start
```

Frontend:
```bash
cd frontend
npm run build
npm run preview
```

## 🔐 Security Notes

- Never commit the `.env` file to version control
- Keep your JWT_SECRET private and strong
- Always hash passwords (already done with Bcrypt)
- Validate user input on both frontend and backend

## 🐛 Troubleshooting

### Database Connection Error
- Check if PostgreSQL is running
- Verify credentials in `.env` file
- Make sure the database name matches

### Port Already in Use
- Backend: Change PORT in `.env` file
- Frontend: Vite will automatically use the next available port

### Dependencies Installation Error
- Delete `node_modules` folder and `package-lock.json`
- Run `npm install` again
- Clear npm cache: `npm cache clean --force`

## 📝 Contributing

Feel free to fork this project and submit pull requests with improvements!

## 📄 License

This project is open source and available under the MIT License.

## 💬 Support

Need help? Check the documentation or create an issue in the repository.

---
