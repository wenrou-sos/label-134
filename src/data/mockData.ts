import type {
  ExitInterview,
  ReasonTag,
  ReasonStat,
  DeptTurnover,
  TenureStat,
  FollowupStat,
  TimeRange,
} from './types'
import { REASON_TAGS, TENURE_RANGES, FOLLOWUP_STATUSES } from './types'

const today = new Date()

function dateStr(daysAgo: number): string {
  const d = new Date(today)
  d.setDate(d.getDate() - daysAgo)
  return d.toISOString().slice(0, 10)
}

export const interviews: ExitInterview[] = [
  { id: 'EI-2026-001', employeeName: '张伟', department: '研发部', resignType: '主动离职', reasonTags: ['薪资', '发展'], destination: '字节跳动', honestyScore: 4, retentionScore: 2, tenure: '1-3年', interviewDate: dateStr(2), followupStatus: '跟进中' },
  { id: 'EI-2026-002', employeeName: '李娜', department: '市场部', resignType: '主动离职', reasonTags: ['管理', '加班'], destination: '腾讯', honestyScore: 5, retentionScore: 1, tenure: '1年内', interviewDate: dateStr(3), followupStatus: '未跟进' },
  { id: 'EI-2026-003', employeeName: '王强', department: '销售部', resignType: '主动离职', reasonTags: ['薪资'], destination: '美团', honestyScore: 3, retentionScore: 3, tenure: '1-3年', interviewDate: dateStr(4), followupStatus: '已解决' },
  { id: 'EI-2026-004', employeeName: '赵敏', department: '研发部', resignType: '主动离职', reasonTags: ['加班', '健康'], destination: '阿里云', honestyScore: 4, retentionScore: 2, tenure: '3-5年', interviewDate: dateStr(5), followupStatus: '跟进中' },
  { id: 'EI-2026-005', employeeName: '陈杰', department: '产品部', resignType: '主动离职', reasonTags: ['发展', '管理'], destination: '小米', honestyScore: 5, retentionScore: 1, tenure: '1-3年', interviewDate: dateStr(6), followupStatus: '未跟进' },
  { id: 'EI-2026-006', employeeName: '刘洋', department: '运营部', resignType: '协商解除', reasonTags: ['通勤'], destination: '本地企业', honestyScore: 3, retentionScore: 4, tenure: '试用期内', interviewDate: dateStr(1), followupStatus: '已解决' },

  { id: 'EI-2026-007', employeeName: '孙丽', department: '财务部', resignType: '主动离职', reasonTags: ['薪资', '家庭'], destination: '普华永道', honestyScore: 4, retentionScore: 2, tenure: '3-5年', interviewDate: dateStr(9), followupStatus: '跟进中' },
  { id: 'EI-2026-008', employeeName: '周明', department: '研发部', resignType: '主动离职', reasonTags: ['薪资', '发展', '加班'], destination: '华为', honestyScore: 5, retentionScore: 1, tenure: '1-3年', interviewDate: dateStr(10), followupStatus: '未跟进' },
  { id: 'EI-2026-009', employeeName: '吴芳', department: '客户服务部', resignType: '主动离职', reasonTags: ['薪资'], destination: '京东', honestyScore: 3, retentionScore: 3, tenure: '1年内', interviewDate: dateStr(11), followupStatus: '已解决' },
  { id: 'EI-2026-010', employeeName: '郑浩', department: '销售部', resignType: '被动离职', reasonTags: ['管理'], destination: '待业', honestyScore: 2, retentionScore: 1, tenure: '试用期内', interviewDate: dateStr(12), followupStatus: '已解决' },
  { id: 'EI-2026-011', employeeName: '马超', department: '研发部', resignType: '主动离职', reasonTags: ['加班', '发展'], destination: '大疆', honestyScore: 4, retentionScore: 2, tenure: '3-5年', interviewDate: dateStr(14), followupStatus: '跟进中' },
  { id: 'EI-2026-012', employeeName: '黄琳', department: '市场部', resignType: '主动离职', reasonTags: ['发展', '薪资'], destination: '小红书', honestyScore: 5, retentionScore: 1, tenure: '1-3年', interviewDate: dateStr(15), followupStatus: '未跟进' },
  { id: 'EI-2026-013', employeeName: '林峰', department: '运营部', resignType: '合同到期', reasonTags: ['通勤', '家庭'], destination: '自由职业', honestyScore: 4, retentionScore: 3, tenure: '5年+', interviewDate: dateStr(16), followupStatus: '已解决' },
  { id: 'EI-2026-014', employeeName: '徐静', department: '人力资源部', resignType: '主动离职', reasonTags: ['管理', '发展'], destination: '网易', honestyScore: 5, retentionScore: 2, tenure: '1-3年', interviewDate: dateStr(17), followupStatus: '跟进中' },
  { id: 'EI-2026-015', employeeName: '胡军', department: '销售部', resignType: '主动离职', reasonTags: ['薪资'], destination: '拼多多', honestyScore: 3, retentionScore: 3, tenure: '1-3年', interviewDate: dateStr(18), followupStatus: '未跟进' },
  { id: 'EI-2026-016', employeeName: '郭婷', department: '研发部', resignType: '主动离职', reasonTags: ['健康', '加班'], destination: '字节跳动', honestyScore: 4, retentionScore: 2, tenure: '3-5年', interviewDate: dateStr(19), followupStatus: '跟进中' },

  { id: 'EI-2026-017', employeeName: '何鑫', department: '产品部', resignType: '主动离职', reasonTags: ['薪资', '发展'], destination: '快手', honestyScore: 5, retentionScore: 1, tenure: '1年内', interviewDate: dateStr(25), followupStatus: '已解决' },
  { id: 'EI-2026-018', employeeName: '高伟', department: '研发部', resignType: '主动离职', reasonTags: ['加班', '薪资', '管理'], destination: '蚂蚁集团', honestyScore: 4, retentionScore: 2, tenure: '1-3年', interviewDate: dateStr(27), followupStatus: '未跟进' },
  { id: 'EI-2026-019', employeeName: '罗雪', department: '客户服务部', resignType: '主动离职', reasonTags: ['薪资'], destination: '滴滴', honestyScore: 3, retentionScore: 3, tenure: '试用期内', interviewDate: dateStr(28), followupStatus: '跟进中' },
  { id: 'EI-2026-020', employeeName: '梁宇', department: '销售部', resignType: '主动离职', reasonTags: ['管理', '发展'], destination: '贝壳找房', honestyScore: 4, retentionScore: 2, tenure: '1-3年', interviewDate: dateStr(30), followupStatus: '跟进中' },
  { id: 'EI-2026-021', employeeName: '宋佳', department: '市场部', resignType: '协商解除', reasonTags: ['家庭'], destination: '本地企业', honestyScore: 5, retentionScore: 4, tenure: '3-5年', interviewDate: dateStr(33), followupStatus: '已解决' },
  { id: 'EI-2026-022', employeeName: '许鹏', department: '研发部', resignType: '主动离职', reasonTags: ['薪资', '发展', '加班'], destination: '微软', honestyScore: 5, retentionScore: 1, tenure: '3-5年', interviewDate: dateStr(35), followupStatus: '未跟进' },
  { id: 'EI-2026-023', employeeName: '邓丽', department: '财务部', resignType: '主动离职', reasonTags: ['通勤', '薪资'], destination: '德勤', honestyScore: 4, retentionScore: 2, tenure: '1-3年', interviewDate: dateStr(38), followupStatus: '跟进中' },
  { id: 'EI-2026-024', employeeName: '冯刚', department: '运营部', resignType: '被动离职', reasonTags: ['管理'], destination: '待业', honestyScore: 2, retentionScore: 1, tenure: '1年内', interviewDate: dateStr(40), followupStatus: '已解决' },
  { id: 'EI-2026-025', employeeName: '曾慧', department: '产品部', resignType: '主动离职', reasonTags: ['发展', '薪资'], destination: '百度', honestyScore: 5, retentionScore: 1, tenure: '1-3年', interviewDate: dateStr(42), followupStatus: '跟进中' },
  { id: 'EI-2026-026', employeeName: '彭涛', department: '销售部', resignType: '主动离职', reasonTags: ['薪资', '加班'], destination: '携程', honestyScore: 3, retentionScore: 3, tenure: '1-3年', interviewDate: dateStr(45), followupStatus: '未跟进' },
  { id: 'EI-2026-027', employeeName: '蒋悦', department: '研发部', resignType: '主动离职', reasonTags: ['加班', '健康'], destination: '谷歌', honestyScore: 4, retentionScore: 2, tenure: '5年+', interviewDate: dateStr(48), followupStatus: '已解决' },
  { id: 'EI-2026-028', employeeName: '沈磊', department: '市场部', resignType: '主动离职', reasonTags: ['薪资', '发展'], destination: 'B站', honestyScore: 5, retentionScore: 1, tenure: '1年内', interviewDate: dateStr(50), followupStatus: '跟进中' },
  { id: 'EI-2026-029', employeeName: '韩雪', department: '人力资源部', resignType: '主动离职', reasonTags: ['管理', '家庭'], destination: '本地企业', honestyScore: 4, retentionScore: 2, tenure: '3-5年', interviewDate: dateStr(52), followupStatus: '未跟进' },
  { id: 'EI-2026-030', employeeName: '杨帆', department: '客户服务部', resignType: '主动离职', reasonTags: ['薪资'], destination: '饿了么', honestyScore: 3, retentionScore: 3, tenure: '试用期内', interviewDate: dateStr(55), followupStatus: '已解决' },
  { id: 'EI-2026-031', employeeName: '朱琪', department: '研发部', resignType: '主动离职', reasonTags: ['发展', '加班', '薪资'], destination: '商汤科技', honestyScore: 5, retentionScore: 1, tenure: '1-3年', interviewDate: dateStr(58), followupStatus: '跟进中' },
  { id: 'EI-2026-032', employeeName: '秦昊', department: '销售部', resignType: '主动离职', reasonTags: ['管理'], destination: '理想汽车', honestyScore: 4, retentionScore: 2, tenure: '1-3年', interviewDate: dateStr(60), followupStatus: '未跟进' },
  { id: 'EI-2026-033', employeeName: '尤静', department: '运营部', resignType: '主动离职', reasonTags: ['薪资', '通勤'], destination: '蔚来', honestyScore: 3, retentionScore: 3, tenure: '1年内', interviewDate: dateStr(63), followupStatus: '已解决' },
  { id: 'EI-2026-034', employeeName: '许峰', department: '研发部', resignType: '主动离职', reasonTags: ['加班', '发展'], destination: '大疆', honestyScore: 5, retentionScore: 1, tenure: '3-5年', interviewDate: dateStr(66), followupStatus: '跟进中' },
  { id: 'EI-2026-035', employeeName: '何琳', department: '产品部', resignType: '主动离职', reasonTags: ['薪资', '管理', '发展'], destination: '字节跳动', honestyScore: 4, retentionScore: 2, tenure: '1-3年', interviewDate: dateStr(70), followupStatus: '未跟进' },
  { id: 'EI-2026-036', employeeName: '吕强', department: '销售部', resignType: '主动离职', reasonTags: ['薪资'], destination: '美团', honestyScore: 3, retentionScore: 3, tenure: '1-3年', interviewDate: dateStr(73), followupStatus: '已解决' },
  { id: 'EI-2026-037', employeeName: '丁洁', department: '市场部', resignType: '主动离职', reasonTags: ['家庭', '健康'], destination: '自由职业', honestyScore: 5, retentionScore: 4, tenure: '5年+', interviewDate: dateStr(76), followupStatus: '已解决' },
  { id: 'EI-2026-038', employeeName: '任飞', department: '研发部', resignType: '主动离职', reasonTags: ['薪资', '加班', '发展', '管理'], destination: '腾讯', honestyScore: 4, retentionScore: 1, tenure: '1-3年', interviewDate: dateStr(80), followupStatus: '跟进中' },
  { id: 'EI-2026-039', employeeName: '曹颖', department: '财务部', resignType: '主动离职', reasonTags: ['薪资', '发展'], destination: '安永', honestyScore: 5, retentionScore: 2, tenure: '1年内', interviewDate: dateStr(83), followupStatus: '未跟进' },
  { id: 'EI-2026-040', employeeName: '沈明', department: '运营部', resignType: '主动离职', reasonTags: ['通勤', '加班'], destination: '京东', honestyScore: 3, retentionScore: 3, tenure: '1-3年', interviewDate: dateStr(12), followupStatus: '跟进中' },
  { id: 'EI-2026-041', employeeName: '范晨', department: '客户服务部', resignType: '主动离职', reasonTags: ['薪资', '管理'], destination: '拼多多', honestyScore: 4, retentionScore: 2, tenure: '试用期内', interviewDate: dateStr(20), followupStatus: '未跟进' },
  { id: 'EI-2026-042', employeeName: '方圆', department: '产品部', resignType: '主动离职', reasonTags: ['发展', '薪资', '加班'], destination: '小红书', honestyScore: 5, retentionScore: 1, tenure: '1-3年', interviewDate: dateStr(7), followupStatus: '跟进中' },
]

const DEPT_HEADCOUNT: Record<string, number> = {
  研发部: 120,
  产品部: 35,
  销售部: 60,
  市场部: 28,
  运营部: 45,
  人力资源部: 15,
  财务部: 18,
  客户服务部: 50,
}

function daysInRange(timeRange: TimeRange): number {
  switch (timeRange) {
    case 'week':
      return 7
    case 'month':
      return 30
    case 'quarter':
      return 90
  }
}

export function getReasonStats(timeRange: TimeRange): ReasonStat[] {
  const cutoff = daysInRange(timeRange)
  const counts: Record<string, number> = {}
  REASON_TAGS.forEach((tag) => (counts[tag] = 0))

  interviews.forEach((record) => {
    const days = Math.floor(
      (today.getTime() - new Date(record.interviewDate).getTime()) / (1000 * 60 * 60 * 24),
    )
    if (days <= cutoff) {
      record.reasonTags.forEach((tag) => {
        counts[tag]++
      })
    }
  })

  return REASON_TAGS.map((tag) => ({ tag, count: counts[tag] })).sort(
    (a, b) => b.count - a.count,
  )
}

export function getDeptTurnover(): DeptTurnover[] {
  const resignedByDept: Record<string, number> = {}
  interviews.forEach((record) => {
    const days = Math.floor(
      (today.getTime() - new Date(record.interviewDate).getTime()) / (1000 * 60 * 60 * 24),
    )
    if (days <= 30) {
      resignedByDept[record.department] = (resignedByDept[record.department] || 0) + 1
    }
  })

  return Object.keys(DEPT_HEADCOUNT).map((dept) => {
    const resigned = resignedByDept[dept] || 0
    const total = DEPT_HEADCOUNT[dept]
    return {
      department: dept,
      resignedCount: resigned,
      totalCount: total,
      turnoverRate: Math.round((resigned / total) * 1000) / 10,
    }
  }).sort((a, b) => b.turnoverRate - a.turnoverRate)
}

export function getTenureStats(): TenureStat[] {
  const counts: Record<string, number> = {}
  TENURE_RANGES.forEach((r) => (counts[r] = 0))
  interviews.forEach((record) => {
    counts[record.tenure]++
  })
  const total = interviews.length
  return TENURE_RANGES.map((range) => ({
    range,
    count: counts[range],
    percentage: Math.round((counts[range] / total) * 1000) / 10,
  }))
}

export function getFollowupStats(): FollowupStat[] {
  const counts: Record<string, number> = {}
  FOLLOWUP_STATUSES.forEach((s) => (counts[s] = 0))
  interviews.forEach((record) => {
    counts[record.followupStatus]++
  })
  const total = interviews.length
  return FOLLOWUP_STATUSES.map((status) => ({
    status,
    count: counts[status],
    percentage: Math.round((counts[status] / total) * 1000) / 10,
  }))
}

export function getOverviewStats() {
  const monthStats = getReasonStats('month')
  const deptStats = getDeptTurnover()
  const followupStats = getFollowupStats()
  const totalResigned = interviews.length
  const monthResigned = interviews.filter((r) => {
    const days = Math.floor(
      (today.getTime() - new Date(r.interviewDate).getTime()) / (1000 * 60 * 60 * 24),
    )
    return days <= 30
  }).length
  const totalHeadcount = Object.values(DEPT_HEADCOUNT).reduce((a, b) => a + b, 0)
  const monthTurnoverRate = Math.round((monthResigned / totalHeadcount) * 1000) / 10
  const avgHonesty = Math.round((interviews.reduce((s, r) => s + r.honestyScore, 0) / totalResigned) * 10) / 10
  const pendingCount = followupStats
    .filter((f) => f.status !== '已解决')
    .reduce((s, f) => s + f.count, 0)

  return {
    totalResigned,
    monthTurnoverRate,
    avgHonesty,
    pendingCount,
    topReason: monthStats[0]?.tag || '薪资',
    highRiskDepts: deptStats.filter((d) => d.turnoverRate > 10).length,
  }
}
