<template>
  <div class="analytics-wrapper">
    <div class="focus-time-wrapper">
      <header-bar title="focus time" />
      <div class="focus-time-content-wrapper">
        <div class="focus-time-item time-day">
          <div class="focus-time-item-title">TODAY</div>
          <div class="focus-time-item-content">
            <span>20</span>
            <span>/TOMATO</span>
          </div>
        </div>
        <div class="focus-time-item time-week">
          <div class="focus-time-item-title">WEEK</div>
          <div class="focus-time-item-content">
            <span>108</span>
            <span>/TOMATO</span>
          </div>
        </div>
      </div>
    </div>
    <div class="chart-wrapper">
      <header-bar title="chart" subtitle="< 2021.07.16 - 2021.07.22 >" />
      <canvas id="chart" width="400" height="250"></canvas>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import Chart, { ChartItem } from "chart.js/auto";
import HeaderBar from "@/components/AdvancedFeature/HeaderBar.vue";

export default defineComponent({
  name: "Analytics",
  components: {
    HeaderBar,
  },
  setup() {
    onMounted(() => {
      const ctx = (
        document.getElementById("chart") as HTMLCanvasElement
      )?.getContext("2d");
      new Chart(ctx as ChartItem, {
        type: "bar",
        data: {
          labels: ["7/16", "7/17", "7/18", "7/19", "7/20", "7/21", "7/22"],
          datasets: [
            {
              barPercentage: 0.6,
              data: [16, 12, 16, 8, 12, 4, 20],
              backgroundColor: [
                "#fff",
                "#fff",
                "#fff",
                "#fff",
                "#fff",
                "#fff",
                "#FF4384",
              ],
            },
          ],
        },
        options: {
          scales: {
            x: {
              grid: {
                display: false,
                borderColor: "#fff",
              },
              ticks: {
                color: "#fff",
                font: {
                  family: "Roboto",
                  size: 16,
                  weight: "bold",
                },
              },
            },
            y: {
              grid: {
                display: false,
                borderColor: "#fff",
              },
              ticks: {
                color: "#fff",
                stepSize: 4,
                font: {
                  family: "Roboto",
                  size: 16,
                  weight: "bold",
                },
              },
              beginAtZero: true,
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });
    });
  },
});
</script>

<style lang="scss" scoped>
.analytics-wrapper {
  padding-left: 100px;
}

.focus-time {
  &-content-wrapper {
    padding: 20px 20px 40px 20px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  &-item {
    display: flex;
    flex-direction: column;

    &-title {
      font-size: 16px;
      font-weight: bold;
      text-transform: uppercase;
      color: #fff;
    }

    &-content {
      & > span:first-child {
        font-size: 64px;
        font-weight: bold;
        color: #ff4384;
      }

      & > span:last-child {
        font-size: 16px;
        font-weight: bold;
        color: #ffffff33;
      }
    }
  }
}

#chart {
  margin-top: 20px;
}
</style>
