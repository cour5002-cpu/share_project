# 班级分享会资料沉淀平台（MVP）
 
 一个用于沉淀班级腾讯会议分享会内容的学习资料平台。
 
 本项目是纯前端站点（可直接部署到 GitHub Pages），数据存储使用 Supabase（Postgres）。视频/PPT 不上传到本站，仅保存外部链接。
 
 ## 项目功能
 
 1. 指导老师、班长或主讲人可以提交分享会资料。
 2. 分享会资料包括标题、主讲人、时间、简介、录屏链接、PPT/PDF 链接。
 3. 指导老师可能会在分享会结束后发布主题讨论，但不是每场分享会都有主题讨论。
 4. 如果某场分享会有主题讨论，学生可以提交心得、观点、收获和疑问。
 5. 学生提交心得后只需要看到“待提交 / 提交成功 / 提交失败”的提示（不展示审核进度）。
 6. 指导老师审核学生心得，并决定哪些作为精选观点公开展示。
 
 本项目不是聊天软件，不是论坛，不是网课平台，不是视频在线播放平台。
 
 ## 技术栈
 
 - HTML
 - CSS
 - JavaScript（ES Modules）
 - Bootstrap 5（CDN）
 - Supabase（Database）
 - Supabase JS SDK（CDN）
 
 ## 项目结构
 
 ```
 ├── index.html
 ├── detail.html
 ├── submit-resource.html
 ├── submit-reflection.html
 ├── teacher-review.html
 ├── css/
 │   └── style.css
 ├── js/
 │   ├── config.js
 │   ├── api.js
 │   ├── index.js
 │   ├── detail.js
 │   ├── submit-resource.js
 │   ├── submit-reflection.js
 │   └── teacher-review.js
 ├── sql/
 │   └── supabase.sql
 └── README.md
 ```
 
 ## Supabase 配置与建表
 
 1. 创建 Supabase 项目。
 2. 进入 Supabase 控制台 -> SQL Editor。
 3. 执行 `sql/supabase.sql`。
 
 ## 填写 js/config.js
 
 在 `js/config.js` 中配置：
 
 - `SUPABASE_URL`
 - `SUPABASE_ANON_KEY`
 - `TEACHER_REVIEW_CODE`
 
 示例：
 
 ```js
 export const SUPABASE_URL = "https://xxxxx.supabase.co";
 export const SUPABASE_ANON_KEY = "your-anon-key";
 export const TEACHER_REVIEW_CODE = "123456";
 ```
 
 ## GitHub Pages 部署
 
 1. 推送到 GitHub 仓库。
 2. Settings -> Pages -> Deploy from a branch。
 3. 选择分支 `main`（或默认分支）与 `/ (root)`。
 4. 保存后等待站点生成。
 
 ## 使用说明
 
 - **提交分享会资料**：打开 `submit-resource.html`，填写必填项后提交。
 - **查看详情**：打开 `index.html`，点击“查看详情”进入 `detail.html?id=...`。
 - **提交心得**：当分享会存在主题讨论时，详情页会出现“提交心得”按钮，进入 `submit-reflection.html?meeting_id=...`。
 - **老师审核精选**：打开 `teacher-review.html`，输入 `TEACHER_REVIEW_CODE` 后，将心得设为 `selected` 或 `hidden`。
 
 ## 当前 MVP 的限制
 
 - `teacher-review.html` 的口令保护不是真正安全的权限系统；正式版应接入 Supabase Auth。
 - 仅保存外部链接，不做文件上传/视频在线播放。
 - 不做标签、搜索、分类筛选。
 - 不做学生注册登录；不做匿名提交。
 - 学生端不展示 `pending/selected/hidden` 等后台状态。
 
 ## 后续扩展方向（不在本 MVP 范围内）
 
 - Supabase Auth + 角色权限。
 - 搜索/标签/分类。
 - 后台管理（例如分享会下线/隐藏）。
 
 ---
 
 # 原需求说明（保留）
 
 我要从零开发一个“班级分享会资料沉淀平台”的第一版 MVP。
 
 请严格按照以下需求生成完整项目代码，不要自行扩大需求。
 
 # 一、项目定位
 
 这是一个用于沉淀腾讯会议分享会内容的学习资料平台。
 
 核心目标：
 
 1. 指导老师、班长或主讲人可以提交分享会资料。
 2. 分享会资料包括标题、主讲人、时间、简介、录屏链接、PPT/PDF 链接。
 3. 指导老师可能会在分享会结束后发布主题讨论，但不是每场分享会都有主题讨论。
 4. 如果某场分享会有主题讨论，学生可以提交心得、观点、收获和疑问。
 5. 学生提交心得后，只需要看到“提交成功”或“提交失败/待提交”这两类状态提示。
 6. 学生提交的心得不会立即公开展示。
 7. 指导老师查看学生心得，并决定哪些作为精选观点公开展示。
 8. 同学可以在首页按时间顺序查看分享会列表，点击进入详情页查看资料和精选观点。
 
 本项目不是聊天软件，不是论坛，不是网课平台，不是视频在线播放平台。
 
 # 二、技术方案
 
 使用：
 
 - HTML
 - CSS
 - JavaScript
 - Bootstrap
 - Supabase
 
 部署方式：
 
 - GitHub Pages
 
 数据库：
 
 - Supabase
 
 文件存储：
 
 - 视频和 PPT 不上传到本项目
 - 只保存外部链接，例如网盘链接、腾讯会议云录制链接、腾讯文档链接
 
 不要使用：
 
 - Flask
 - Node 后端
 - MySQL
 - Vue
 - React
 - TypeScript
 - WebSocket
 - 微信 API
 - 腾讯会议 API
 - 文件上传服务
 
 # 三、第一版不做的功能
 
 第一版不要实现：
 
 1. 不做搜索功能。
 2. 不做标签功能。
 3. 不做分类筛选。
 4. 不做学生匿名提交。
 5. 不做学生账号登录。
 6. 不做网站内评论区。
 7. 不做文件上传。
 8. 不做视频在线播放。
 9. 不做 AI 自动总结。
 10. 不做复杂后台。
 11. 不做多角色权限系统。
 12. 不做学生端查看审核进度。
 13. 不做“已精选 / 未精选 / 已隐藏”等学生可见状态。
 
 首页只需要按照分享会时间倒序，从上到下展示列表。
 
 # 四、页面要求
 
 请生成 5 个页面：
 
 1. index.html  
 分享会列表页。
 
 2. detail.html  
 分享会详情页。
 
 3. submit-resource.html  
 分享会资料提交页。
 
 4. submit-reflection.html  
 学生心得提交页。
 
 5. teacher-review.html  
 指导老师审核精选页。
 
 # 五、页面功能详细说明
 
 ## 1. index.html
 
 首页功能：
 
 - 从 Supabase 读取 meetings 表。
 - 只展示 status = published 的分享会。
 - 按 date 时间倒序排列。
 - 从上到下展示分享会列表。
 - 不做搜索。
 - 不做标签筛选。
 - 不做分类筛选。
 - 点击“查看详情”跳转到 detail.html?id=xxx。
 
 卡片展示字段：
 
 - title 分享会标题
 - speaker 主讲人
 - speaker_role 主讲人身份
 - date 分享时间
 - description 一句话简介
 - 是否有主题讨论
 
 如果 discussion_topic 不为空，显示“有主题讨论”。  
 如果 discussion_topic 为空，显示“暂无主题讨论”。
 
 ## 2. detail.html
 
 详情页功能：
 
 - 根据 URL 参数 id 获取对应分享会。
 - 展示分享会完整信息。
 - 展示录屏链接按钮。
 - 展示 PPT/PDF 链接按钮。
 - 如果 video_url 为空，显示“暂无录屏链接”。
 - 如果 ppt_url 为空，显示“暂无 PPT/PDF 链接”。
 - 如果 discussion_topic 不为空，展示主题讨论题目和“提交心得”按钮。
 - 如果 discussion_topic 为空，显示“本场分享会暂未发布主题讨论”。
 - 读取 reflections 表中该分享会下 status = selected 的学生心得。
 - 将 selected 心得展示为“精选观点”。
 
 详情展示字段：
 
 - title
 - speaker
 - speaker_role
 - date
 - description
 - video_url
 - ppt_url
 - discussion_topic
 - remark
 - selected reflections
 
 精选观点展示字段：
 
 - student_name 学生真实姓名
 - class_name 班级
 - content 我的观点
 - gain 我的收获
 - question 我的疑问
 
 不做匿名处理，直接展示学生填写的真实姓名。
 
 ## 3. submit-resource.html
 
 资料提交页使用对象：
 
 - 指导老师
 - 班长
 - 主讲人
 
 表单字段：
 
 - title 分享会标题，必填
 - speaker 主讲人，必填
 - speaker_role 主讲人身份
 - date 分享时间，必填
 - description 一句话简介
 - video_url 录屏链接
 - ppt_url PPT/PDF 链接
 - discussion_topic 主题讨论题目，可选
 - submitter 提交人
 - remark 备注
 
 注意：
 
 - 不要添加 category 字段。
 - 不要添加 tags 字段。
 - discussion_topic 是可选字段。
 - 如果指导老师发布了主题讨论，就填写。
 - 如果本场分享会没有主题讨论，就留空。
 - 不上传视频文件。
 - 不上传 PPT 文件。
 - 只保存外部链接。
 
 提交逻辑：
 
 - 点击提交后写入 Supabase meetings 表。
 - status 默认设置为 published。
 - created_at 自动生成。
 - updated_at 自动生成。
 - 提交成功后必须弹窗提醒。
 - 提交失败后必须弹窗提醒，并提示失败原因。
 - 提交成功后可以清空表单。
 
 ## 4. submit-reflection.html
 
 ...
1. 指导老师、班长或主讲人可以提交分享会资料。
2. 分享会资料包括标题、主讲人、时间、简介、录屏链接、PPT/PDF 链接。
3. 指导老师可能会在分享会结束后发布主题讨论，但不是每场分享会都有主题讨论。
4. 如果某场分享会有主题讨论，学生可以提交心得、观点、收获和疑问。
5. 学生提交心得后，只需要看到“提交成功”或“提交失败/待提交”这两类状态提示。
6. 学生提交的心得不会立即公开展示。
7. 指导老师查看学生心得，并决定哪些作为精选观点公开展示。
8. 同学可以在首页按时间顺序查看分享会列表，点击进入详情页查看资料和精选观点。

本项目不是聊天软件，不是论坛，不是网课平台，不是视频在线播放平台。

# 二、技术方案

使用：

- HTML
- CSS
- JavaScript
- Bootstrap
- Supabase

部署方式：

- GitHub Pages

数据库：

- Supabase

文件存储：

- 视频和 PPT 不上传到本项目
- 只保存外部链接，例如网盘链接、腾讯会议云录制链接、腾讯文档链接

不要使用：

- Flask
- Node 后端
- MySQL
- Vue
- React
- TypeScript
- WebSocket
- 微信 API
- 腾讯会议 API
- 文件上传服务

# 三、第一版不做的功能

第一版不要实现：

1. 不做搜索功能。
2. 不做标签功能。
3. 不做分类筛选。
4. 不做学生匿名提交。
5. 不做学生账号登录。
6. 不做网站内评论区。
7. 不做文件上传。
8. 不做视频在线播放。
9. 不做 AI 自动总结。
10. 不做复杂后台。
11. 不做多角色权限系统。
12. 不做学生端查看审核进度。
13. 不做“已精选 / 未精选 / 已隐藏”等学生可见状态。

首页只需要按照分享会时间倒序，从上到下展示列表。

# 四、页面要求

请生成 5 个页面：

1. index.html  
分享会列表页。

2. detail.html  
分享会详情页。

3. submit-resource.html  
分享会资料提交页。

4. submit-reflection.html  
学生心得提交页。

5. teacher-review.html  
指导老师审核精选页。

# 五、页面功能详细说明

## 1. index.html

首页功能：

- 从 Supabase 读取 meetings 表。
- 只展示 status = published 的分享会。
- 按 date 时间倒序排列。
- 从上到下展示分享会列表。
- 不做搜索。
- 不做标签筛选。
- 不做分类筛选。
- 点击“查看详情”跳转到 detail.html?id=xxx。

卡片展示字段：

- title 分享会标题
- speaker 主讲人
- speaker_role 主讲人身份
- date 分享时间
- description 一句话简介
- 是否有主题讨论

如果 discussion_topic 不为空，显示“有主题讨论”。  
如果 discussion_topic 为空，显示“暂无主题讨论”。

## 2. detail.html

详情页功能：

- 根据 URL 参数 id 获取对应分享会。
- 展示分享会完整信息。
- 展示录屏链接按钮。
- 展示 PPT/PDF 链接按钮。
- 如果 video_url 为空，显示“暂无录屏链接”。
- 如果 ppt_url 为空，显示“暂无 PPT/PDF 链接”。
- 如果 discussion_topic 不为空，展示主题讨论题目和“提交心得”按钮。
- 如果 discussion_topic 为空，显示“本场分享会暂未发布主题讨论”。
- 读取 reflections 表中该分享会下 status = selected 的学生心得。
- 将 selected 心得展示为“精选观点”。

详情展示字段：

- title
- speaker
- speaker_role
- date
- description
- video_url
- ppt_url
- discussion_topic
- remark
- selected reflections

精选观点展示字段：

- student_name 学生真实姓名
- class_name 班级
- content 我的观点
- gain 我的收获
- question 我的疑问

不做匿名处理，直接展示学生填写的真实姓名。

## 3. submit-resource.html

资料提交页使用对象：

- 指导老师
- 班长
- 主讲人

表单字段：

- title 分享会标题，必填
- speaker 主讲人，必填
- speaker_role 主讲人身份
- date 分享时间，必填
- description 一句话简介
- video_url 录屏链接
- ppt_url PPT/PDF 链接
- discussion_topic 主题讨论题目，可选
- submitter 提交人
- remark 备注

注意：

- 不要添加 category 字段。
- 不要添加 tags 字段。
- discussion_topic 是可选字段。
- 如果指导老师发布了主题讨论，就填写。
- 如果本场分享会没有主题讨论，就留空。
- 不上传视频文件。
- 不上传 PPT 文件。
- 只保存外部链接。

提交逻辑：

- 点击提交后写入 Supabase meetings 表。
- status 默认设置为 published。
- created_at 自动生成。
- updated_at 自动生成。
- 提交成功后必须弹窗提醒。
- 提交失败后必须弹窗提醒，并提示失败原因。
- 提交成功后可以清空表单。

## 4. submit-reflection.html

学生心得提交页使用对象：

- 学生

页面通常从 detail.html 的“提交心得”按钮进入：

submit-reflection.html?meeting_id=xxx

表单字段：

- meeting_id 对应分享会，隐藏字段或自动绑定
- student_name 学生真实姓名，必填
- class_name 班级，必填
- content 我的观点，必填
- gain 我的收获
- question 我的疑问

注意：

- 不做匿名提交。
- 不要添加 allow_display 字段。
- 不要添加 anonymous_display 字段。
- 是否公开展示由指导老师决定。
- 学生提交后不会立即公开展示。
- 学生端只需要知道“提交成功”或“提交失败/待提交”，不要显示审核进度。
- 不要让学生看到 pending、selected、hidden 这些后台状态。

提交逻辑：

- 页面加载时读取 URL 中的 meeting_id。
- 根据 meeting_id 查询对应分享会。
- 如果该分享会不存在，显示错误提示。
- 如果该分享会 discussion_topic 为空，显示“本场分享会暂未发布主题讨论，暂不支持提交心得。”
- 如果该分享会有 discussion_topic，则展示心得提交表单。
- 提交前，表单处于“待提交”状态。
- 提交按钮点击后写入 Supabase reflections 表。
- status 默认设置为 pending。
- created_at 自动生成。
- 提交成功后，必须使用弹窗提醒：“提交成功，感谢你的参与。”
- 提交失败后，必须使用弹窗提醒：“提交失败，请检查网络或稍后重试。”
- 提交失败时仍然保持表单内容，方便学生重新提交。
- 提交成功后可以清空表单或禁用重复提交按钮。
- 学生页面不要显示“待审核”“已精选”“已隐藏”等状态文案。
- 学生只看到：
  - 待提交
  - 提交成功
  - 提交失败弹窗

## 5. teacher-review.html

指导老师审核精选页使用对象：

- 指导老师

功能：

- 页面打开后要求输入指导老师口令。
- 口令正确后显示审核内容。
- 这是 MVP 简化版，不是真正安全方案。
- 正式版后续再接入 Supabase Auth。

审核功能：

1. 读取 reflections 表中 status = pending 的学生心得。
2. 每条心得需要显示对应的分享会标题。
3. 指导老师可以将心得状态改为 selected。
4. 指导老师可以将心得状态改为 hidden。
5. 指导老师操作成功后必须弹窗提醒。
6. 指导老师操作失败后必须弹窗提醒，并提示失败原因。

状态含义：

- pending：学生已提交，等待指导老师查看。
- selected：指导老师选为精选观点，公开展示在详情页。
- hidden：不公开展示。

注意：

- pending、selected、hidden 这些状态只在指导老师审核页内部使用。
- 学生端不要展示这些状态。
- 第一版不需要审核分享会资料。
- 第一版不需要开发者审核内容。

# 六、Supabase 数据表设计

请在 sql/supabase.sql 中生成建表 SQL。

## meetings 表

字段：

- id
- title
- speaker
- speaker_role
- date
- description
- video_url
- ppt_url
- discussion_topic
- submitter
- remark
- status
- created_at
- updated_at

字段建议：

- id 使用 uuid，默认 gen_random_uuid()
- title text not null
- speaker text not null
- speaker_role text
- date date not null
- description text
- video_url text
- ppt_url text
- discussion_topic text
- submitter text
- remark text
- status text not null default 'published'
- created_at timestamp with time zone default now()
- updated_at timestamp with time zone default now()

status 可选值：

- published
- hidden

## reflections 表

字段：

- id
- meeting_id
- student_name
- class_name
- content
- gain
- question
- status
- created_at

字段建议：

- id 使用 uuid，默认 gen_random_uuid()
- meeting_id uuid references meetings(id) on delete cascade
- student_name text not null
- class_name text not null
- content text not null
- gain text
- question text
- status text not null default 'pending'
- created_at timestamp with time zone default now()

status 可选值：

- pending
- selected
- hidden

请生成可直接在 Supabase SQL Editor 执行的 SQL。

# 七、Supabase 访问要求

请使用 Supabase JS SDK。

要求：

1. 在 js/config.js 中配置：

- SUPABASE_URL
- SUPABASE_ANON_KEY
- TEACHER_REVIEW_CODE

2. 在 js/api.js 中封装所有数据库操作，不要在页面 JS 中直接写 Supabase 查询。

api.js 至少包含：

- getPublishedMeetings()
- getMeetingById(id)
- createMeeting(data)
- getSelectedReflectionsByMeetingId(meetingId)
- createReflection(data)
- getPendingReflectionsWithMeeting()
- updateReflectionStatus(id, status)

# 八、项目结构

请严格按照以下结构生成：


├── index.html
├── detail.html
├── submit-resource.html
├── submit-reflection.html
├── teacher-review.html
├── css/
│   └── style.css
├── js/
│   ├── config.js
│   ├── api.js
│   ├── index.js
│   ├── detail.js
│   ├── submit-resource.js
│   ├── submit-reflection.js
│   └── teacher-review.js
├── sql/
│   └── supabase.sql
└── README.md

# 九、样式要求

使用 Bootstrap。

页面风格：

- 简洁
- 清晰
- 偏学习资料站
- 适合手机端访问
- 不要复杂动画
- 不要过度炫酷

组件建议：

- 导航栏
- 卡片
- badge
- 表单
- alert 提示
- modal 弹窗
- button 按钮

# 十、交互要求

1. 所有页面都要有基础导航栏。
2. 导航栏包含：
   - 首页
   - 提交分享会资料
   - 提交心得
   - 指导老师入口

3. 首页只做列表展示，不做搜索和标签筛选。
4. 所有表单都要做基础校验。
5. 所有提交成功或失败都必须有弹窗提醒。
6. 不要只用页面文字提示，必须弹窗提醒。
7. 弹窗可以使用 Bootstrap Modal，也可以使用浏览器 alert，但优先使用 Bootstrap Modal。
8. 数据加载失败时显示错误提示。
9. 如果 video_url 或 ppt_url 为空，详情页显示暂无链接。
10. 如果 discussion_topic 为空，详情页不显示提交心得按钮。
11. 页面要能直接部署到 GitHub Pages。
12. 学生提交心得页面只展示“待提交 / 提交成功 / 提交失败”这类用户状态，不展示后台审核状态。
13. 指导老师审核页可以展示 pending 状态，但学生端不能展示 pending、selected、hidden。

# 十一、README 要求

README.md 需要写清楚：

1. 项目简介。
2. 项目功能。
3. 技术栈。
4. 项目结构。
5. Supabase 如何配置。
6. 如何执行 sql/supabase.sql 建表。
7. 如何填写 js/config.js。
8. 如何部署到 GitHub Pages。
9. 指导老师如何提交分享会资料。
10. 学生如何提交心得。
11. 指导老师如何精选学生观点。
12. 当前 MVP 的限制。
13. 后续扩展方向。

MVP 限制需要写明：

- teacher-review.html 的口令保护不是真正安全的权限系统。
- 正式版应接入 Supabase Auth。
- 视频和 PPT 当前只保存外部链接。
- 当前不做文件上传。
- 当前不做标签和搜索。
- 当前不做微信 API 和腾讯会议 API。
- 学生心得不做匿名处理，直接使用真实姓名。
- 学生端不展示审核进度，只显示提交成功或提交失败。

# 十二、重要限制

请严格遵守：

1. 不要生成 Flask 后端。
2. 不要生成 Node 后端。
3. 不要使用本地 JSON 作为正式数据源。
4. 不要把数据写死在前端。
5. 不要做视频上传。
6. 不要做网站内实时聊天。
7. 不要做学生注册登录。
8. 不要引入 Vue、React、TypeScript。
9. 不要添加 category 字段。
10. 不要添加 tags 字段。
11. 不要添加搜索功能。
12. 不要添加标签筛选功能。
13. 不要添加匿名展示功能。
14. 不要让开发者审核内容。
15. 指导老师负责决定学生心得是否精选展示。
16. 学生提交心得后，不要展示 pending、selected、hidden 等后台状态。
17. 学生提交成功或失败必须弹窗提醒。
18. 分享会资料提交成功或失败必须弹窗提醒。
19. 指导老师审核操作成功或失败必须弹窗提醒。

请直接生成完整项目代码。