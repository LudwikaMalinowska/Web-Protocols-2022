print("hello")

import paramiko;
from config import password

ssh_client = paramiko.SSHClient()
ssh_client.load_system_host_keys()
ssh_client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh_client.connect(hostname="sigma.ug.edu.pl", user="lmalinowska", key_filename="/home/lmalinowska/.ssh/id_rsa.pub", password=password)

stdin, stdout, stderr = ssh_client.exec_command('ls')
print(stdout.readlines())

ssh_client.close()
