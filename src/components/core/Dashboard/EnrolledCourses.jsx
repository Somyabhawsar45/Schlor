import { useEffect, useState } from "react"
import ProgressBar from "@ramonak/react-progress-bar"
import { BiDotsVerticalRounded } from "react-icons/bi"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { getUserEnrolledCourses } from "../../../services/operations/profileAPI"

export default function EnrolledCourses() {
const { token: reduxToken } = useSelector((state) => state.auth)
const token = reduxToken || localStorage.getItem("token")
const navigate = useNavigate()

  const [enrolledCourses, setEnrolledCourses] = useState(null)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await getUserEnrolledCourses(token) // Getting all the published and the drafted courses

        // Filtering the published course out
        const filterPublishCourse = res.filter((ele) => ele.status !== "Draft")
        // console.log(
        //   "Viewing all the couse that is Published",
        //   filterPublishCourse
        // )

        setEnrolledCourses(filterPublishCourse)
      } catch (error) {
        console.log("Could not fetch enrolled courses.")
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="text-2xl font-bold text-[#f0f9ff] mb-6">Enrolled Courses</div>
      {!enrolledCourses ? (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center bg-[#060d1a]">
          <div className="spinner"></div>
        </div>
      ) : !enrolledCourses.length ? (
        <p className="grid h-[10vh] w-full place-content-center text-[#94a3b8]">
          You have not enrolled in any course yet.
          {/* TODO: Modify this Empty State */}
        </p>
      ) : (
        <div className="my-8 text-[#f0f9ff]">
          {/* Headings */}
          <div className="flex rounded-t-[4px] bg-[#0c1a2e] border border-[rgba(6,182,212,0.15)] text-[#94a3b8] text-xs uppercase tracking-widest">
            <p className="w-[45%] px-5 py-3">Course Name</p>
            <p className="w-1/4 px-2 py-3">Duration</p>
            <p className="flex-1 px-2 py-3">Progress</p>
          </div>
          {/* Course Names */}
          {enrolledCourses.map((course, i, arr) => (
            <div
              className={`flex items-center bg-[#0c1a2e] border border-[rgba(6,182,212,0.15)] border-t-0 hover:border-[#06b6d4] transition-all duration-200 ${
                i === arr.length - 1 ? "rounded-b-[4px]" : "rounded-none"
              }`}
              key={i}
            >
              <div
                className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                onClick={() => {
                  navigate(
                    `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                  )
                }}
              >
                <img
                  src={course.thumbnail}
                  alt="course_img"
                  className="h-14 w-14 rounded-[4px] object-cover border border-[rgba(6,182,212,0.15)]"
                />
                <div className="flex max-w-xs flex-col gap-2">
                  <p className="font-semibold text-[#f0f9ff] text-sm">{course.courseName}</p>
                  <p className="text-xs text-[#94a3b8]">
                    {course.courseDescription.length > 50
                      ? `${course.courseDescription.slice(0, 50)}...`
                      : course.courseDescription}
                  </p>
                </div>
              </div>
              <div className="w-1/4 px-2 py-3 text-[#94a3b8] text-sm">{course?.totalDuration}</div>
              <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                <p className="text-[#94a3b8] text-xs">Progress: {course.progressPercentage || 0}%</p>
                <ProgressBar
                  completed={course.progressPercentage || 0}
                  height="4px"
                  isLabelVisible={false}
                  bgColor="#06b6d4"
                  baseBgColor="rgba(6,182,212,0.1)"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}