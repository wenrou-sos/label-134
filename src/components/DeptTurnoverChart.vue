<script setup lang="ts">
import { ref, computed } from 'vue'
import * as echarts from 'echarts'
import { useECharts } from '@/composables/useECharts'
import { getDeptTurnover } from '@/data/mockData'

const WARNING_LINE = 10

const chartRef = ref<HTMLElement | null>(null)

const deptData = computed(() => getDeptTurnover())

const highRiskDepts = computed(() => deptData.value.filter((d) => d.turnoverRate > WARNING_LINE))

const getOption = (): echarts.EChartsOption => {
  const data = deptData.value
  const sorted = [...data].reverse()

  return {
    grid: { left: 80, right: 50, top: 30, bottom: 16, containLabel: false },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: 'rgba(15,23,42,0.95)',
      borderColor: 'rgba(148,163,184,0.15)',
      borderWidth: 1,
      textStyle: { color: '#f1f5f9', fontSize: 12 },
      formatter: (params: any) => {
        const p = params[0]
        const dept = p.name
        const rate = p.value
        const item = data.find((d) => d.department === dept)
        if (!item) return ''
        const isWarning = rate > WARNING_LINE
        const status = isWarning
          ? '<span style="color:#f43f5e;font-weight:600">⚠ 超出预警线</span>'
          : '<span style="color:#14b8a6">✓ 正常范围</span>'
        return `<div style="font-weight:600;margin-bottom:4px">${dept}</div>
          <div>离职率：<b>${rate}%</b></div>
          <div>离职人数：<b>${item.resignedCount}</b> / ${item.totalCount}</div>
          <div style="margin-top:4px">${status}</div>`
      },
    },
    xAxis: {
      type: 'value',
      max: Math.max(...data.map((d) => d.turnoverRate), 15) + 2,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: '#64748b',
        fontSize: 11,
        fontFamily: 'JetBrains Mono',
        formatter: '{value}%',
      },
      splitLine: { lineStyle: { color: 'rgba(148,163,184,0.08)', type: 'dashed' } },
    },
    yAxis: {
      type: 'category',
      data: sorted.map((d) => d.department),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#cbd5e1', fontSize: 12, fontWeight: 500, margin: 12 },
    },
    series: [
      {
        type: 'bar',
        data: sorted.map((d) => ({
          value: d.turnoverRate,
          itemStyle: {
            color:
              d.turnoverRate > WARNING_LINE
                ? new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    { offset: 0, color: 'rgba(244,63,94,0.3)' },
                    { offset: 1, color: '#f43f5e' },
                  ])
                : new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    { offset: 0, color: 'rgba(20,184,166,0.2)' },
                    { offset: 1, color: '#14b8a6' },
                  ]),
            borderRadius: [0, 6, 6, 0],
          },
        })),
        barWidth: 16,
        label: {
          show: true,
          position: 'right',
          color: '#94a3b8',
          fontSize: 11,
          fontFamily: 'JetBrains Mono',
          fontWeight: 600,
          formatter: '{c}%',
        },
        markLine: {
          symbol: 'none',
          silent: true,
          lineStyle: { color: '#f43f5e', type: 'dashed', width: 1.5 },
          label: {
            formatter: '预警线 10%',
            color: '#f43f5e',
            fontSize: 10,
            fontWeight: 600,
            position: 'insideEndTop',
          },
          data: [{ xAxis: WARNING_LINE }],
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
</script>

<template>
  <div class="glass-card glass-card-hover flex h-full flex-col p-5">
    <div class="mb-4 flex items-center justify-between">
      <div>
        <h3 class="section-title">部门离职率对比</h3>
        <p class="section-subtitle mt-0.5">单月离职率 · 预警线 10%</p>
      </div>
      <div
        v-if="highRiskDepts.length > 0"
        class="flex items-center gap-1.5 rounded-lg bg-accent-coral/10 px-2.5 py-1"
      >
        <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-coral" />
        <span class="text-xs font-600 text-accent-coral">{{ highRiskDepts.length }} 个部门预警</span>
      </div>
      <div v-else class="flex items-center gap-1.5 rounded-lg bg-accent-teal/10 px-2.5 py-1">
        <span class="h-1.5 w-1.5 rounded-full bg-accent-teal" />
        <span class="text-xs font-600 text-accent-teal">全部正常</span>
      </div>
    </div>

    <div ref="chartRef" class="min-h-[280px] flex-1" />
  </div>
</template>
