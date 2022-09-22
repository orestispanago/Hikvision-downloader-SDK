### Hikvision-downloader

Downloads  pixel temperature data, visible and thermal images.

Based on the ```consoleDemo``` from [Hikvision SDK](https://www.hikvision.com/en/support/download/sdk/).

### Instructions

To compile the c++ code, run ```make``` from the ```src``` directory.

Run the executable from the same folder:

```./hiktherm -h``` 

Example usage:

```./hiktherm --ip 0.0.0.0 --user admin --pass '12345@#` --output a```

will download ```a_t.jpeg```, ```a_v.jpeg``` and ```a.dat```.

```downloader.py``` runs the executable and uploads to FTP server.

Crontab example:

```
*/10 * * * * python3 ~/Hikvision-Downloader-SDK/main.py
```

### Docker

You can run the ```hiktherm``` executable as well  the ```main.py``` script from a docker container.

Use ```docker compose up -d``` to build the image and start the container.

Use ```docker exec -it python3 main.py``` to run the python script.  