# Frontend Quick Start Guide

## Prerequisites
- Node.js (v14+)
- npm or yarn
- Backend running on http://localhost:5000

## Installation & Setup

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The app will be available at: `http://localhost:5173`

## Features

### For Candidates
- Register/Login
- Browse jobs with search & filter
- View job details
- Apply to jobs
- Save jobs to favorites
- View applications
- View saved jobs

### For Admins
- Register/Login as employer
- Create job postings
- Edit & delete jobs
- View applicants
- Access dashboard with stats

## Project Structure

```
frontend/src/
├── components/
│   ├── Navbar.jsx           # Navigation bar
│   ├── JobCard.jsx          # Job listing card
│   ├── ProtectedRoute.jsx   # Auth wrapper
│   └── Loader.jsx           # Loading spinner
├── pages/
│   ├── Home.jsx             # Landing page
│   ├── Login.jsx            # Login page
│   ├── Register.jsx         # Registration
│   ├── Candidate/
│   │   ├── Jobs.jsx         # Browse jobs
│   │   ├── JobDetails.jsx   # Job details
│   │   ├── MyApplications.jsx
│   │   └── MyFavourites.jsx
│   └── Admin/
│       ├── AdminJobs.jsx    # Manage jobs
│       ├── JobForm.jsx      # Create/Edit
│       ├── Applicants.jsx   # View applicants
│       └── Dashboard.jsx    # Statistics
├── context/
│   └── AuthContext.jsx      # Auth state
├── api/
│   └── axiosInstance.js     # API client
├── App.jsx                  # Main app
├── main.jsx                 # Entry point
├── index.css                # Global styles
├── App.css                  # App styles
└── package.json
```

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Key Components

### AuthContext
Manages authentication state and user data.
```javascript
const { user, isAdmin, login, register, logout, loading } = useAuth();
```

### ProtectedRoute
Wraps routes that require authentication.
```jsx
<ProtectedRoute requiredRole="candidate">
  <Component />
</ProtectedRoute>
```

### Loader
Shows loading spinner while fetching data.
```jsx
<Loader fullScreen={true} />
```

### JobCard
Displays job information in cards.
```jsx
<JobCard 
  job={jobData}
  isFavorite={true}
  onSave={handleSave}
/>
```

## Pages Overview

### Public Pages
- `/` - Home page
- `/login` - Login
- `/register` - Registration

### Candidate Pages (Protected)
- `/jobs` - Browse all jobs
- `/jobs/:id` - Job details
- `/my-applications` - Applied jobs
- `/my-favourites` - Saved jobs

### Admin Pages (Protected)
- `/admin/jobs` - Manage postings
- `/admin/jobs/create` - Create new job
- `/admin/jobs/:id/edit` - Edit job
- `/admin/jobs/:id/applicants` - View applicants
- `/admin/dashboard` - Statistics

## Styling with Tailwind CSS

The project uses Tailwind CSS for styling. Key classes:

```javascript
// Colors
className="text-blue-600 bg-blue-100"

// Spacing
className="p-6 m-4"

// Responsive
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"

// Utilities
className="rounded-lg shadow-md hover:shadow-lg"
```

## API Integration

### Making API Calls
```javascript
import axiosInstance from '../api/axiosInstance';

// GET
const { data } = await axiosInstance.get('/jobs');

// POST
const response = await axiosInstance.post('/auth/login', {
  email: 'user@example.com',
  password: 'password'
});

// PUT
await axiosInstance.put(`/jobs/${id}`, updatedData);

// DELETE
await axiosInstance.delete(`/jobs/${id}`);
```

### Automatic Token Handling
The axiosInstance automatically includes JWT token in request headers:
```javascript
Authorization: Bearer YOUR_TOKEN_HERE
```

## User Authentication Flow

### Registration
1. User fills registration form
2. Selects role (candidate or admin)
3. Password is sent to backend for hashing
4. JWT token is returned
5. Token stored in localStorage
6. User redirected to appropriate page

### Login
1. User enters credentials
2. Backend validates and returns JWT
3. Token stored in localStorage
4. AuthContext updates user state
5. ProtectedRoutes allow access

### Logout
1. Token removed from localStorage
2. User state cleared
3. Redirect to login page

## Error Handling

### Error Messages
- Network errors show user-friendly messages
- Form validation shows field-specific errors
- API errors are caught and displayed

### Loading States
- Loading spinner shows during API calls
- Buttons are disabled during submission
- User feedback with status messages

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Tips

1. **Images**: Optimize before uploading
2. **Bundle**: Built with Vite for fast builds
3. **Caching**: Browser caches API responses
4. **Lazy Loading**: Routes are code-split

## Building for Production

```bash
npm run build
```

Creates optimized build in `dist/` folder.

## Deployment

### On Vercel
```bash
npm install -g vercel
vercel
```

### On Netlify
```bash
npm run build
# Drag dist/ folder to Netlify
```

### On Custom Server
```bash
npm run build
# Serve dist/ folder with nginx/apache
```

## Environment Variables

Create `.env.local` file (optional):
```env
VITE_API_URL=http://localhost:5000/api
```

## Troubleshooting

**Issue: Can't connect to backend**
- Ensure backend is running on port 5000
- Check API base URL in axiosInstance.js
- Verify CORS is enabled on backend

**Issue: Styles not loading**
- Clear node_modules: `rm -rf node_modules`
- Reinstall: `npm install`
- Clear browser cache

**Issue: Login not working**
- Check credentials
- Verify backend is running
- Check browser console for errors

**Issue: Token expiration**
- Re-login to get new token
- Token expires based on JWT_EXPIRE setting

## Useful Resources

- [React Docs](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Router Docs](https://reactrouter.com)
- [Axios Docs](https://axios-http.com/docs/intro)

## Support

For issues or questions:
1. Check the browser console for errors
2. Check network tab in DevTools
3. Review API responses
4. Check backend logs

---

Happy coding! 🚀
