import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaLock, FaPlayCircle, FaStar } from "react-icons/fa";
import img from "../assets/empty.jpg";
import Card from "../components/Card.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCourseData } from "@/redux/courseSlice";
import axios from "axios";
import { serverUrl } from "@/App";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

function ViewCourse() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { courseData, selectedCourseData } = useSelector(
    (store) => store.course
  );
  const { userData } = useSelector((store) => store.user);

  /* ---------------- STATES ---------------- */
  const [creatorData, setCreatorData] = useState(null);
  const [selectedCreatorCourse, setSelectedCreatorCourse] = useState([]);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  /* ---------------- SET SELECTED COURSE ---------------- */
  useEffect(() => {
    if (!courseData?.length) return;

    const course = courseData.find((c) => c._id === courseId);
    if (course) {
      dispatch(setSelectedCourseData(course));
    }
  }, [courseData, courseId, dispatch]);

  /* ---------------- CHECK ENROLLMENT ---------------- */
  useEffect(() => {
    if (!userData || !courseId) return;

    const enrolled = userData?.enrolledCourses?.some((c) => {
      const id = typeof c === "string" ? c : c._id;
      return id?.toString() === courseId?.toString();
    });

    setIsEnrolled(!!enrolled);
  }, [userData, courseId]);

  /* ---------------- FETCH CREATOR ---------------- */
  useEffect(() => {
    const getCreator = async () => {
      if (!selectedCourseData?.creator) return;

      try {
        const res = await axios.post(
          `${serverUrl}/api/course/getcreator`,
          { userId: selectedCourseData.creator },
          { withCredentials: true }
        );
        setCreatorData(res.data);
      } catch (err) {
        console.error("Creator fetch error", err);
      }
    };

    getCreator();
  }, [selectedCourseData]);

  /* ---------------- CREATOR OTHER COURSES ---------------- */
  useEffect(() => {
    if (!creatorData?._id || !courseData?.length) return;

    const filtered = courseData.filter(
      (c) => c.creator === creatorData._id && c._id !== courseId
    );

    setSelectedCreatorCourse(filtered);
  }, [creatorData, courseData, courseId]);

  /* ---------------- PAYMENT ---------------- */
  const handleEnrolled = async () => {
    try {
      const order = await axios.post(
        `${serverUrl}/api/payment/order`,
        { userId: userData._id, courseId },
        { withCredentials: true }
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.data.amount,
        currency: "INR",
        name: "VIRTUAL COURSES",
        order_id: order.data.id,
        handler: async (response) => {
          try {
            await axios.post(
              `${serverUrl}/api/payment/verify`,
              { courseId, userId: userData._id, ...response },
              { withCredentials: true }
            );
            toast.success("Enrollment Successful");
            setIsEnrolled(true);
          } catch {
            toast.error("Payment verification failed");
          }
        },
      };

      new window.Razorpay(options).open();
    } catch (err) {
      toast.error("Payment failed");
    }
  };

  /* ---------------- REVIEW ---------------- */
  const handleReview = async () => {
    try {
      setLoading(true);
      await axios.post(
        `${serverUrl}/api/review/givereview`,
        { rating, comment, courseId },
        { withCredentials: true }
      );
      toast.success("Review added");
      setRating(0);
      setComment("");
    } catch {
      toast.error("Review failed");
    } finally {
      setLoading(false);
    }
  };

  const avgRating =
    selectedCourseData?.reviews?.length > 0
      ? (
          selectedCourseData.reviews.reduce(
            (sum, r) => sum + r.rating,
            0
          ) / selectedCourseData.reviews.length
        ).toFixed(1)
      : 0;

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow p-6 space-y-6">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            <FaArrowLeftLong
              className="cursor-pointer mb-2"
              onClick={() => navigate("/")}
            />
            <img
              src={selectedCourseData?.thumbnail || img}
              className="rounded-xl w-full"
            />
          </div>

          <div className="flex-1 space-y-2">
            <h1 className="text-2xl font-bold">
              {selectedCourseData?.title}
            </h1>
            <p>{selectedCourseData?.subTitle}</p>
            <div className="text-yellow-500">⭐ {avgRating}</div>
            <p className="text-lg font-semibold">
              ₹{selectedCourseData?.price}
            </p>

            {!isEnrolled ? (
              <button
                className="bg-black text-white px-6 py-2 rounded"
                onClick={handleEnrolled}
              >
                Enroll Now
              </button>
            ) : (
              <button
                className="bg-green-200 text-green-700 px-6 py-2 rounded"
                onClick={() => navigate(`/viewlecture/${courseId}`)}
              >
                Watch Now
              </button>
            )}
          </div>
        </div>

        {/* CURRICULUM */}
        <div className="flex gap-6">
          <div className="w-2/5 border p-4 rounded">
            {selectedCourseData?.lectures?.map((lec, i) => (
              <button
                key={i}
                disabled={!lec.isPreviewFree}
                onClick={() => lec.isPreviewFree && setSelectedLecture(lec)}
                className="flex gap-2 w-full p-2 border rounded mb-2"
              >
                {lec.isPreviewFree ? <FaPlayCircle /> : <FaLock />}
                {lec.lectureTitle}
              </button>
            ))}
          </div>

          <div className="w-3/5 border p-4 rounded">
            {selectedLecture?.videoUrl ? (
              <video src={selectedLecture.videoUrl} controls />
            ) : (
              <p>Select free preview</p>
            )}
          </div>
        </div>

        {/* REVIEW */}
        <div>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <FaStar
                key={s}
                onClick={() => setRating(s)}
                className={s <= rating ? "text-yellow-500" : "text-gray-300"}
              />
            ))}
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border w-full p-2 mt-2"
          />
          <button
            onClick={handleReview}
            disabled={loading}
            className="bg-black text-white px-4 py-2 mt-2"
          >
            {loading ? <ClipLoader size={20} color="white" /> : "Submit"}
          </button>
        </div>

        {/* INSTRUCTOR */}
        <div className="flex gap-4">
          <img
            src={creatorData?.photoUrl || img}
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h3>{creatorData?.name}</h3>
            <p>{creatorData?.email}</p>
          </div>
        </div>

        {/* OTHER COURSES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {selectedCreatorCourse.map((c) => (
    <Card key={c._id} {...c} id={c._id} />
  ))}
</div>

      </div>
    </div>
  );
}

export default ViewCourse;
