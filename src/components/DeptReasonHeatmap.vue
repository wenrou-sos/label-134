<script setup lang="ts">
import { ref, computed } from 'vue'
import * as echarts from 'echarts'
import { useECharts } from '@/composables/useECharts'
import { getDeptReasonMatrix, getDeptReasonPeaks } from '@/data/mockData'
import { REASON_COLORS, TIME_RANGE_LABELS, type ReasonTag, type TimeRange } from '@/data/types'

const timeRange = ref<TimeRange>('quarter')

const chartRef = ref<HTMLElement | null>(null)

const matrix = computed(() => getDeptReasonMatrix(timeRange.value))
const peaks = computed(() => getDeptReasonPeaks(timeRange.value))

const departments = computed(() => [...new Set(matrix.value.map((m) => m.department))])
const reasons = computed(() => [...new Set(matrix.value.map((m) => m.reason))])

const maxCount = computed(() => Math.max(...matrix.value.map((m) => m.count), 1))

const getOption = (): echarts.EChartsOption => {
  const data = matrix.value.map((m) => [
    departments.value.indexOf(m.department),
    reasons.value.indexOf(m.reason),
    m.count,
  ])

  return {
    grid: { left: 90, right: 40, top: 24, bottom: 50, containLabel: false },
    tooltip: {
      position: 'top',
      backgroundColor: 'rgba(15,23,42,0.95)',
      borderColor: 'rgba(148,163,184,0.15)',
      borderWidth: 1,
      textStyle: { color: '#f1f5f9', fontSize: 12 },
      formatter: (params: any) => {
        const dept = departments.value[params.data[0]]
        const reason = reasons.value[params.data[1]]
        const count = params.data[2]
        const color = REASON_COLORS[reason as ReasonTag]
        return `<div style="font-weight:600;margin-bottom:4px">${dept}</div>
          <div style="color:${color};font-weight:500;margin-bottom:4px">${reason}</div>
          <div>离职人数：<b>${count}</b> 人</div>`
      },
    },
    xAxis: {
      type: 'category',
      data: departments.value,
      axisLine: { lineStyle: { color: 'rgba(148,163,184,0.15)' } },
      axisTick: { show: false },
      axisLabel: {
        color: '#cbd5e1',
        fontSize: 11,
        fontWeight: 500,
        rotate: 30,
        interval: 0,
      },
      splitArea: { show: false },
    },
    yAxis: {
      type: 'category',
      data: reasons.value,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: '#cbd5e1',
        fontSize: 11,
        fontWeight: 500,
        margin: 12,
      },
      splitArea: { show: false },
    },
    visualMap: {
      min: 0,
      max: maxCount.value,
      show: false,
      inRange: {
        color: ['rgba(20,184,166,0.08)', 'rgba(20,184,166,0.3)', 'rgba(20,184,166,0.6)', 'rgba(244,63,94,0.7)', 'rgba(244,63,94,1)'],
      },
      calculable: false,
      orient: 'horizontal',
      left: 'center',
      bottom: 0,
    },
    series: [
      {
        name: '离职人数',
        type: 'heatmap',
        data,
        label: {
          show: true,
          color: '#f1f5f9',
          fontSize: 11,
          fontFamily: 'JetBrains Mono',
          fontWeight: 600,
          formatter: (params: any) => {
            return params.data[2] > 0 ? params.data[2] : ''
          },
        },
        itemStyle: {
          borderRadius: 4,
          borderColor: 'rgba(15,23,42,0.8)',
          borderWidth: 2,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 12,
            shadowColor: 'rgba(0,0,0,0.5)',
          },
        },
        progressive: 1000,
        animation: true,
        animationDuration: 800,
        animationEasing: 'cubicOut',
      },
    ],
  }
}

const { updateChart } = useECharts(chartRef, getOption)

const switchRange = (range: TimeRange) => {
  timeRange.value = range
  updateChart()
}

const topPeak = computed(() => peaks.value[0])
</script>

<template>
  <div class="glass-card glass-card-hover flex h-full flex-col p-5">
    <div class="mb-4 flex items-center justify-between">
      <div>
        <h3 class="section-title">部门-离职原因交叉分析</h3>
        <p class="section-subtitle mt-0.5">各部门主要离职原因分布</p>
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

    <div v-if="topPeak" class="mb-3 flex items-center gap-3 rounded-xl bg-white/[0.03] px-4 py-3">
      <div
        class="flex h-9 w-9 items-center justify-center rounded-lg text-xs font-700"
        :style="{
          background: REASON_COLORS[topPeak.topReason] + '20',
          color: REASON_COLORS[topPeak.topReason],
        }"
      >
        最突出
      </div>
      <div class="flex-1">
        <p class="text-xs text-slate-400">{{ topPeak.department }}</p>
        <p class="font-display text-sm font-700" :style="{ color: REASON_COLORS[topPeak.topReason] }">
          {{ topPeak.topReason }} · {{ topPeak.topCount }} 人
        </p>
      </div>
      <div class="text-right">
        <p class="text-xs text-slate-400">TOP问题</p>
        <p class="stat-number text-sm text-slate-100">{{ topPeak.topReason }}</p>
      </div>
    </div>

    <div ref="chartRef" class="min-h-[320px] flex-1" />
  </div>
</template>
