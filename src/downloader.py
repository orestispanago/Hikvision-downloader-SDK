import datetime
import os
import shutil

import matplotlib.pyplot as plt
import numpy as np

from nas import FTPClient

ftp_ip = ""
ftp_user = ""
ftp_password = ""
ftp_share = ""


cam_ip = ""
cam_user = ""
cam_passwd = ""
hiktherm = "./hiktherm"


def mkdir_if_not_exists(dir_path):
    if not os.path.exists(dir_path):
        os.makedirs(dir_path)


now = datetime.datetime.utcnow()
print(now)
local_folder = now.strftime("%Y/%m/%d/%H")

mkdir_if_not_exists(local_folder)
base_name = f"{local_folder}/{now.minute}"
cmd = (
    f"{hiktherm} "
    f"--ip {cam_ip} "
    f"--user {cam_user} "
    f"--pass {cam_passwd} "
    f"--output {local_folder}/{now.minute}"
)
os.system(cmd)
with FTPClient(ftp_ip, ftp_user, ftp_password, ftp_share) as ftp_client:
    ftp_client.upload_folder(local_folder)

shutil.rmtree(local_folder)
