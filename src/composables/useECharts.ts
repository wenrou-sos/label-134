import { ref, onMounted, onBeforeUnmount, watch, type Ref } from 'vue'
import * as echarts from 'echarts'

export function useECharts(
  el: Ref<HTMLElement | null>,
  getOption: () => echarts.EChartsOption,
) {
  const chart = ref<echarts.ECharts | null>(null)

  const initChart = () => {
    if (!el.value) return
    chart.value = echarts.init(el.value, undefined, { renderer: 'canvas' })
    chart.value.setOption(getOption())
  }

  const resize = () => {
    chart.value?.resize()
  }

  const updateChart = () => {
    if (chart.value) {
      chart.value.setOption(getOption(), true)
    }
  }

  onMounted(() => {
    initChart()
    window.addEventListener('resize', resize)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', resize)
    chart.value?.dispose()
    chart.value = null
  })

  watch(
    () => el.value,
    (val) => {
      if (val && !chart.value) {
        initChart()
      }
    },
  )

  return { chart, resize, updateChart }
}
