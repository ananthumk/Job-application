# API Routes Overview

## Authentication Routes (`/api/auth`)

### POST /register
Register a new user (candidate or admin)

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Pass@123",
  "role": "candidate"  // or "admin"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "user_id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "candidate"
  }
}
```

### POST /login
Login and get JWT token

**Request:**
```json
{
  "email": "john@example.com",
  "password": "Pass@123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "user_id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "candidate"
  }
}
```

---

## Job Routes (`/api/jobs`)

### GET /
Get all jobs with optional search/filter

**Query Parameters:**
- `search` - Search in title/description
- `location` - Filter by location
- `job_type` - Filter by job type

**Example:**
```
GET /api/jobs?search=developer&location=remote&job_type=Full-time
```

**Response:**
```json
{
  "count": 25,
  "jobs": [
    {
      "job_id": 1,
      "title": "Senior Developer",
      "description": "...",
      "location": "Remote",
      "job_type": "Full-time",
      "created_by": 5,
      "created_at": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### GET /:id
Get specific job details

**Response:**
```json
{
  "job": {
    "job_id": 1,
    "title": "Senior Developer",
    "description": "...",
    "location": "Remote",
    "job_type": "Full-time",
    "created_by": 5,
    "created_at": "2024-01-15T10:30:00Z"
  }
}
```

### POST /
Create a new job (Admin only)

**Auth:** Required (Admin)

**Request:**
```json
{
  "title": "Senior Developer",
  "description": "We are looking for...",
  "location": "Remote",
  "job_type": "Full-time"
}
```

**Response:**
```json
{
  "message": "Job created successfully",
  "job": {
    "job_id": 1,
    "title": "Senior Developer",
    "description": "We are looking for...",
    "location": "Remote",
    "job_type": "Full-time",
    "created_by": 5,
    "created_at": "2024-01-15T10:30:00Z"
  }
}
```

### PUT /:id
Update a job (Admin only)

**Auth:** Required (Admin)

**Request:**
```json
{
  "title": "Updated Senior Developer",
  "description": "Updated description...",
  "location": "New York",
  "job_type": "Part-time"
}
```

### DELETE /:id
Delete a job (Admin only)

**Auth:** Required (Admin)

**Response:**
```json
{
  "message": "Job deleted successfully"
}
```

---

## Application Routes (`/api/applications`)

### POST /:jobId
Apply to a job (Candidate only)

**Auth:** Required (Candidate)

**Response:**
```json
{
  "message": "Application submitted successfully",
  "application": {
    "application_id": 10,
    "user_id": 3,
    "job_id": 1,
    "applied_at": "2024-01-16T14:20:00Z"
  }
}
```

**Errors:**
- 400: Already applied to this job
- 404: Job not found
- 401: Not authenticated
- 403: Only candidates can apply

### GET /my
Get all applications by logged-in candidate

**Auth:** Required (Candidate)

**Response:**
```json
{
  "count": 5,
  "applications": [
    {
      "application_id": 10,
      "user_id": 3,
      "job_id": 1,
      "applied_at": "2024-01-16T14:20:00Z",
      "title": "Senior Developer",
      "description": "...",
      "location": "Remote",
      "job_type": "Full-time",
      "job_created_at": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

## Favourite Routes (`/api/favourites`)

### POST /:jobId
Save job to favorites (Candidate only)

**Auth:** Required (Candidate)

**Response:**
```json
{
  "message": "Job saved to favourites",
  "favourite": {
    "favourite_id": 20,
    "user_id": 3,
    "job_id": 1,
    "saved_at": "2024-01-16T14:25:00Z"
  }
}
```

### DELETE /:jobId
Remove from favorites (Candidate only)

**Auth:** Required (Candidate)

**Response:**
```json
{
  "message": "Job removed from favourites"
}
```

### GET /my
Get all saved jobs by candidate

**Auth:** Required (Candidate)

**Response:**
```json
{
  "count": 8,
  "favourites": [
    {
      "favourite_id": 20,
      "user_id": 3,
      "job_id": 1,
      "saved_at": "2024-01-16T14:25:00Z",
      "title": "Senior Developer",
      "description": "...",
      "location": "Remote",
      "job_type": "Full-time",
      "job_created_at": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

## Admin Routes (`/api/admin`)

### GET /my-jobs
Get all jobs posted by admin

**Auth:** Required (Admin)

**Response:**
```json
{
  "count": 12,
  "jobs": [
    {
      "job_id": 1,
      "title": "Senior Developer",
      "description": "...",
      "location": "Remote",
      "job_type": "Full-time",
      "created_by": 5,
      "created_at": "2024-01-15T10:30:00Z",
      "applicant_count": 15
    }
  ]
}
```

### GET /jobs/:jobId/applications
Get all applicants for a job

**Auth:** Required (Admin)

**Response:**
```json
{
  "count": 15,
  "applications": [
    {
      "application_id": 10,
      "user_id": 3,
      "job_id": 1,
      "applied_at": "2024-01-16T14:20:00Z",
      "name": "Jane Doe",
      "email": "jane@example.com"
    }
  ]
}
```

### GET /dashboard
Get dashboard statistics

**Auth:** Required (Admin)

**Response:**
```json
{
  "dashboard": {
    "total_jobs": 12,
    "total_applications": 145,
    "total_users": 250,
    "total_candidates": 245
  }
}
```

---

## Authentication Pattern

### Adding Token to Requests

All protected routes require JWT token in Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

**Example with cURL:**
```bash
curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..." \
  http://localhost:5000/api/admin/dashboard
```

**Axios (Frontend):**
```javascript
const response = await axiosInstance.get('/admin/dashboard');
// Token is automatically included by interceptor
```

---

## HTTP Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | Success | Job retrieved |
| 201 | Created | Job posted |
| 400 | Bad Request | Invalid input |
| 401 | Unauthorized | Missing token |
| 403 | Forbidden | Wrong role |
| 404 | Not Found | Job doesn't exist |
| 409 | Conflict | Duplicate application |
| 500 | Server Error | Database error |

---

## Error Responses

### 400 Bad Request
```json
{
  "message": "All fields are required",
  "errors": [
    {
      "field": "email",
      "message": "Valid email is required"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "message": "No token provided"
}
```

### 403 Forbidden
```json
{
  "message": "Access denied. Admin only."
}
```

### 404 Not Found
```json
{
  "message": "Job not found"
}
```

### 409 Conflict
```json
{
  "message": "You have already applied to this job"
}
```

---

## Rate Limiting Recommendations

Consider implementing rate limiting:
- Login: 5 attempts per minute
- Job creation: 10 per hour
- Applications: 20 per day per user

---

## API Testing with cURL

### Test Job Creation
```bash
TOKEN="your_jwt_token"

curl -X POST http://localhost:5000/api/jobs \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Frontend Developer",
    "description": "React expert needed",
    "location": "Remote",
    "job_type": "Full-time"
  }'
```

### Test Job Search
```bash
curl "http://localhost:5000/api/jobs?search=developer&location=remote"
```

### Test Application Submission
```bash
TOKEN="your_jwt_token"

curl -X POST http://localhost:5000/api/applications/1 \
  -H "Authorization: Bearer $TOKEN"
```

---

## WebSocket/Real-Time Recommendations

For future enhancements:
- Job notifications when new jobs posted
- Application status updates
- Message notifications
- Real-time applicant updates

---

## API Documentation Tools

Recommended tools for API exploration:
- **Postman** - Full-featured API testing
- **Thunder Client** - VS Code extension
- **REST Client** - VS Code extension
- **Swagger UI** - Interactive API docs

---

**Last Updated:** January 2026
**API Version:** 1.0.0
**Status:** Production Ready ✅
