<script setup lang="ts">
import { computed } from 'vue'
import StatCard from '@/components/StatCard.vue'
import ReasonAnalysis from '@/components/ReasonAnalysis.vue'
import DeptTurnoverChart from '@/components/DeptTurnoverChart.vue'
import TenureDistribution from '@/components/TenureDistribution.vue'
import FollowupPie from '@/components/FollowupPie.vue'
import InterviewTable from '@/components/InterviewTable.vue'
import { getOverviewStats } from '@/data/mockData'

const overview = computed(() => getOverviewStats())

const currentDate = computed(() => {
  const d = new Date()
  const weekdays = ['日', '一', '二', '三', '四', '五', '六']
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 · 星期${weekdays[d.getDay()]}`
})

const dataDate = computed(() => {
  const d = new Date()
  return d.toISOString().slice(0, 10)
})
</script>

<template>
  <div class="min-h-screen px-6 py-6 lg:px-10">
    <!-- Header -->
    <header class="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div class="flex items-center gap-4">
        <div
          class="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-teal/30 to-accent-violet/20 shadow-lg"
          style="box-shadow: 0 0 24px rgba(20,184,166,0.2)"
        >
          <span class="font-display text-xl font-800 text-accent-teal">HR</span>
        </div>
        <div>
          <h1 class="font-display text-2xl font-800 tracking-tight text-slate-50">
            离职面谈数据分析面板
          </h1>
          <p class="mt-0.5 text-sm text-slate-400">
            Exit Interview Analytics · 数据驱动的员工流失洞察
          </p>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <div class="flex items-center gap-2 rounded-xl border border-white/[0.06] bg-base-800/50 px-4 py-2">
          <span class="h-2 w-2 animate-pulse rounded-full bg-accent-teal" />
          <span class="text-xs text-slate-400">数据实时同步</span>
        </div>
        <div class="rounded-xl border border-white/[0.06] bg-base-800/50 px-4 py-2">
          <p class="text-xs text-slate-500">当前时间</p>
          <p class="font-mono text-sm text-slate-200">{{ currentDate }}</p>
        </div>
      </div>
    </header>

    <!-- Overview Stats -->
    <section class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="本季度离职总人数"
        :value="overview.totalResigned"
        unit="人"
        icon="👥"
        accent="teal"
        :subtitle="`主要原因：${overview.topReason}`"
        :delay="0"
      />
      <StatCard
        title="本月离职率"
        :value="overview.monthTurnoverRate"
        unit="%"
        icon="📉"
        accent="coral"
        :subtitle="`高风险部门：${overview.highRiskDepts} 个`"
        :trend="2.3"
        :delay="80"
      />
      <StatCard
        title="面谈平均坦诚度"
        :value="overview.avgHonesty"
        unit="/ 5"
        icon="💬"
        accent="amber"
        subtitle="基于面谈评分统计"
        :delay="160"
      />
      <StatCard
        title="待跟进问题数"
        :value="overview.pendingCount"
        unit="个"
        icon="🔔"
        accent="violet"
        subtitle="未解决 + 跟进中"
        :delay="240"
      />
    </section>

    <!-- Charts Row 1 -->
    <section class="mb-6 grid grid-cols-1 gap-4 xl:grid-cols-2">
      <ReasonAnalysis />
      <DeptTurnoverChart />
    </section>

    <!-- Charts Row 2 -->
    <section class="mb-6 grid grid-cols-1 gap-4 xl:grid-cols-2">
      <TenureDistribution />
      <FollowupPie />
    </section>

    <!-- Table -->
    <section class="mb-6">
      <InterviewTable />
    </section>

    <!-- Footer -->
    <footer class="flex items-center justify-center gap-2 py-4 text-xs text-slate-600">
      <span>HR Insight Dashboard</span>
      <span>·</span>
      <span>Vue 3 + ECharts</span>
      <span>·</span>
      <span>数据截至 {{ dataDate }}</span>
    </footer>
  </div>
</template>
