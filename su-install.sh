### Setup Nginx
# Install nginx
apt install nginx -y
# Replace original default config file with custom one
cat nginx-conf > /etc/nginx/nginx.conf
# Apply new settings
systemctl restart nginx
# Move fronend files to /var/www/html deleting existing content
sudo rm -R /var/www/html
sudo mv -f html /var/www
