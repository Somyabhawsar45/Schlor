import { useState } from "react"
import { Chart, registerables } from "chart.js"
import { Pie } from "react-chartjs-2"

Chart.register(...registerables)

export default function InstructorChart({ courses }) {
  // State to keep track of the currently selected chart
  const [currChart, setCurrChart] = useState("students")

  // Function to generate colors for the chart, cycling through the cyan palette
  const generateRandomColors = (numColors) => {
    const palette = ["#06b6d4", "#0891b2", "#67e8f9", "#0369a1"]
    const colors = []
    for (let i = 0; i < numColors; i++) {
      colors.push(palette[i % palette.length])
    }
    return colors
  }

  // Data for the chart displaying student information
  const chartDataStudents = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalStudentsEnrolled),
        backgroundColor: generateRandomColors(courses.length),
      },
    ],
  }

  // Data for the chart displaying income information
  const chartIncomeData = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalAmountGenerated),
        backgroundColor: generateRandomColors(courses.length),
      },
    ],
  }

  // Options for the chart
  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#94a3b8",
        },
      },
      tooltip: {
        backgroundColor: "#0c1a2e",
        borderColor: "rgba(6,182,212,0.15)",
        borderWidth: 1,
        titleColor: "#f0f9ff",
        bodyColor: "#94a3b8",
      },
    },
  }

  return (
    <div className="flex flex-1 flex-col gap-y-4 bg-[#0c1a2e] border border-[rgba(6,182,212,0.15)] rounded-[4px] p-5">
      <p className="text-lg font-semibold text-[#f0f9ff] mb-4">Visualize</p>
      <div className="space-x-4 font-semibold">
        {/* Button to switch to the "students" chart */}
        <button
          onClick={() => setCurrChart("students")}
          className={`rounded-[4px] p-1 px-3 transition-all duration-200 ${
            currChart === "students"
              ? "bg-[rgba(6,182,212,0.08)] text-[#06b6d4]"
              : "text-[#94a3b8] hover:text-[#f0f9ff]"
          }`}
        >
          Students
        </button>
        {/* Button to switch to the "income" chart */}
        <button
          onClick={() => setCurrChart("income")}
          className={`rounded-[4px] p-1 px-3 transition-all duration-200 ${
            currChart === "income"
              ? "bg-[rgba(6,182,212,0.08)] text-[#06b6d4]"
              : "text-[#94a3b8] hover:text-[#f0f9ff]"
          }`}
        >
          Income
        </button>
      </div>
      <div className="relative mx-auto aspect-square h-full w-full">
        {/* Render the Pie chart based on the selected chart */}
        <Pie
          data={currChart === "students" ? chartDataStudents : chartIncomeData}
          options={options}
        />
      </div>
    </div>
  )
}