# Build Stage for Next.js Static Export
FROM node:20-alpine AS builder

WORKDIR /app

# The build requires the NEXT_PUBLIC_API_URL to bake it into the static HTML/JS files
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the static export
RUN npm run build

# Production Stage: use Nginx to serve the static HTML from out/
FROM nginx:alpine

# Copy custom Nginx config (optional but good for SPA routing)
# RUN rm /etc/nginx/conf.d/default.conf
# COPY nginx.conf /etc/nginx/conf.d

# Copy the static export
COPY --from=builder /app/out /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
