# Deployment Guide

This guide covers various ways to deploy MalChart.

## Table of Contents
- [Docker Deployment](#docker-deployment)
- [Manual Deployment](#manual-deployment)
- [Environment Variables](#environment-variables)
- [Production Considerations](#production-considerations)

## Docker Deployment

The easiest way to deploy MalChart is using Docker Compose.

### Prerequisites
- Docker 20.10+
- Docker Compose 2.0+

### Steps

1. Clone the repository:
```bash
git clone https://github.com/HumanTrash69/MalChart.git
cd MalChart
```

2. Configure environment variables:
```bash
# Edit docker-compose.yml to set your environment variables
# Or create .env files in root and server directories
```

3. Build and start the containers:
```bash
docker-compose up -d
```

4. Access the application:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

5. View logs:
```bash
docker-compose logs -f
```

6. Stop the application:
```bash
docker-compose down
```

### Custom Configuration

Edit `docker-compose.yml` to customize:
- Ports
- Environment variables
- Resource limits
- Restart policies

## Manual Deployment

### Backend Deployment

1. Install dependencies:
```bash
cd server
npm ci --only=production
```

2. Set environment variables:
```bash
export PORT=5000
export NODE_ENV=production
export CACHE_DURATION=24
```

3. Start the server:
```bash
npm start
```

For production, use a process manager like PM2:
```bash
npm install -g pm2
pm2 start server.js --name malchart-backend
pm2 save
pm2 startup
```

### Frontend Deployment

1. Build the application:
```bash
npm ci
npm run build
```

2. Serve the build folder:

**Option A: Using serve**
```bash
npm install -g serve
serve -s build -l 3000
```

**Option B: Using Nginx**
```bash
# Copy build files to nginx directory
cp -r build/* /var/www/html/

# Use the provided nginx.conf or configure your own
```

**Option C: Using Apache**
```apache
<VirtualHost *:80>
    DocumentRoot /var/www/html/malchart
    
    <Directory /var/www/html/malchart>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
        
        # React Router support
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>
</VirtualHost>
```

## Environment Variables

### Backend Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| NODE_ENV | Environment mode | development |
| CACHE_DURATION | Cache duration in hours | 24 |

### Frontend Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| REACT_APP_API_URL | Backend API URL | http://localhost:5000/api |
| REACT_APP_USE_BACKEND | Enable backend integration | true |

## Production Considerations

### Performance

1. **Enable Gzip Compression**
   - Already configured in nginx.conf
   - For other servers, enable gzip for text/css, text/javascript, application/json

2. **Set Cache Headers**
   - Static assets should be cached for 1 year
   - API responses are cached server-side for 24 hours

3. **Use CDN**
   - Consider using a CDN for static assets
   - Frontend can be deployed to Vercel, Netlify, or CloudFlare Pages

### Security

1. **HTTPS**
   - Always use HTTPS in production
   - Use Let's Encrypt for free SSL certificates

2. **Rate Limiting**
   - Backend respects Jikan API rate limits
   - Consider adding rate limiting for your own API

3. **CORS Configuration**
   - Update CORS settings in backend for production domains
   - Current configuration allows all origins (not recommended for production)

### Monitoring

1. **Health Checks**
   - Backend has `/health` endpoint
   - Use for monitoring and load balancer health checks

2. **Logging**
   - Backend logs to console
   - Configure log aggregation (e.g., CloudWatch, Datadog)

3. **Error Tracking**
   - Consider adding Sentry or similar error tracking

### Scaling

1. **Horizontal Scaling**
   - Backend is stateless and can be scaled horizontally
   - Use load balancer (nginx, HAProxy, or cloud provider)

2. **Caching Strategy**
   - Current implementation uses in-memory cache
   - For multiple instances, consider Redis for shared cache

3. **Database (Future Enhancement)**
   - Current implementation doesn't use a database
   - For better data persistence, consider adding MongoDB or PostgreSQL

## Cloud Platform Deployment

### Heroku

Backend:
```bash
cd server
heroku create malchart-backend
heroku config:set NODE_ENV=production CACHE_DURATION=24
git push heroku main
```

Frontend:
```bash
heroku create malchart-frontend
heroku buildpacks:set mars/create-react-app
heroku config:set REACT_APP_API_URL=https://malchart-backend.herokuapp.com/api
git push heroku main
```

### AWS

- Frontend: Deploy to S3 + CloudFront
- Backend: Deploy to EC2, ECS, or Elastic Beanstalk
- Use RDS for database (future enhancement)

### Vercel (Frontend Only)

```bash
npm install -g vercel
vercel --prod
```

Configure environment variables in Vercel dashboard.

### DigitalOcean

Use App Platform or Droplet with Docker Compose.

## Troubleshooting

### Backend Won't Start
- Check if port 5000 is available
- Verify Node.js version (14+)
- Check environment variables

### Frontend Build Fails
- Clear node_modules and reinstall
- Check for TypeScript/ESLint errors
- Verify React version compatibility

### API Errors
- Ensure backend is running
- Check CORS configuration
- Verify API URL in environment variables
- Check Jikan API status at https://jikan.moe/

### Empty Data
- Backend fetches data on startup (after 5 second delay)
- Check backend logs for API errors
- Jikan API may be rate-limited or down
- Cache may be empty on first load

## Support

For issues and questions:
- GitHub Issues: https://github.com/HumanTrash69/MalChart/issues
- Jikan API Status: https://jikan.moe/
