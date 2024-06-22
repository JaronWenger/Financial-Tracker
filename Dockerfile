# Use an official nginx image as a parent image
#FROM nginx:1.27.0-alpine

# Use an official nginx image as a parent image
FROM nginx:1.27.0-alpine

# Remove the default Nginx configuration file (if necessary)
RUN rm /etc/nginx/nginx.conf

# Copy your custom nginx.conf to the container's Nginx configuration directory
COPY nginx/nginx.conf /etc/nginx/nginx.conf




# Set the working directory in the container
WORKDIR /usr/share/nginx/html

# Copy the built files of your frontend app into the container
COPY build/ .

# Expose port 80 to the Docker host, so you can access it from the outside
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
