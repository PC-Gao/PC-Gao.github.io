# Homepage Migration to mdBook（个人主页迁移到 mdBook）

> Updated: 2026-04-12（更新日期）

## 为什么迁移

原来的个人主页基于 Jekyll 学术模板，虽然能用，但目录结构偏重，夹杂了论文、讲座、教学等大量与当前个人站点无关的模板内容，不适合长期维护技术页面、Mabinogi 分区和 Maintenance（维护）文档。

## 这次做了什么

- 将站点改成真正的 `mdBook` 结构
- 用 `src/SUMMARY.md` 统一维护左侧目录
- 重新整理成 `Tech Notes（技术笔记） / Mabinogi / Maintenance（维护） / Archive（归档）` 这套结构
- 将技术内容拆成 `Guides（技术分享）` 和 `Thoughts（技术杂谈）`
- 把 `Archive（内容归档）` 放到左侧导航最下方
- 改为通过 GitHub Pages 自动构建和发布

## 本次更新

- 2026-04-12：统一 `Maintenance（维护）`、`Archive（归档）`、`Mabinogi Lounge（Mabinogi 水区）` 等命名，并同步整理结构说明

## 现在怎么维护

- `Guides（技术分享）` 和 `Thoughts（技术杂谈）` 写在 `src/blog/`
- Mabinogi 相关内容写在 `src/notes/`
- Maintenance（维护）记录写在 `src/maintenance/`
- Archive（内容归档）页面写在 `src/archive.md`

## 为什么 mdBook 更合适

对于长期维护的个人技术站点来说，`mdBook` 的目录组织、章节跳转和全文检索更接近“文档 / 手册”的体验，比临时拼起来的首页模板更稳定，也更适合后续持续扩写。
