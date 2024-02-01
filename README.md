Web-angular application for api to test jwt tokens
----
This application can shutdown or reboot servers. To to add servers need add new record to ```src/assets/config.json```. Server images are stored in ```src/assets/img/*```.

#### In ```src/app/services``` stored all logic with JWT tokens interaction.

- ```local-storage/local-storage``` - wrapper to use js localStorage

- ```auth/account``` - managing JWT tokens 
    - can login on FastApi server
    - can get new access_token when it spoiled, by refresh_token
- ```auth/config``` and ```auth/api``` - logic associated with obtaining data about the api selected by the user

- ```api/power``` and other - create new request to tha api

# Screenshots

![img](image/login.png)
![img](image/main.png)
![img](image/sessions.png)

# Start

    npm install -g @angular/cli
    npm install 
    ng serve

# Build and host using nginx

Before build, change urls on actual api`s in file ```src/assets/config.json```

    {
        "api":
        [
            {
                "name": "OrangePi",
                "image": "orangepi.png",
                "api": "https://<URL>:<HOST>/"
            },
            {
                "name": "RaspberryPi",
                "image": "raspberrypi.png",
                "api": "https://<URL>:<HOST>/"
            }
        ],
        "imagePath": "assets/img/"
    }

Then install lib`s 

    npm install -g @angular/cli
    npm install
    ng build

# Copy generated folder to ```/var/www/html/```

    cp dist/web/browser /var/www/html/
    mv /var/www/html/browser /var/www/html/power_web # rename dir

# Configure Nginx

```/etc/nginx/sites-enabled/default```

    server {
        listen 4000      ssl http2;
        listen [::]:4000 ssl http2;
        server_name _;

        client_max_body_size 100M;

        ssl_certificate /etc/letsencrypt/live/<SITE>/fullchain.pem; # managed by Certbot
        ssl_certificate_key /etc/letsencrypt/live/<SITE>/privkey.pem; # managed by Certbot
    #    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
        ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

        location / {
            root /var/www/html/power_web/;
            index index.html;
            try_files $uri $uri/ /index.html =404;

            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }

Restart nginx:

    sudo systemctl restart nginx