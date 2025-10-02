# Simple Dockerfile - build locally first, then copy artifacts
FROM eclipse-temurin:17-jre-jammy

WORKDIR /app

# Install nginx to serve frontend
RUN apt-get update && \
    apt-get install -y nginx && \
    rm -rf /var/lib/apt/lists/*

# Copy built Angular app from local build
COPY web-app/dist/web-app /usr/share/nginx/html

# Copy built Spring Boot JAR from local build
COPY rup-projects-core/target/*.jar app.jar

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose ports
EXPOSE 80 8080

# Create startup script to run both nginx and Spring Boot
RUN echo '#!/bin/bash\n\
nginx\n\
java -jar /app/app.jar' > /app/start.sh && \
chmod +x /app/start.sh

CMD ["/app/start.sh"]
