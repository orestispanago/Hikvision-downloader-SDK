import numpy as np
import matplotlib.pyplot as plt

data = np.fromfile("raw/20211013_155855.dat", dtype=np.float32)
array = np.reshape(data, [120, 160])

plt.imshow(array, interpolation='none')
plt.colorbar(label="Temperature °C")
plt.show()