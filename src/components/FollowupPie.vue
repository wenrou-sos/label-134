<script setup lang="ts">
import { ref, computed } from 'vue'
import * as echarts from 'echarts'
import { useECharts } from '@/composables/useECharts'
import { getFollowupStats } from '@/data/mockData'
import { FOLLOWUP_COLORS } from '@/data/types'

const chartRef = ref<HTMLElement | null>(null)

const stats = computed(() => getFollowupStats())

const total = computed(() => stats.value.reduce((s, d) => s + d.count, 0))

const getOption = (): echarts.EChartsOption => {
  const data = stats.value

  return {
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(15,23,42,0.95)',
      borderColor: 'rgba(148,163,184,0.15)',
      borderWidth: 1,
      textStyle: { color: '#f1f5f9', fontSize: 12 },
      formatter: (params: any) => {
        const item = data.find((d) => d.status === params.name)
        if (!item) return ''
        const color = FOLLOWUP_COLORS[params.name as keyof typeof FOLLOWUP_COLORS]
        return `<div style="font-weight:600;color:${color}">${params.name}</div>
          <div style="margin-top:4px">数量：<b>${params.value}</b> 个</div>
          <div>占比：<b>${item.percentage}%</b></div>`
      },
    },
    legend: {
      orient: 'horizontal',
      bottom: 8,
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 16,
      textStyle: { color: '#94a3b8', fontSize: 12 },
      icon: 'circle',
    },
    series: [
      {
        type: 'pie',
        radius: ['52%', '72%'],
        center: ['50%', '42%'],
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 6,
          borderColor: '#0b1120',
          borderWidth: 3,
        },
        label: {
          show: true,
          position: 'center',
          formatter: () => '',
        },
        emphasis: {
          scale: true,
          scaleSize: 6,
          label: {
            show: true,
            formatter: (params: any) => `{a|${params.value}}\n{b|${params.name}}`,
            rich: {
              a: {
                fontSize: 28,
                fontFamily: 'JetBrains Mono',
                fontWeight: 700,
                color: '#f1f5f9',
                lineHeight: 36,
              },
              b: {
                fontSize: 12,
                color: '#94a3b8',
                lineHeight: 20,
              },
            },
          },
        },
        data: data.map((d) => ({
          name: d.status,
          value: d.count,
          itemStyle: {
            color: FOLLOWUP_COLORS[d.status],
          },
        })),
      },
    ],
    graphic: [
      {
        type: 'text',
        left: 'center',
        top: '34%',
        style: {
          text: total.value.toString(),
          fill: '#f1f5f9',
          fontSize: 32,
          fontFamily: 'JetBrains Mono',
          fontWeight: 700,
        },
      } as any,
      {
        type: 'text',
        left: 'center',
        top: '46%',
        style: {
          text: '问题总数',
          fill: '#64748b',
          fontSize: 12,
        },
      } as any,
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
        <h3 class="section-title">面谈问题跟进</h3>
        <p class="section-subtitle mt-0.5">问题处理状态分布</p>
      </div>
    </div>

    <div ref="chartRef" class="min-h-[280px] flex-1" />

    <div class="mt-2 grid grid-cols-3 gap-2">
      <div
        v-for="item in stats"
        :key="item.status"
        class="rounded-lg bg-white/[0.03] px-3 py-2 text-center"
      >
        <div class="flex items-center justify-center gap-1.5">
          <span
            class="h-2 w-2 rounded-full"
            :style="{ background: FOLLOWUP_COLORS[item.status] }"
          />
          <span class="text-xs text-slate-400">{{ item.status }}</span>
        </div>
        <p class="stat-number mt-1 text-base text-slate-100">{{ item.count }}</p>
        <p class="text-xs text-slate-500">{{ item.percentage }}%</p>
      </div>
    </div>
  </div>
</template>
