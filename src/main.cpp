
#include "HCNetSDK.h"
#include <string.h>
#include <fstream>
#include "params.h"

#define HPR_OK 0
#define HPR_ERROR -1

#define BUF_LEN 3 * 1024 * 1024 // SHOULD BE READ FROM DEVICE CONFIG
const int devChnl = 2;
long userID;

int login()
{
    NET_DVR_USER_LOGIN_INFO struLoginInfo = {0};
    NET_DVR_DEVICEINFO_V40 struDeviceInfoV40 = {0};
    struLoginInfo.bUseAsynLogin = false;
    struLoginInfo.wPort = 8000;
    memcpy(struLoginInfo.sDeviceAddress, ip, NET_DVR_DEV_ADDRESS_MAX_LEN);
    memcpy(struLoginInfo.sUserName, user, NAME_LEN);
    memcpy(struLoginInfo.sPassword, pass, NAME_LEN);

    userID = NET_DVR_Login_V40(&struLoginInfo, &struDeviceInfoV40);
    if (userID < 0)
    {
        printf("pyd1---Login error, %d\n", NET_DVR_GetLastError());
        return HPR_ERROR;
    }
    return HPR_OK;
}

void logout()
{
    NET_DVR_Logout_V30(userID);
    NET_DVR_Cleanup();
}

void dump2file(std::string fname, char *d, int dsize)
{
    std::ofstream f(fname, std::ios::out | std::ios::binary);
    f.write((char *)d, dsize);
    f.close();
};

std::string date_time()
{
    char date_time[1024];
    struct tm *timenow;
    time_t now = time(NULL);
    timenow = gmtime(&now);
    strftime(date_time, sizeof(date_time), "%Y%m%d_%H%M%S", timenow);
    return date_time;
}

int download()
{
    NET_DVR_JPEGPICTURE_WITH_APPENDDATA data = {0};
    data.pJpegPicBuff = new char[BUF_LEN];
    memset(data.pJpegPicBuff, 0, BUF_LEN);
    data.pP2PDataBuff = new char[BUF_LEN];
    memset(data.pP2PDataBuff, 0, BUF_LEN);
    data.pVisiblePicBuff = new char[BUF_LEN];
    memset(data.pVisiblePicBuff, 0, BUF_LEN);

    if (!NET_DVR_CaptureJPEGPicture_WithAppendData(userID, devChnl, &data))
    {
        printf("pyd1---NET_DVR_CaptureJPEGPicture error, %d\n", NET_DVR_GetLastError());
        return HPR_ERROR;
    }

    // printf("pyd---Channel %d dwP2PDataLen is %u.\n", devChnl, data.dwP2PDataLen);
    // printf("pyd---Channel %d dwJpegPicWidth is %u.\n", devChnl, data.dwJpegPicWidth);
    // printf("pyd---Channel %d dwJpegPicHeight is %u.\n", devChnl, data.dwJpegPicHeight);
    std::string base_name;
    base_name = output;
    dump2file(base_name + ".dat", data.pP2PDataBuff, data.dwP2PDataLen);
    dump2file(base_name + "_t.jpeg", data.pJpegPicBuff, data.dwJpegPicLen);
    dump2file(base_name + "_v.jpeg", data.pVisiblePicBuff, data.dwVisiblePicLen);
    return HPR_OK;
}

int main(int argc, char **argv)
{
    parse_args(argc, argv);
    NET_DVR_Init();
    login();
    download();
    logout();
    return HPR_OK;
}
