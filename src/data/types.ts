export type ReasonTag = '薪资' | '管理' | '发展' | '加班' | '通勤' | '家庭' | '健康'

export type ResignType = '主动离职' | '被动离职' | '协商解除' | '合同到期'

export type TenureRange = '试用期内' | '1年内' | '1-3年' | '3-5年' | '5年+'

export type FollowupStatus = '未跟进' | '跟进中' | '已解决'

export type TimeRange = 'week' | 'month' | 'quarter'

export interface ExitInterview {
  id: string
  employeeName: string
  department: string
  resignType: ResignType
  reasonTags: ReasonTag[]
  destination: string
  honestyScore: number
  retentionScore: number
  tenure: TenureRange
  interviewDate: string
  followupStatus: FollowupStatus
}

export interface ReasonStat {
  tag: ReasonTag
  count: number
}

export interface DeptTurnover {
  department: string
  turnoverRate: number
  resignedCount: number
  totalCount: number
}

export interface TenureStat {
  range: TenureRange
  count: number
  percentage: number
}

export interface FollowupStat {
  status: FollowupStatus
  count: number
  percentage: number
}

export const REASON_TAGS: ReasonTag[] = ['薪资', '管理', '发展', '加班', '通勤', '家庭', '健康']

export const REASON_COLORS: Record<ReasonTag, string> = {
  薪资: '#f43f5e',
  管理: '#8b5cf6',
  发展: '#f59e0b',
  加班: '#fb923c',
  通勤: '#38bdf8',
  家庭: '#ec4899',
  健康: '#14b8a6',
}

export const RESIGN_TYPES: ResignType[] = ['主动离职', '被动离职', '协商解除', '合同到期']

export const TENURE_RANGES: TenureRange[] = ['试用期内', '1年内', '1-3年', '3-5年', '5年+']

export const TENURE_COLORS: string[] = ['#38bdf8', '#14b8a6', '#8b5cf6', '#f59e0b', '#f43f5e']

export const FOLLOWUP_STATUSES: FollowupStatus[] = ['未跟进', '跟进中', '已解决']

export const FOLLOWUP_COLORS: Record<FollowupStatus, string> = {
  未跟进: '#f43f5e',
  跟进中: '#f59e0b',
  已解决: '#14b8a6',
}

export const TIME_RANGE_LABELS: Record<TimeRange, string> = {
  week: '本周',
  month: '本月',
  quarter: '本季度',
}
