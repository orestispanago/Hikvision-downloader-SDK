import matplotlib.pyplot as plt
import numpy as np

dat_files = ["03/17/21/30.dat", "03/22/09/0.dat", "03/22/13/30.dat"]
for fname in dat_files:
    data = np.fromfile(fname, dtype=np.float32)
    array = np.reshape(data, [120, 160])
    
    plt.imshow(array, interpolation='none')
    plt.clim(-80, 20)
    plt.colorbar(label="Temperature °C")
    plt.savefig(fname[:-4]+'_h.png')
    plt.show()
    


