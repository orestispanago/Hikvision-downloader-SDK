import ftplib
import glob
import os
import logging

logger = logging.getLogger(__name__)


ftp_ip = ""
ftp_user = ""
ftp_password = ""
ftp_share = "datalogger/hikvision-test"


class FTPClient:
    def __init__(self, ip, user, passwd, folder):
        self.ip = ip
        self.user = user
        self.passwd = passwd
        self.folder = folder
        self._session = None

    def __enter__(self):
        self.session = ftplib.FTP(self.ip, self.user, self.passwd, timeout=20)
        self.session.cwd(self.folder)
        logger.debug("FTP connection successful.")
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.session.quit()
        logger.debug("Closing FTP connection")

    def _mkdir_and_enter(self, dir_name):
        if dir_name not in self.session.nlst():
            self.session.mkd(dir_name)
            logger.debug(f"Creaded FTP directory: {dir_name}")
        self.session.cwd(dir_name)

    def _make_dirs(self, folder_path):
        for f in folder_path.split("/"):
            self._mkdir_and_enter(f)

    def upload_folder(self, folder_path):
        """
        Uploads local folder contents to FTP server.
        Creates remote directory tree if necessary.
        :param folder_path: local folder path
        """
        self._make_dirs(folder_path)
        file_paths = glob.glob(f"{folder_path}/*")
        for file_path in file_paths:
            with open(file_path, "rb") as f:
                self.session.storbinary(f"STOR {os.path.split(file_path)[1]}", f)
            logger.debug(f"Uploaded file: {file_path}")
        logger.info(f"Uploaded {len(file_paths)} files to FTP.")


def upload_to_ftp(local_folder):
    with FTPClient(ftp_ip, ftp_user, ftp_password, ftp_share) as ftp_client:
        ftp_client.upload_folder(local_folder)
