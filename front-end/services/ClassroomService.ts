import { Classroom } from "@types";

const getToken = (): string => {
  const loggedInUserString = sessionStorage.getItem("loggedInUser");
  return loggedInUserString ? JSON.parse(loggedInUserString).token : "";
};

const createClassroom = (classroom: Classroom) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/classrooms", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(classroom),
  });
};

const ClassroomService = {
  createClassroom,
};

export default ClassroomService;
