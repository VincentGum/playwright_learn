# Playwright 知识要点

## 概述

Playwright 是由微软开发的现代端到端测试框架，支持 Chromium、Firefox 和 WebKit 内核的浏览器。它提供了可靠的自动化测试能力，特别适合测试现代 Web 应用。

## 核心特性详解

### 🚀 跨浏览器支持
**解释**：Playwright 原生支持所有现代浏览器引擎，包括 Chromium（Chrome、Edge）、Firefox 和 WebKit（Safari）。这意味着你可以在不同的浏览器环境中运行相同的测试代码，确保应用在所有平台上的表现一致。

**要点**：
- 无需额外配置即可在多个浏览器上运行测试
- 浏览器版本由 Playwright 团队维护，确保环境一致性
- 支持无头（Headless）和有头（Headed）模式

### 🤖 agent能力
Playwright Test Agents 是一组由 AI 驱动的智能助手，它们通过分工协作来简化和增强测试开发流程：

Planner（规划者）：扮演项目架构师角色，自动探索 Web 应用程序的界面和功能，分析用户交互流程，识别需要测试的关键场景，并生成结构化的测试策略和实施方案。

Generator（生成者）：作为代码编写专家，读取 Planner 制定的测试计划，自动转化为可执行的 Playwright 测试代码，遵循最佳实践生成可靠、可维护的自动化脚本。

Healer（治愈者）：担任测试维护工程师，当测试因界面变化或环境问题而失败时，自动诊断失败原因，修复损坏的元素选择器，并更新测试代码以恢复测试套件的健康状态。

这三个智能体形成完整的工作闭环：规划→生成→维护，大幅降低了测试开发和维护的技术门槛。
### ⏱️ 智能自动等待
**解释**：Playwright 在执行操作前会自动等待元素达到可交互状态。它会检查元素是否已附加到 DOM、是否可见、是否可交互（未被禁用、未被遮挡）、是否稳定（不在动画中）。
**原理**：Playwright 的自动等待机制基于智能条件检测系统，彻底告别了传统测试中不可靠的固定时间等待。其核心原理是：

在执行每个操作前，Playwright 会综合评估多个维度的就绪条件：检查目标元素是否已稳定存在于 DOM 中、是否可见且未被遮挡、是否处于可交互状态、是否已完成所有动画效果。同时还会监控相关的网络请求状态，确保页面达到真正的"就绪"状态。

这种基于实际条件而非固定时间的等待策略，让 Playwright 能够自适应不同性能的环境，在保证测试稳定性的同时最大化执行效率，从根本上解决了传统自动化测试中因时机问题导致的随机失败难题。

**要点**：
- 大大减少测试的"flakiness"（不确定性）
- 无需手动编写 `sleep` 或复杂的等待逻辑
- 提高测试的稳定性和可靠性

### 🎯 强大的选择器引擎
**解释**：除了标准的 CSS 选择器和 XPath，Playwright 还提供了基于文本内容、布局位置等更智能的元素定位方式。

**要点**：
- `text=Login` - 通过文本内容定位
- `:near(.item)` - 通过相对位置定位
- `:has-text("error")` - 通过包含文本定位
- 支持链式选择器

### 🌐 网络拦截与 Mock
**解释**：可以拦截和修改网络请求，模拟不同的 API 响应，测试应用在各种网络条件下的行为。

**要点**：
- 测试错误处理逻辑
- 模拟慢网络或超时
- 避免对真实后端服务的依赖
- 测试边缘情况

### 🖼️ 浏览器上下文
**解释**：浏览器上下文是独立的浏览器会话，类似于隐身模式。每个上下文都有独立的 Cookie、LocalStorage 等数据，彼此完全隔离。

**要点**：
- 测试多用户场景
- 并行执行测试用例
- 避免测试间的相互影响
- 模拟不同的用户权限

### 📱 移动端模拟
**解释**：可以模拟移动设备的浏览器环境，包括视口大小、设备像素比、触摸事件等。

**要点**：
- 测试响应式设计
- 验证移动端用户体验
- 支持设备预设（iPhone、iPad 等）

### 🎥 代码录制工具
**解释**：通过录制用户在浏览器中的操作，自动生成对应的测试代码。

**要点**：
- 快速创建测试脚本原型
- 学习 Playwright API 的有效方式
- 调试测试问题的有用工具

## 环境搭建与初始化

### 安装步骤
```bash
# 初始化新的 Playwright 项目
npm init playwright@latest

# 或手动安装到现有项目
npm install @playwright/test
npx playwright install
```

### 项目验证
```bash
# 运行示例测试
npx playwright test

# 查看测试报告
npx playwright show-report

# 使用代码录制工具
npx playwright codegen https://example.com
```

## 基础用法详解

### 测试结构
```javascript
const { test, expect } = require('@playwright/test');

test('基本测试示例', async ({ page }) => {
  // 导航到目标页面
  await page.goto('https://example.com');
  
  // 验证页面标题
  await expect(page).toHaveTitle('Example Domain');
  
  // 验证页面包含特定文本
  await expect(page.locator('body')).toContainText('Example');
});
```

**解释**：
- `test` 函数定义测试用例
- `page` fixture 提供页面操作能力
- `expect` 用于断言验证
- 所有操作都是异步的，使用 `await` 关键字

### 元素定位策略
```javascript
// CSS 选择器 - 最常用的定位方式
await page.locator('button.submit').click();

// 文本定位 - 适合有明确文本的元素
await page.locator('text=Sign In').click();

// XPath - 复杂的定位场景
await page.locator('//button[@id="submit"]').click();

// 组合选择器 - 更精确的定位
await page.locator('div.header >> text=Welcome').click();
```

**最佳实践**：
- 优先使用 `data-testid` 属性进行定位
- 避免使用易变的 CSS 类名
- 文本定位要确保文本内容稳定

### 常用交互操作
```javascript
// 点击操作
await page.locator('#button').click();
await page.locator('#button').dblclick();

// 输入操作
await page.locator('#input').fill('Hello World');
await page.locator('#input').press('Enter');

// 选择操作
await page.locator('select').selectOption('value1');

// 文件操作
await page.locator('input[type="file"]').setInputFiles('file.txt');
```

## 进阶技巧详解

### 浏览器上下文管理
```javascript
test('多用户聊天场景', async ({ browser }) => {
  // 创建两个独立的浏览器上下文
  const aliceContext = await browser.newContext();
  const bobContext = await browser.newContext();
  
  const alicePage = await aliceContext.newPage();
  const bobPage = await bobContext.newPage();

  // 用户 Alice 登录
  await alicePage.goto('/chat');
  await alicePage.fill('#username', 'alice');
  await alicePage.click('#login');
  
  // 用户 Bob 登录
  await bobPage.goto('/chat');
  await bobPage.fill('#username', 'bob');
  await bobPage.click('#login');
  
  // Alice 发送消息
  await alicePage.fill('#message', 'Hello Bob!');
  await alicePage.click('#send');
  
  // Bob 应该收到消息
  await expect(bobPage.locator('.message:has-text("Hello Bob!")')).toBeVisible();
});
```

**应用场景**：
- 聊天应用测试
- 协作工具测试
- 多用户并发操作验证

### 多标签页处理
```javascript
test('新标签页操作', async ({ page }) => {
  await page.goto('/dashboard');
  
  // 监听新标签页打开事件
  const [newPage] = await Promise.all([
    page.context().waitForEvent('page'),
    page.click('a[target="_blank"]') // 点击打开新标签页的链接
  ]);
  
  // 等待新页面加载完成
  await newPage.waitForLoadState('domcontentloaded');
  
  // 在新标签页中操作
  await newPage.click('#action-button');
  
  // 切换回原标签页
  await page.bringToFront();
  await page.click('#refresh');
});
```

**应用场景**：
- 测试在新窗口打开的功能
- 验证多标签页间的数据同步
- 测试第三方登录流程

### 网络拦截与 Mock
```javascript
test('API 错误处理测试', async ({ page }) => {
  // 拦截 API 请求并返回错误响应
  await page.route('**/api/user/profile', route => {
    route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({
        error: 'Internal Server Error',
        message: 'Database connection failed'
      })
    });
  });

  await page.goto('/profile');
  
  // 验证应用正确处理了 API 错误
  await expect(page.locator('.error-message')).toContainText('服务暂时不可用');
  await expect(page.locator('.retry-button')).toBeVisible();
});

test('模拟空数据状态', async ({ page }) => {
  await page.route('**/api/orders', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ orders: [], total: 0 })
    });
  });

  await page.goto('/orders');
  await expect(page.locator('.empty-state')).toBeVisible();
});
```

**应用场景**：
- 测试错误处理逻辑
- 模拟各种数据状态
- 加速测试执行（避免真实 API 调用）
- 测试第三方服务不可用的情况

## 项目配置详解

### 配置文件示例
```javascript
// playwright.config.js
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  // 测试文件所在目录
  testDir: './tests',
  
  // 全局超时时间
  timeout: 30000,
  
  // 每个测试的超时时间
  expect: {
    timeout: 5000
  },
  
  // 并行执行测试
  fullyParallel: true,
  
  // 失败时重试次数
  retries: process.env.CI ? 2 : 0,
  
  // 报告配置
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results.json' }],
    ['junit', { outputFile: 'results.xml' }]
  ],
  
  // 全局配置
  use: {
    // 基础 URL，测试中可以使用相对路径
    baseURL: 'http://localhost:3000',
    
    // 截图配置
    screenshot: 'only-on-failure',
    
    // 视频录制
    video: 'retain-on-failure',
    
    // 追踪文件
    trace: 'on-first-retry',
  },

  // 项目配置 - 不同浏览器环境
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],

  // Web 服务器配置
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

### 自定义 Fixture
```javascript
// fixtures/auth.js
const { test: base, expect } = require('@playwright/test');

exports.test = base.extend({
  authenticatedPage: async ({ page }, use) => {
    // 登录逻辑
    await page.goto('/login');
    await page.fill('#username', process.env.TEST_USERNAME);
    await page.fill('#password', process.env.TEST_PASSWORD);
    await page.click('button[type="submit"]');
    
    // 验证登录成功
    await expect(page.locator('.user-menu')).toBeVisible();
    
    // 将已登录的页面传递给测试用例
    await use(page);
  },
  
  adminPage: async ({ page }, use) => {
    // 管理员登录逻辑
    await page.goto('/admin/login');
    await page.fill('#username', process.env.ADMIN_USERNAME);
    await page.fill('#password', process.env.ADMIN_PASSWORD);
    await page.click('button[type="submit"]');
    await expect(page.locator('.admin-dashboard')).toBeVisible();
    
    await use(page);
  },
});
```

## 最佳实践

### 选择器策略
```javascript
// ✅ 推荐 - 使用稳定的选择器
await page.locator('[data-testid="submit-button"]').click();
await page.locator('#main-navigation').click();

// ❌ 避免 - 使用易变的 CSS 类名
await page.locator('.btn-primary.col-md-3.pull-right').click();
await page.locator('div:nth-child(3) > span > a').click();
```

### 页面对象模式
```javascript
// pages/LoginPage.js
class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.submitButton = page.locator('button[type="submit"]');
    this.errorMessage = page.locator('.error-message');
  }
  
  async navigate() {
    await this.page.goto('/login');
  }
  
  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
  
  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }
}

module.exports = LoginPage;

// 在测试中使用
test('用户登录失败', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login('wrong-user', 'wrong-password');
  await expect(loginPage.errorMessage).toContainText('登录失败');
});
```

### 测试组织
```javascript
test.describe('用户管理', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/users');
  });
  
  test('创建新用户', async ({ page }) => {
    await page.click('#create-user');
    await page.fill('#name', 'Test User');
    await page.click('#save');
    await expect(page.locator('.success-message')).toBeVisible();
  });
  
  test('搜索用户', async ({ page }) => {
    await page.fill('#search', 'john');
    await page.press('#search', 'Enter');
    await expect(page.locator('.user-list')).toContainText('john');
  });
  
  test('删除用户', async ({ page }) => {
    await page.click('.user-item:first-child .delete');
    await page.click('#confirm-delete');
    await expect(page.locator('.user-item')).toHaveCount(2);
  });
});
```

## Demo 示例

### 完整的登录测试流程
```javascript
const { test, expect } = require('@playwright/test');

test('完整的用户登录流程', async ({ page }) => {
  // 1. 导航到登录页面
  await page.goto('/login');
  
  // 2. 验证登录页面元素
  await expect(page.locator('h1')).toContainText('用户登录');
  await expect(page.locator('#username')).toBeVisible();
  await expect(page.locator('#password')).toBeVisible();
  
  // 3. 填写登录表单
  await page.fill('#username', 'testuser@example.com');
  await page.fill('#password', 'securepassword123');
  
  // 4. 提交表单
  await page.click('button[type="submit"]');
  
  // 5. 验证登录成功
  await expect(page).toHaveURL(/.*dashboard/);
  await expect(page.locator('.welcome-message')).toContainText('欢迎回来');
  await expect(page.locator('.user-avatar')).toBeVisible();
  
  // 6. 验证导航菜单更新
  await expect(page.locator('.nav-item:has-text("仪表盘")')).toHaveClass(/active/);
});
```

### 电商购物流程测试
```javascript
const { test, expect } = require('@playwright/test');

test('完整的电商购物流程', async ({ page }) => {
  // 浏览商品
  await page.goto('/products');
  await page.click('.product-card:first-child');
  
  // 查看商品详情
  await expect(page.locator('.product-title')).toBeVisible();
  await expect(page.locator('.product-price')).toBeVisible();
  
  // 添加到购物车
  await page.click('#add-to-cart');
  await expect(page.locator('.cart-count')).toHaveText('1');
  
  // 进入购物车
  await page.click('.cart-icon');
  await expect(page).toHaveURL(/.*cart/);
  await expect(page.locator('.cart-item')).toHaveCount(1);
  
  // 进入结算流程
  await page.click('#checkout');
  await expect(page).toHaveURL(/.*checkout/);
  
  // 填写配送信息
  await page.fill('#name', 'Test User');
  await page.fill('#address', '123 Test Street');
  await page.fill('#city', 'Test City');
  
  // 选择支付方式
  await page.click('#payment-method-credit-card');
  
  // 提交订单
  await page.click('#place-order');
  
  // 验证订单确认
  await expect(page).toHaveURL(/.*order-confirmed/);
  await expect(page.locator('.order-success')).toBeVisible();
});
```

### API Mock 测试示例
```javascript
const { test, expect } = require('@playwright/test');

test('模拟第三方支付网关', async ({ page }) => {
  // 拦截支付网关 API 调用
  await page.route('https://payment-gateway.com/api/charge', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        success: true,
        transactionId: 'mock_txn_123456789',
        message: 'Payment processed successfully'
      })
    });
  });

  await page.goto('/checkout');
  
  // 填写支付信息
  await page.fill('#card-number', '4111111111111111');
  await page.fill('#expiry-date', '12/25');
  await page.fill('#cvv', '123');
  
  // 提交支付
  await page.click('#pay-now');
  
  // 验证支付成功
  await expect(page).toHaveURL(/.*order-complete/);
  await expect(page.locator('.transaction-id')).toContainText('mock_txn_123456789');
  await expect(page.locator('.success-message')).toContainText('支付成功');
});
```

## Playwright Test Agents (AI 功能)

### 什么是 Playwright Test Agents？

Playwright Test Agents 是一组由 AI 驱动的智能体，它们通过自然语言来帮助创建和维护测试。这代表了 Playwright 向更智能的测试自动化发展的方向。

### 三大智能体详解

#### 🧠 Planner (规划者)
**功能**：自动探索你的网站，分析哪些功能需要测试，并生成详细的测试计划。

**工作流程**：
1. 分析网站结构和用户流程
2. 识别关键功能和边缘情况
3. 生成全面的测试策略
4. 确定测试优先级

**使用场景**：新项目测试规划、回归测试策略制定

#### ⚙️ Generator (生成者)
**功能**：读取 Planner 制定的测试计划，自动生成可执行的 Playwright 测试代码。

**工作流程**：
1. 解析测试计划
2. 生成对应的测试代码结构
3. 添加必要的断言和验证
4. 优化代码结构和可读性

**使用场景**：快速生成测试代码骨架、批量创建测试用例

#### 🩹 Healer (治愈者)
**功能**：当测试失败时，自动分析原因并修复有问题的代码。

**工作流程**：
1. 分析测试失败原因
2. 识别失效的元素选择器
3. 寻找新的有效选择器
4. 自动更新测试代码

**使用场景**：测试维护、UI 变更后的测试修复

### 使用流程详解

#### 1. 环境准备
```bash
# 确保使用 Playwright v1.56 或更高版本
npm list @playwright/test

# 初始化 Agents 功能
npx playwright init-agents
```

#### 2. 创建种子文件
```javascript
// tests/seed.spec.ts
import { test, expect } from '@playwright/test';

test.describe('电商网站测试套件', () => {
  test('基础导航测试', async ({ page }) => {
    // AI 将在此基础之上生成更多测试代码
    await page.goto('https://your-ecommerce-site.com');
    
    // 可以添加一些基础交互作为起点
    await page.click('text=产品');
    await expect(page).toHaveURL(/.*products/);
  });
});
```

#### 3. 与智能体协作
```bash
# 1. 让 Planner 分析网站并生成测试计划
npx playwright agents plan --site https://your-site.com

# 2. 让 Generator 根据计划生成测试代码
npx playwright agents generate --plan ./test-plan.json

# 3. 运行测试，如果失败，使用 Healer 修复
npx playwright test
npx playwright agents heal --test ./failed-test.spec.js
```

### 优势与局限

#### ✅ 优势
1. **降低门槛**：非技术人员也能参与测试创建
2. **提高效率**：快速生成测试代码，减少手动编写时间
3. **智能维护**：自动修复因 UI 变更导致的测试失败
4. **探索性测试**：自动发现和测试边缘情况

#### ⚠️ 局限
1. **发展阶段**：功能仍在不断完善中
2. **复杂场景**：对于复杂的业务逻辑可能不够准确
3. **定制需求**：高度定制化的测试场景仍需人工干预
4. **学习曲线**：需要时间学习如何与 AI 智能体有效协作

### 实际应用建议

1. **渐进式采用**：从简单的测试场景开始尝试
2. **人工验证**：AI 生成的代码需要人工审查和优化
3. **结合传统方法**：将 AI 生成与手动编写相结合
4. **持续学习**：关注 Playwright Agents 的更新和改进

## 总结

Playwright 提供了一个完整的现代 Web 应用测试解决方案，从基础的元素操作到复杂的多上下文管理，再到创新的 AI 驱动测试。其核心优势在于：

1. **可靠性**：智能等待机制大大减少测试的不确定性
2. **跨平台一致性**：原生支持所有现代浏览器
3. **开发体验**：优秀的 API 设计和丰富的工具链
4. **扩展性**：支持自定义 Fixture 和复杂的测试场景
5. **智能化**：通过 Test Agents 引入 AI 能力，提升测试效率

结合 Test Agents，Playwright 正在向更智能的测试自动化方向发展，让测试编写和维护变得更加高效和直观。随着技术的不断成熟，我们可以期待更多的智能功能被加入到测试工作流中。# playwright_learn
