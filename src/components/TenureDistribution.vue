<script setup lang="ts">
import { ref, computed } from 'vue'
import * as echarts from 'echarts'
import { useECharts } from '@/composables/useECharts'
import { getTenureStats } from '@/data/mockData'
import { TENURE_COLORS } from '@/data/types'

const chartRef = ref<HTMLElement | null>(null)

const stats = computed(() => getTenureStats())

const peakIndex = computed(() => {
  let maxIdx = 0
  stats.value.forEach((s, i) => {
    if (s.count > stats.value[maxIdx].count) maxIdx = i
  })
  return maxIdx
})

const getOption = (): echarts.EChartsOption => {
  const data = stats.value

  return {
    grid: { left: 40, right: 20, top: 36, bottom: 30, containLabel: true },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: 'rgba(15,23,42,0.95)',
      borderColor: 'rgba(148,163,184,0.15)',
      borderWidth: 1,
      textStyle: { color: '#f1f5f9', fontSize: 12 },
      formatter: (params: any) => {
        const p = params[0]
        const item = data[p.dataIndex]
        return `<div style="font-weight:600;margin-bottom:4px">${item.range}</div>
          <div>离职人数：<b>${item.count}</b> 人</div>
          <div>占比：<b>${item.percentage}%</b></div>`
      },
    },
    xAxis: {
      type: 'category',
      data: data.map((d) => d.range),
      axisLine: { lineStyle: { color: 'rgba(148,163,184,0.15)' } },
      axisTick: { show: false },
      axisLabel: { color: '#94a3b8', fontSize: 11, fontWeight: 500 },
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#64748b', fontSize: 11, fontFamily: 'JetBrains Mono' },
      splitLine: { lineStyle: { color: 'rgba(148,163,184,0.08)', type: 'dashed' } },
    },
    series: [
      {
        type: 'bar',
        data: data.map((d, i) => ({
          value: d.count,
          itemStyle: {
            color:
              i === peakIndex.value
                ? new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: TENURE_COLORS[i] },
                    { offset: 1, color: TENURE_COLORS[i] + '30' },
                  ])
                : new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: TENURE_COLORS[i] + '80' },
                    { offset: 1, color: TENURE_COLORS[i] + '15' },
                  ]),
            borderRadius: [6, 6, 0, 0],
            borderWidth: i === peakIndex.value ? 0 : 0,
          },
        })),
        barWidth: '45%',
        label: {
          show: true,
          position: 'top',
          color: '#94a3b8',
          fontSize: 11,
          fontFamily: 'JetBrains Mono',
          fontWeight: 600,
          formatter: (params: any) => {
            const item = data[params.dataIndex]
            return `${item.percentage}%`
          },
        },
        markPoint: {
          symbol: 'pin',
          symbolSize: 36,
          itemStyle: { color: '#f59e0b' },
          label: { color: '#0f172a', fontSize: 9, fontWeight: 700 },
          data:
            peakIndex.value >= 0
              ? [{ name: '峰值', coord: [peakIndex.value, data[peakIndex.value].count], value: '峰值' }]
              : [],
        },
        emphasis: {
          itemStyle: { shadowBlur: 12, shadowColor: 'rgba(0,0,0,0.3)' },
        },
      },
    ],
    animation: true,
    animationDuration: 800,
    animationEasing: 'cubicOut',
  }
}

useECharts(chartRef, getOption)

const peakRange = computed(() => stats.value[peakIndex.value])
</script>

<template>
  <div class="glass-card glass-card-hover flex h-full flex-col p-5">
    <div class="mb-4 flex items-center justify-between">
      <div>
        <h3 class="section-title">司龄分布分析</h3>
        <p class="section-subtitle mt-0.5">离职员工入职时长分布</p>
      </div>
      <div v-if="peakRange" class="flex items-center gap-2 rounded-lg bg-accent-amber/10 px-3 py-1.5">
        <span class="text-xs text-slate-400">最集中</span>
        <span class="font-display text-sm font-700 text-accent-amber">{{ peakRange.range }}</span>
      </div>
    </div>

    <div ref="chartRef" class="min-h-[280px] flex-1" />
  </div>
</template>
