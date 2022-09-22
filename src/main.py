import datetime
import os
import shutil
import logging
import logging.config
import traceback

from uploader import upload_to_ftp


cam_ip = ""
cam_user = ""
cam_passwd = ""
hiktherm = "./hiktherm"


def mkdir_if_not_exists(dir_path):
    if not os.path.exists(dir_path):
        os.makedirs(dir_path)


os.chdir(os.path.dirname(os.path.abspath(__file__)))
logger = logging.getLogger(__name__)
logging.config.fileConfig("logging.conf", disable_existing_loggers=False)

now = datetime.datetime.utcnow()
local_folder = now.strftime("%Y/%m/%d/%H")
mkdir_if_not_exists(local_folder)

base_name = f"{local_folder}/{now.minute}"

cmd = (
    f"{hiktherm} "
    f"--ip {cam_ip} "
    f"--user {cam_user} "
    f"--pass {cam_passwd} "
    f"--output {base_name}"
)

if __name__ == "__main__":
    try:
        hik_response = os.popen(cmd).read()
        if "error" not in hik_response:
            logger.debug("Data download from camera successful.")
            upload_to_ftp(local_folder)
        shutil.rmtree(local_folder)
    except:
        logger.error("uncaught exception: %s", traceback.format_exc())
