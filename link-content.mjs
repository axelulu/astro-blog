import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// 获取当前文件夹的路径
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 定义博客仓库的 content 文件夹路径
const BLOG_CONTENT_DIR = path.resolve(__dirname, '../blog')

// 定义主题仓库的 content 文件夹路径
const THEME_CONTENT_DIR = path.resolve(__dirname, 'src/content/blog')

// 删除主题仓库中的 content 文件夹
if (fs.existsSync(THEME_CONTENT_DIR)) {
  fs.rmSync(THEME_CONTENT_DIR, { recursive: true, force: true })
  // eslint-disable-next-line no-console
  console.info(`已删除旧的 ${THEME_CONTENT_DIR} 文件夹`)
}

// 创建新的软链接
fs.symlinkSync(BLOG_CONTENT_DIR, THEME_CONTENT_DIR, 'dir')
// eslint-disable-next-line no-console
console.info(`已创建新的软链接 ${THEME_CONTENT_DIR} -> ${BLOG_CONTENT_DIR}`)
