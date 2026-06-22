## 1. 架构设计

```mermaid
flowchart TD
    A["前端展示层 Vue3"] --> B["数据管理层 Pinia/Mock"]
    B --> C["静态 Mock 数据 JSON"]
    A --> D["可视化层 ECharts"]
    D --> E["离职原因分析图"]
    D --> F["部门离职率对比图"]
    D --> G["司龄分布图"]
    D --> H["问题跟进饼图"]
```

## 2. 技术说明

- **前端**：Vue@3 + ECharts@5 + Vite
- **样式方案**：原生 CSS 变量 + Scoped 样式（无需 Tailwind，保持轻量）
- **初始化工具**：vite-create（npm create vite@latest）
- **后端**：无（纯前端 Mock 数据）
- **数据**：内置 Mock 数据集，模拟 40+ 条离职面谈记录与统计聚合数据

## 3. 路由定义

| 路由 | 用途 |
|-------|---------|
| / | 单页面数据面板，包含全部 5 大模块 |

## 4. 数据模型

### 4.1 数据模型定义

```mermaid
erDiagram
    EXIT_INTERVIEW ||--o{ REASON_TAG : contains
    EXIT_INTERVIEW ||--|| EMPLOYEE : belongs_to
    EXIT_INTERVIEW ||--o{ FOLLOWUP_ISSUE : has
    EMPLOYEE ||--|| DEPARTMENT : in
    EXIT_INTERVIEW {
        string id
        string employeeName
        string department
        string resignType
        array reasonTags
        string destination
        number honestyScore
        number retentionScore
        string tenure
        string interviewDate
    }
    FOLLOWUP_ISSUE {
        string id
        string description
        string status
    }
```

### 4.2 数据定义

离职原因标签枚举：薪资、管理、发展、加班、通勤、家庭、健康
司龄区间枚举：试用期内、1 年内、1-3 年、3-5 年、5 年+
问题跟进状态枚举：未跟进、跟进中、已解决
离职类型枚举：主动离职、被动离职、协商解除、合同到期
