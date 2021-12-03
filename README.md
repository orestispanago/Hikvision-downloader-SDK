### Hikvision-downloader

This branch is based on the ```consoleDemo``` from the [Hikvision SDK](https://www.hikvision.com/en/support/download/sdk/).

### Instructions

From the ```build``` directory run:

```make```

Run the executable from the same folder:

```./downloader``` 

Camera IP, username, password and output files path (without extension) are provided as command line arguments

### Example

```./downloader --ip 0.0.0.0 --user admin --pass 'pass!@' --output ../output/abc```

will download the following files:"

```../output/abc.dat``` &emsp;Pixel to pixel temperatures in Celsius

```../output/abc_t.jpeg``` &emsp;Thermal sensor image

```../output/abc_v.jpeg``` &emsp;Visible sensor image
