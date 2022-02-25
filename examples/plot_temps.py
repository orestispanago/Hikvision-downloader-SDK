import matplotlib.pyplot as plt
import numpy as np

data = np.fromfile("10.dat", dtype=np.float32)
array = np.reshape(data, [120, 160])

plt.imshow(array, interpolation='none')
plt.colorbar(label="Temperature °C")
plt.show()
