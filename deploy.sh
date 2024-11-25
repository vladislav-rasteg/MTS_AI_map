#!/bin/bash

cd /prohodka/prohodka_client
git pull origin main
sudo npm install
sudo npm run build
sudo rm -rf /var/www/build
sudo mv build /var/www
sudo service nginx restart
echo "Deployment completed!"
