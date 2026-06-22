<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  title: string
  value: number | string
  unit?: string
  icon?: string
  accent?: 'teal' | 'coral' | 'amber' | 'violet' | 'sky'
  subtitle?: string
  trend?: number
  delay?: number
}

const props = withDefaults(defineProps<Props>(), {
  unit: '',
  accent: 'teal',
  delay: 0,
})

const accentMap: Record<string, { from: string; to: string; glow: string; text: string }> = {
  teal: { from: 'rgba(20,184,166,0.15)', to: 'rgba(20,184,166,0)', glow: 'rgba(20,184,166,0.25)', text: '#14b8a6' },
  coral: { from: 'rgba(244,63,94,0.15)', to: 'rgba(244,63,94,0)', glow: 'rgba(244,63,94,0.25)', text: '#f43f5e' },
  amber: { from: 'rgba(245,158,11,0.15)', to: 'rgba(245,158,11,0)', glow: 'rgba(245,158,11,0.25)', text: '#f59e0b' },
  violet: { from: 'rgba(139,92,246,0.15)', to: 'rgba(139,92,246,0)', glow: 'rgba(139,92,246,0.25)', text: '#8b5cf6' },
  sky: { from: 'rgba(56,189,248,0.15)', to: 'rgba(56,189,248,0)', glow: 'rgba(56,189,248,0.25)', text: '#38bdf8' },
}

const colors = computed(() => accentMap[props.accent])
const displayValue = computed(() =>
  typeof props.value === 'number' ? props.value.toLocaleString() : props.value,
)
</script>

<template>
  <div
    class="glass-card glass-card-hover relative overflow-hidden p-5"
    :style="{ animationDelay: `${delay}ms` }"
  >
    <div
      class="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full blur-2xl"
      :style="{ background: `radial-gradient(circle, ${colors.from}, ${colors.to})` }"
    />

    <div class="relative flex items-start justify-between">
      <div class="min-w-0">
        <p class="section-subtitle truncate">{{ title }}</p>
        <div class="mt-2 flex items-baseline gap-1">
          <span class="stat-number text-3xl text-slate-50" :style="{ color: colors.text }">
            {{ displayValue }}
          </span>
          <span v-if="unit" class="text-sm text-slate-400">{{ unit }}</span>
        </div>
        <p v-if="subtitle" class="mt-1.5 text-xs text-slate-500">{{ subtitle }}</p>
      </div>

      <div
        class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg"
        :style="{
          background: colors.from,
          boxShadow: `0 0 16px ${colors.glow}`,
        }"
      >
        {{ icon }}
      </div>
    </div>

    <div v-if="trend !== undefined" class="relative mt-3 flex items-center gap-1.5">
      <span
        class="text-xs font-600"
        :class="trend >= 0 ? 'text-accent-coral' : 'text-accent-teal'"
      >
        {{ trend >= 0 ? '↑' : '↓' }} {{ Math.abs(trend) }}%
      </span>
      <span class="text-xs text-slate-500">较上期</span>
    </div>
  </div>
</template>
