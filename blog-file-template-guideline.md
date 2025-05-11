## ✍️ MDX Article Writing Guide

Follow this guide to create consistent, valid, and publish-ready MDX articles.

---

### 1. 📄 Filename

* Use **kebab-case**
* End with `.mdx`
  *Example: `my-new-article.mdx`*

---

### 2. 🔖 Frontmatter Block

Start with a YAML block wrapped in `---`.
**Required fields:**

```yaml
---
title: A clear title under 80 characters
pubDate: 'YYYY-MM-DD'
description: 'A concise summary under 250 characters'
image: 'https://ik.imagekit.io/quadrate/assets/img/dotnetevangelist/hero-image-placeholder.png?updatedAt=1746911450655' # will replace later
tags: ['tag1', 'tag2']
draft: false
---
```

Use **single quotes** for all string values.

---

### 3. 📝 Article Content

* Start with `# Title` matching the frontmatter
* Use headings (`##`, `###`) for structure
* Write in Markdown (with JSX if needed)
* Include:

  * Bullet lists
  * Numbered lists
  * Code blocks with language specified
    *Example:*

    ```js
    console.log('Hello, world!');
    ```

---

### 4. ✅ Best Practices

* Keep formatting consistent with `data/posts` files
* Keep writing clear, concise, and informative
* Ensure:

  * Valid frontmatter
  * Proper Markdown/JSX syntax
  * Full URLs in the `image` field

---

### 5. 📁 Saving

* Save the `.mdx` file in the `data/posts` directory

---

### 🧩 Quick Template

```mdx
---
title: My Article Title
date: 'YYYY-MM-DD'
description: 'A brief summary of what this article covers.'
image: 'https://ik.imagekit.io/quadrate/assets/img/dotnetevangelist/hero-image-placeholder.png?updatedAt=1746911450655'
tags: ['tag1', 'tag2']
draft: false
---

# My Article Title

Introductory paragraph.

## Section Heading

content here.
```

---

