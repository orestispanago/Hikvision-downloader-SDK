fid = fopen('10.dat','r');
number = fread(fid, inf,'*float32');
arr = reshape(number, 160, []);
contourf(arr')
colorbar
set(gca, 'YDir','reverse')