import { Classroom } from "@types";

const createClassroom = (classroom: Classroom) => {
  const token = JSON.parse(sessionStorage.getItem("loggedInUser"))?.token;
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/classrooms", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(classroom),
  });
};

const ClassroomService = {
  createClassroom,
};

export default ClassroomService;
