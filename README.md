# 个人求职简历单页站

这是一个纯静态中文简历站，面向互联网 QA、测试开发、泛自动化和稳定性方向。首版只包含 `index.html`、样式文件和 PDF 简历入口，适合直接放到 Nginx 静态目录。

## 本地预览

```bash
npm test
npm run serve
```

打开 `http://127.0.0.1:4173/` 查看页面。PDF 下载入口固定为 `assets/resume.pdf`。

## 替换内容

- 在 `index.html` 中替换姓名、城市、邮箱、公司、经历、项目数据和教育信息。
- 用正式简历覆盖 `assets/resume.pdf`，保持文件名不变。
- 如果有真实头像或项目截图，可以放到 `assets/` 并在页面中引用。

## Nginx 部署

将仓库内容上传到服务器静态目录，例如 `/var/www/chenxiaoyou-blog`。示例 `server` 配置：

```nginx
server {
    listen 80;
    server_name example.com www.example.com;

    root /var/www/chenxiaoyou-blog;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location = /assets/resume.pdf {
        add_header Content-Disposition "attachment; filename=resume.pdf";
        try_files $uri =404;
    }
}
```

## 域名、DNS 与 HTTPS

- 在域名服务商处添加 DNS 解析：`A` 记录指向服务器公网 IP，`www` 可添加 `CNAME` 或另一条 `A` 记录。
- DNS 生效后，用 `curl -I http://example.com` 检查首页响应。
- 建议使用 Certbot 或服务器面板签发 HTTPS 证书，并开启 HTTP 到 HTTPS 跳转。
- 部署后验证 `https://example.com/` 和 `https://example.com/assets/resume.pdf` 都能访问。
