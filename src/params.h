#include <iostream>
#include <getopt.h>

char *ip = "", *user = "", *pass = "", *output = "";

void check_not_empty(char *parameter, char *description, char *option)
{
    if (parameter == "")
    {
        printf("%s not specified, use %s option\n", description, option);
        exit(1);
    }
}

void check_if_no_params(int argc, char **argv)
{
    if (argc < 2)
    {
        std::cout << "Missing parameters" << std::endl;
        std::cout << "Use: " << argv[0] << " -h to show usage" << std::endl;
        exit(1);
    }
}

void show_usage(char **argv)
{
    std::cout << "\e[1m*** Hikvision Visible and Thermal Data Downloader ***\e[0m\n\n"
              << "\e[1mUsage: \e[0m" << argv[0] << " <parameters> \n\n"
              << "\e[1mParameters:\e[0m\n"
              << "\t-h,--help     \tShow this help message\n"
              << "\t-i,--ip       \tCamera IP address\n"
              << "\t-u,--user     \tCamera user name\n"
              << "\t-p,--pass     \tCamera password\t\t Quote with '' to escape special characters\n"
              << "\t-o,--output   \tOutput files path\t Without extension\n\n"
              << "\e[1mExample:\e[0m\n"
              << "\t" << argv[0] << " --ip 0.0.0.0 --user admin --pass 'pass!@' --output ../output/abc\n\n"
              << "\t" "Will download the following files:\n"
              << "\t../output/abc.dat       \t Pixel to pixel temperatures in Celsius\n"
              << "\t../output/abc_t.jpeg    \t Thermal sensor image\n"
              << "\t../output/abc_v.jpeg    \t Visible sensor image\n"
              << std::endl;
    exit(0);
}

int parse_args(int argc, char **argv)
{
    check_if_no_params(argc, argv);
    int c;
    /* getopt_long stores the option index here. */
    int option_index = 0;
    option long_options[] =
        {
            {"ip", required_argument, 0, 'i'},
            {"user", required_argument, 0, 'u'},
            {"pass", required_argument, 0, 'p'},
            {"output", required_argument, 0, 'o'},
            {0, 0, 0, 0}};
    while (optind < argc)
    {

        c = getopt_long(argc, argv, "hi:u:p:o:",
                        long_options, &option_index);
        /* Detect the end of the options. */
        if (c == -1)
            break;

        switch (c)
        {
        case 'h':
            show_usage(argv);

        case 'i':
            ip = optarg;
            break;

        case 'u':
            user = optarg;
            break;

        case 'p':
            pass = optarg;
            break;

        case 'o':
            output = optarg;
            break;

        case '?':
            /* getopt_long already printed an error message. */
            break;

        default:
            abort();
        }
    }

    check_not_empty(ip, "Camera IP address", "--ip");
    check_not_empty(user, "Username", "--user");
    check_not_empty(pass, "Password", "--pass");
    check_not_empty(output, "Output file path", "--output");
    // printf("ip: %s\n", ip);
    // printf("user: %s\n", user);
    // printf("pass: %s\n", pass);
    // printf("output: %s\n", output_file);

    /* Print any remaining command line arguments (not options). */
    if (optind < argc)
    {
        printf("non-option ARGV-elements: ");
        while (optind < argc)
            printf("%s ", argv[optind++]);
        putchar('\n');
    }

    return 0;
}