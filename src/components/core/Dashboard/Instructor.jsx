import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI"
import { getInstructorData } from "../../../services/operations/profileAPI"
import InstructorChart from "./InstructorDashboard/InstructorChart"

export default function Instructor() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const [loading, setLoading] = useState(false)
  const [instructorData, setInstructorData] = useState(null)
  const [courses, setCourses] = useState([])

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const instructorApiData = await getInstructorData(token)
      const result = await fetchInstructorCourses(token)
      console.log(instructorApiData)
      if (instructorApiData.length) setInstructorData(instructorApiData)
      if (result) {
        setCourses(result)
      }
      setLoading(false)
    })()
  }, [])

  const totalAmount = instructorData?.reduce(
    (acc, curr) => acc + curr.totalAmountGenerated,
    0
  )

  const totalStudents = instructorData?.reduce(
    (acc, curr) => acc + curr.totalStudentsEnrolled,
    0
  )

  return (
    <div>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-[#f0f9ff]">
          Hi {user?.firstName} 👋
        </h1>
        <p className="font-medium text-[#94a3b8] text-sm">
          Let's start something new
        </p>
      </div>
      {loading ? (
        <div className="spinner"></div>
      ) : courses.length > 0 ? (
        <div>
          <div className="my-4 flex h-[450px] space-x-4">
            {/* Render chart / graph */}
            {totalAmount > 0 || totalStudents > 0 ? (
              <InstructorChart courses={instructorData} />
            ) : (
              <div className="flex-1 bg-[#0c1a2e] border border-[rgba(6,182,212,0.15)] rounded-[4px] p-5">
                <p className="text-lg font-bold text-[#f0f9ff]">Visualize</p>
                <p className="mt-4 text-xl font-medium text-[#94a3b8]">
                  Not Enough Data To Visualize
                </p>
              </div>
            )}
            {/* Total Statistics */}
            <div className="flex min-w-[250px] flex-col bg-[#0c1a2e] border border-[rgba(6,182,212,0.15)] rounded-[4px] p-5">
              <p className="text-lg font-bold text-[#f0f9ff]">Statistics</p>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-sm text-[#94a3b8]">Total Courses</p>
                  <p className="text-3xl font-bold text-[#06b6d4]">
                    {courses.length}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#94a3b8]">Total Students</p>
                  <p className="text-3xl font-bold text-[#06b6d4]">
                    {totalStudents}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#94a3b8]">Total Income</p>
                  <p className="text-3xl font-bold text-[#06b6d4]">
                    Rs. {totalAmount}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#0c1a2e] border border-[rgba(6,182,212,0.15)] rounded-[4px] p-5">
            {/* Render 3 courses */}
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold text-[#f0f9ff]">Your Courses</p>
              <Link to="/dashboard/my-courses">
                <p className="text-xs font-semibold text-[#06b6d4] hover:text-[#67e8f9] transition-colors duration-150">View All</p>
              </Link>
            </div>
            <div className="my-4 flex items-start space-x-6">
              {courses.slice(0, 3).map((course) => (
                <div key={course._id} className="w-1/3">
                  <img
                    src={course.thumbnail}
                    alt={course.courseName}
                    className="h-[201px] w-full rounded-[4px] object-cover border border-[rgba(6,182,212,0.15)]"
                  />
                  <div className="mt-3 w-full">
                    <p className="text-sm font-medium text-[#f0f9ff]">
                      {course.courseName}
                    </p>
                    <div className="mt-1 flex items-center space-x-2">
                      <p className="text-xs font-medium text-[#94a3b8]">
                        {course.studentsEnroled.length} students
                      </p>
                      <p className="text-xs font-medium text-[#94a3b8]">
                        |
                      </p>
                      <p className="text-xs font-medium text-[#94a3b8]">
                        Rs. {course.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-20 bg-[#0c1a2e] border border-[rgba(6,182,212,0.15)] rounded-[4px] p-6 py-20">
          <p className="text-center text-2xl font-bold text-[#f0f9ff]">
            You have not created any courses yet
          </p>
          <Link to="/dashboard/add-course">
            <p className="mt-1 text-center text-lg font-semibold text-[#06b6d4] hover:text-[#67e8f9] transition-colors duration-150">
              Create a course
            </p>
          </Link>
        </div>
      )}
    </div>
  )
}