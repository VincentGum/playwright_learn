# Playwright.dev — 基本交互与展示测试计划

## 概要
- 被测页面：`https://playwright.dev/`（Playwright官方网站）
- 页面类型：技术文档/营销网站，包含导航菜单、语言选择、主题切换、社区链接等多种交互元素
- 目标：验证页面的基本UI展示、导航功能、语言选择、主题切换及外部链接功能

---

## 页面结构与关键元素

### 导航栏（Navigation Bar）
- **Logo**：Playwright logo（可点击，返回首页）
- **主导航链接**：Docs、API、Community
- **语言选择器**：Node.js（默认）、Python、Java、.NET（下拉菜单）
- **外部链接**：GitHub repository、Discord server
- **主题切换按钮**：Dark/Light mode toggle（当前状态：system mode）
- **搜索按钮**：Command+K快捷键支持

### 主要内容区域
- **Hero Banner**：
  - 标题："Playwright enables reliable end-to-end testing for modern web apps."
  - CTA按钮："Get started"
  - Star计数："79k+ stargazers on GitHub"
- **特性卡片**：
  - "Any browser • Any platform • One API"
  - "Resilient • No flaky tests"
  - "No trade-offs • No limits"
  - "Full isolation • Fast execution"
  - "Powerful Tooling"（含Codegen、Inspector、Trace Viewer链接）
- **公司案例展示**：VS Code、Bing、Outlook、Disney+、Material UI等logo链接

### 底部导航（Footer）
- **Learn** 分类：Getting started、Playwright Training、Learn Videos、Feature Videos
- **Community** 分类：Stack Overflow、Discord、Twitter、LinkedIn
- **More** 分类：GitHub、YouTube、Blog、Ambassadors
- **版权信息**：Copyright © 2025 Microsoft

---

## 测试场景

### 场景 1：页面加载与初始展示（Happy Path）

**目标**：确认页面正确加载并显示所有关键元素。

**前置条件**：新浏览器上下文；第一次访问。

**步骤**：
1. 打开浏览器并导航到 `https://playwright.dev/`。
2. 等待页面完全加载。
3. 验证页面标题为 `"Fast and reliable end-to-end testing for modern web apps | Playwright"`。
4. 检查关键元素可见性：Logo、导航链接、Hero标题、CTA按钮。

**预期结果**：
- 页面加载成功，HTTP 200；
- 页面标题正确；
- 所有关键UI元素可见且布局正确。

**成功标准**：所有元素按预期呈现。

**失败条件**：页面无法加载、标题不匹配或核心元素缺失。

---

### 场景 2：导航链接功能（Happy Path）

**目标**：验证导航链接可正常跳转。

**前置条件**：页面已加载。

**步骤**：
1. 点击"Docs"链接。
2. 验证页面导航到文档页面。
3. 点击Logo返回首页。
4. 再次点击"API"链接。
5. 验证页面导航到API文档页面。
6. 点击"Community"链接。
7. 验证页面导航到社区页面。

**预期结果**：
- 每个导航链接点击后都导航到正确的目标页面；
- URL更新正确（`/docs/intro`、`/docs/api/class-playwright`、`/community/welcome`）；
- 页面内容加载成功。

**成功标准**：所有导航链接功能正常。

**失败条件**：链接无法点击、导航到错误页面或页面加载失败。

---

### 场景 3：语言/版本选择器（Dropdown）

**目标**：验证语言选择下拉菜单功能。

**前置条件**：页面已加载。

**步骤**：
1. 点击"Node.js"按钮打开语言选择下拉菜单。
2. 验证下拉菜单显示所有语言选项：Node.js、Python、Java、.NET。
3. 检查Node.js是否标记为当前选中（active状态）。
4. 点击"Python"选项。
5. 验证页面导航到Python版本的Playwright网站（`/python/`）。
6. 返回首页并重复步骤1-3。

**预期结果**：
- 下拉菜单能正常打开/关闭；
- 所有语言选项可见且可点击；
- 选中语言选项后导航到对应版本网站；
- 当前语言显示为"active"状态。

**成功标准**：语言选择功能正常。

**失败条件**：下拉菜单无法打开、选项不完整或导航失败。

---

### 场景 4：主题切换（Dark/Light Mode）

**目标**：验证主题切换功能。

**前置条件**：页面已加载。

**步骤**：
1. 观察导航栏中的主题切换按钮（当前状态：system mode）。
2. 点击主题切换按钮。
3. 验证页面主题改变（背景色、文字色调改变）。
4. 再次点击主题切换按钮。
5. 验证主题切换回原状态或切换到另一种模式。
6. 刷新页面，检查主题状态是否被保存。

**预期结果**：
- 主题切换按钮可点击；
- 页面视觉样式随主题改变；
- 用户偏好可能被保存（localStorage或cookie）。

**成功标准**：主题切换功能正常，视觉变化明显。

**失败条件**：按钮无法点击、页面样式不改变或主题切换不完全。

---

### 场景 5：外部链接验证

**目标**：验证指向外部网站的链接正常工作。

**前置条件**：页面已加载。

**步骤**：
1. 在新标签页中（或监听popup）点击"GitHub repository"链接。
2. 验证导航到 `https://github.com/microsoft/playwright`。
3. 返回首页，点击"Discord server"链接。
4. 验证导航到Discord邀请链接（`https://aka.ms/playwright/discord`）。
5. 测试Hero区的"Star microsoft/playwright on GitHub"链接。
6. 测试底部社交链接（Twitter、LinkedIn等）。

**预期结果**：
- 所有外部链接在新标签打开或当前标签打开（根据href或target属性）；
- 目标URL正确；
- 外部网站可访问。

**成功标准**：所有外部链接功能正常。

**失败条件**：链接无法点击、URL不正确或目标网站无法访问。

---

### 场景 6：搜索功能（可选）

**目标**：验证搜索按钮和快捷键。

**前置条件**：页面已加载。

**步骤**：
1. 点击搜索按钮（或按Command+K/Ctrl+K快捷键）。
2. 验证搜索弹框/输入框打开。
3. 输入搜索关键词（如"test"）。
4. 验证搜索结果显示。
5. 关闭搜索弹框。

**预期结果**：
- 搜索功能可启动；
- 快捷键正常工作；
- 搜索结果相关且实用。

**成功标准**：搜索功能完整。

**失败条件**：搜索不可用或结果为空。

---

### 场景 7：CTA按钮（Call To Action）功能

**目标**：验证"Get started"和其他CTA按钮。

**前置条件**：页面已加载。

**步骤**：
1. 点击Hero区的"Get started"按钮。
2. 验证导航到文档开始页面（`/docs/intro`）。
3. 检查页面内容是否为安装/入门指南。

**预期结果**：
- CTA按钮可点击；
- 导航到正确的入门页面；
- 目标页面内容相关。

**成功标准**：CTA功能正常。

**失败条件**：按钮无法点击或导航失败。

---

### 场景 8：响应式布局与视觉呈现（跨浏览器）

**目标**：验证页面在不同分辨率和浏览器中的表现。

**前置条件**：页面已加载。

**步骤**：
1. 在不同视口宽度测试（桌面：1920px、平板：768px、手机：375px）。
2. 验证导航菜单在小屏幕上的表现（可能出现汉堡菜单）。
3. 验证内容布局不破损、文字可读。
4. 检查图片加载和缩放。
5. 在不同浏览器（Chrome、Firefox、Safari）测试。

**预期结果**：
- 布局响应式，不同屏幕尺寸下可正常显示；
- 元素无重叠或破损；
- 内容在所有浏览器中可读。

**成功标准**：跨浏览器和设备兼容性良好。

**失败条件**：布局破损、内容不可读或特定浏览器渲染失败。

---

### 场景 9：公司案例链接验证（Logo点击）

**目标**：验证"Chosen by companies and open source projects"部分的logo链接。

**前置条件**：页面已加载并滚动到案例展示区。

**步骤**：
1. 点击"VS Code" logo链接。
2. 验证导航到 `https://code.visualstudio.com`。
3. 返回首页，点击"Bing" logo链接。
4. 验证导航到 `https://bing.com`。
5. 测试至少3个公司logo链接。

**预期结果**：
- 所有logo都是可点击链接；
- 每个logo链接指向对应公司的正确URL。

**成功标准**：所有公司logo链接正常。

**失败条件**：logo不可点击或链接不正确。

---

### 场景 10：页面性能与加载时间（非功能性）

**目标**：验证页面性能指标。

**前置条件**：新浏览器会话，清除缓存。

**步骤**：
1. 打开开发者工具的Performance/Network选项卡。
2. 加载首页。
3. 记录页面加载时间、资源大小、首屏时间。
4. 验证加载时间在可接受范围内（通常<3秒为优秀）。

**预期结果**：
- 首页加载时间<3秒；
- 关键资源优先加载；
- 无明显性能瓶颈。

**成功标准**：页面加载性能满足预期。

**失败条件**：加载时间过长或有显著性能问题。

---

## 边界情况与异常场景

### 11. 网络异常处理
- 模拟网络慢速/离线，验证页面降级显示或加载提示。

### 12. Cookie/LocalStorage清除后的行为
- 清除浏览器数据后重新访问，验证页面行为是否正常。

### 13. JavaScript禁用后的页面显示
- 禁用JavaScript，验证静态内容是否可见（SEO友好性）。

---

## 测试执行建议

| 场景 | 自动化 | 手动 | 优先级 |
|------|------|------|--------|
| 1. 页面加载 | ✓ | ✓ | 高 |
| 2. 导航链接 | ✓ | ✓ | 高 |
| 3. 语言选择 | ✓ | ✓ | 高 |
| 4. 主题切换 | ✓ | ✓ | 中 |
| 5. 外部链接 | ✓ | ✓ | 高 |
| 6. 搜索功能 | ✓ | ✓ | 中 |
| 7. CTA按钮 | ✓ | ✓ | 高 |
| 8. 响应式布局 | ✓ | ✓ | 中 |
| 9. 公司logo链接 | ✓ | ✓ | 低 |
| 10. 性能指标 | ✓ | - | 中 |

---

## Playwright 自动化关键代码片段

```typescript
// 导航到页面
await page.goto('https://playwright.dev/');

// 验证标题
await expect(page).toHaveTitle('Fast and reliable end-to-end testing for modern web apps | Playwright');

// 点击导航链接
await page.getByRole('link', { name: 'Docs' }).click();
await expect(page).toHaveURL(/\/docs\/intro/);

// 打开语言选择器
await page.getByRole('button', { name: 'Node.js' }).click();

// 选择Python版本
await page.getByRole('link', { name: 'Python' }).click();
await expect(page).toHaveURL(/\/python\//);

// 点击主题切换
await page.getByRole('button', { name: /Switch between dark and light/ }).click();

// 验证外部链接
await page.getByRole('link', { name: /GitHub repository/ }).click();
await expect(page).toHaveURL(/github\.com\/microsoft\/playwright/);

// 验证CTA按钮
await page.getByRole('link', { name: 'Get started' }).click();
await expect(page).toHaveURL(/\/docs\/intro/);

// 验证响应式
await page.setViewportSize({ width: 375, height: 667 }); // 手机视口
```

---

## 已验证的交互与发现

✓ Logo导航功能：点击返回首页  
✓ 语言选择器：4种语言选项（Node.js、Python、Java、.NET），下拉展开正常  
✓ 主题切换按钮：可点击，当前状态为"system mode"  
✓ 导航链接：Docs、API、Community均可点击  
✓ 外部链接：GitHub、Discord链接格式正确  
✓ Hero CTA：导航到 `/docs/intro`  
✓ 公司案例区：8个公司logo，每个都是指向外部网站的链接  
✓ 底部导航：Learn、Community、More三大分类，包含10+个链接

---

**文档版本**：1.0  
**更新日期**：2025年11月28日  
**测试覆盖范围**：Playwright官方网站首页及关键交互路径
