# PC Gao 的 mdBook 主页

这个仓库现在基于 `mdBook` 维护，并部署到 GitHub Pages。

## 目录结构

- `src/SUMMARY.md`：左侧目录树
- `src/projects/`：项目章节
- `src/blog/`：博客章节
- `src/notes/`：闲谈和短记录
- `theme/custom.css`：少量自定义样式
- `book.toml`：mdBook 配置

## 本地预览

```bash
mdbook serve
```

默认会启动在 `http://localhost:3000`。

## 发布

推送到 `master` 后，GitHub Actions 会自动构建并发布到 GitHub Pages。
