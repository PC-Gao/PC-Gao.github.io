# PC Gao 的 mdBook 主页

这个仓库当前使用 `mdBook` 维护，并通过 GitHub Pages 自动构建发布。

## 当前结构

- `src/SUMMARY.md`：左侧导航定义
- `src/about.md`：站点主入口页面
- `src/blog/`：`Guides（技术分享）` 与 `Thoughts（技术杂谈）`
- `src/notes/`：Mabinogi 分区
- `src/maintenance/`：迁移记录与 Maintenance（维护）文档
- `src/archive.md`：Archive（内容归档）页面
- `theme/custom.css`：样式覆盖
- `theme/page-toc.js`：右侧页内目录
- `theme/giscus.js`：评论区脚本
- `theme/root-redirect.js`：根路径跳转脚本
- `theme/sidebar-numbering.js`：左侧目录重编号脚本
- `book.toml`：mdBook 配置

## 内容组织

站点当前按下面这套结构组织：

- `Tech Notes（技术笔记）`：技术内容主分区
- `Guides（技术分享）`：完整的技术文章、实验记录和项目复盘
- `Thoughts（技术杂谈）`：更短的技术杂谈、碎片和想法
- `Mabinogi`：游戏相关记录
- `Maintenance（维护）`：站点迁移与维护文档
- `Archive（归档）`：全站索引，位于左侧导航最下方

其中：

- `src/blog/index.md` 是 `Guides（技术分享）` 总览页
- `src/blog/tech-rambles.md` 是 `Thoughts（技术杂谈）`

## 本地预览

```bash
mdbook serve
```

默认会启动在 `http://localhost:3000`。

如果当前 Windows 环境下 `mdbook serve` 出现端口绑定问题，可以改用：

```bash
mdbook build
python -m http.server 3000 --directory book
```

## 发布

推送到 `master` 后，GitHub Actions 会自动构建并发布到 GitHub Pages。

维护约定：

- 迁移或结构调整相关文档统一写在 `src/maintenance/` 与 `src/site-migration-log.md`
- 每次更新记录都应补一行 `Updated: YYYY-MM-DD（更新日期）`
