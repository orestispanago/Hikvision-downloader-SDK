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
*/10 * * * * cd ~/Hikvision-Downloader-SDK/src; python3 downloader.py > crontab.log 2> crontab.err
```