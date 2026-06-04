# Task Summary Skill

When this skill is invoked, generate a structured summary of the current session or task.

## What to include in the summary:

1. **完成的任务** — 列出本次完成的所有操作
2. **遇到的问题** — 列出所有错误和异常
3. **解决方案** — 每个问题是怎么解决的
4. **修改的文件** — 列出所有被修改的文件
5. **待办事项** — 如果有未完成的工作，列出下一步

## Format:

```
## 📋 任务总结

### ✅ 完成的任务
- [任务1]: [简短描述]
- [任务2]: [简短描述]

### ❌ 遇到的问题
- [问题1]: [错误信息]
- [问题2]: [错误信息]

### 🔧 解决方案
- [问题1] → [解决方法]
- [问题2] → [解决方法]

### 📁 修改的文件
- `path/to/file1.ts` — [修改内容]
- `path/to/file2.ts` — [修改内容]

### 📌 待办事项
- [ ] [下一步操作]
```

## When to use:
- After completing a multi-step task
- When the user asks "你做了什么" or "总结一下"
- At the end of a debugging session
- After a deployment

## How to invoke:
- Type `/task-summary` or `/summary`
- Or ask "总结一下刚才做了什么"
