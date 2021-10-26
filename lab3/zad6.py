print("lab3 zad6")

import paramiko;
from config import password

ssh_client = paramiko.SSHClient()
ssh_client.load_system_host_keys()
ssh_client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

ssh_client.connect(hostname="sigma.ug.edu.pl", username="lmalinowska", key_filename="/home/lmalinowska/.ssh/id_rsa.pub", password=password)
ftp_client = ssh_client.open_sftp()
ftp_client.put("plik1.txt", "./Semestr3_2/Protokoly/malinowska-ludwika/lab3/plik1.txt")
ftp_client.get("hello.txt", "./hello.txt")

stdin, stdout, stderr = ssh_client.exec_command('ls /home/lmalinowska/Semestr3_2/Protokoly/malinowska-ludwika/lab3')
#stdin, stdout, stderr = ssh_client.exec_command('ls')
print(stdout.readlines())

ftp_client.close()
ssh_client.close()
