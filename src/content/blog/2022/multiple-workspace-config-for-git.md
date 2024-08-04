---
title: Git 的多工作区配置
description: 一个系统上多 Git 账户信息共存
createdTime: 2022-04-19
tags: ['git', 'workspace']
---

为了在一台设备上，配置不同工作区路径下使用不同 Git 账号，可以使用接下来所属的方式一劳永逸以实现。

## includeIf

该方式，在不同的平台上，就只有路径写法的不同

### macOS

`/Users/<username>/.gitconfig` 文件中写入如下配置内容

```bash
# GitHub
[includeIf "gitdir:~/Work-Space/Personal/GitHub/"]
  path = .gitconfig-github

# JihuLab
[includeIf "gitdir:~/Work-Space/Personal/JiHuLab/"]
  path = .gitconfig-jihulab

# Wrok
## your work path
[includeIf "gitdir:~/Work-Space/Company/xxx/"]
  path = .gitconfig-company-xxx
```

1. 其中 `gitdir:~/Work-Space/Personal/GitHub/` 就是指定工作区路径，如果你的工作区路径是 `~/Work-Space/Personal/GitHub/`，那么就是 `gitdir:~/Work-Space/Personal/GitHub/`。

   - 注意：
     1. **`gitdir:` 和后续的路径之间，不要自作主张的添加一个空格，否则配置将失效。**
     2. **路径也必须使用 `/` 结尾，否则配置将失效。**

2. 其中的 `path = .gitconfig-github` 就是指定该工作区的配置文件路径。假如你的工作区配置文件就在 `/Users/<username>/` 下，就直接写入 `path = .gitconfig-github` 就行，也建议这样写，便于管理。

   - `.gitconfig-github` 文件中写入如下配置内容。其文件名不限制，只要你能找得到就行。

     ```bassh
     [user]
       name = <username>
       email = <username>@gmail.com
     ```

## workspace

这个是使用 GitHub Copilt 写该文档的时候，发现的……

```bash
git config --global --add workspace.path /Users/<username>/workspace
git config --global --add workspace.name <workspace name>
git config --global --add workspace.gitconfig /Users/<username>/workspace/<workspace name>/.gitconfig
```

看命令内容，在全局的 gitconfig 文件内容下去指定各个工作区的 path/name/config。其实这个跟上面的 includeIf 方式是类似的。

理论上是可以的，不过待验证。

## 常用的 config

顺便贴上一些常用的 config

```bash
[pull]
# pull 时，合并分支不使用 rebase，而是直接用 merge
  rebase = false
[init]
# 设置默认分支名称
  defaultBranch = main
```
