# Nginx安装和基础代理配置
证书生成命令:
```bash
openssl req -x509 -newkey rsa:2048 -nodes -sha256 -keyout localhost-privkey.pem -out localhost-cert.pem
```