<script setup lang="ts">
import { ref, computed } from 'vue'
import * as echarts from 'echarts'
import { useECharts } from '@/composables/useECharts'
import { getReasonStats } from '@/data/mockData'
import { REASON_COLORS, TIME_RANGE_LABELS, type TimeRange } from '@/data/types'

const timeRange = ref<TimeRange>('month')

const chartRef = ref<HTMLElement | null>(null)

const stats = computed(() => getReasonStats(timeRange.value))

const getOption = (): echarts.EChartsOption => {
  const data = stats.value
  const sorted = [...data].reverse()

  return {
    grid: { left: 60, right: 50, top: 16, bottom: 16, containLabel: false },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: 'rgba(15,23,42,0.95)',
      borderColor: 'rgba(148,163,184,0.15)',
      borderWidth: 1,
      textStyle: { color: '#f1f5f9', fontSize: 12 },
      formatter: (params: any) => {
        const p = params[0]
        const tag = p.name
        const count = p.value
        const total = data.reduce((s, d) => s + d.count, 0)
        const pct = total > 0 ? ((count / total) * 100).toFixed(1) : '0'
        const color = REASON_COLORS[tag as keyof typeof REASON_COLORS] || '#94a3b8'
        return `<div style="font-weight:600;color:${color}">${tag}</div><div style="margin-top:4px">频次：<b>${count}</b> 次</div><div>占比：<b>${pct}%</b></div>`
      },
    },
    xAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#64748b', fontSize: 11, fontFamily: 'JetBrains Mono' },
      splitLine: { lineStyle: { color: 'rgba(148,163,184,0.08)', type: 'dashed' } },
    },
    yAxis: {
      type: 'category',
      data: sorted.map((d) => d.tag),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: '#cbd5e1',
        fontSize: 12,
        fontWeight: 500,
        margin: 12,
      },
    },
    series: [
      {
        type: 'bar',
        data: sorted.map((d) => ({
          value: d.count,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: REASON_COLORS[d.tag] + '40' },
              { offset: 1, color: REASON_COLORS[d.tag] },
            ]),
            borderRadius: [0, 6, 6, 0],
          },
        })),
        barWidth: 18,
        label: {
          show: true,
          position: 'right',
          color: '#94a3b8',
          fontSize: 12,
          fontFamily: 'JetBrains Mono',
          fontWeight: 600,
          formatter: '{c}',
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 12,
            shadowColor: 'rgba(0,0,0,0.3)',
          },
        },
      },
    ],
    animation: true,
    animationDuration: 800,
    animationEasing: 'cubicOut',
  }
}

const { updateChart } = useECharts(chartRef, getOption)

const switchRange = (range: TimeRange) => {
  timeRange.value = range
  updateChart()
}

const topReason = computed(() => stats.value[0])
</script>

<template>
  <div class="glass-card glass-card-hover flex h-full flex-col p-5">
    <div class="mb-4 flex items-center justify-between">
      <div>
        <h3 class="section-title">离职原因分析</h3>
        <p class="section-subtitle mt-0.5">各原因标签频次排行</p>
      </div>

      <div class="flex gap-1 rounded-lg bg-base-800/60 p-1">
        <button
          v-for="(label, key) in TIME_RANGE_LABELS"
          :key="key"
          class="rounded-md px-3 py-1 text-xs font-500 transition-all duration-200"
          :class="
            timeRange === key
              ? 'bg-accent-teal/20 text-accent-teal shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          "
          @click="switchRange(key as TimeRange)"
        >
          {{ label }}
        </button>
      </div>
    </div>

    <div v-if="topReason" class="mb-3 flex items-center gap-3 rounded-xl bg-white/[0.03] px-4 py-3">
      <div
        class="flex h-9 w-9 items-center justify-center rounded-lg text-xs font-700"
        :style="{
          background: REASON_COLORS[topReason.tag] + '20',
          color: REASON_COLORS[topReason.tag],
        }"
      >
        TOP1
      </div>
      <div class="flex-1">
        <p class="text-xs text-slate-400">主要原因</p>
        <p class="font-display text-base font-700" :style="{ color: REASON_COLORS[topReason.tag] }">
          {{ topReason.tag }}
        </p>
      </div>
      <div class="text-right">
        <p class="text-xs text-slate-400">频次</p>
        <p class="stat-number text-lg text-slate-100">{{ topReason.count }}</p>
      </div>
    </div>

    <div ref="chartRef" class="min-h-[280px] flex-1" />
  </div>
</template>
