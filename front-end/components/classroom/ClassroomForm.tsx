import ClassroomService from "@services/ClassroomService";
import { Classroom, StatusMessage, User } from "@types";
import classNames from "classnames";
import { clear } from "console";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";

const ClassroomForm: React.FC = () => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(null);
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

  const { t } = useTranslation();

  const clearErrors = () => {
    setNameError(null);
    setStatusMessages([]);
  };

  const validate = (): boolean => {
    let result = true;

    if (name.trim() === "") {
      setNameError(t("classroom.validate.name"));
      result = false;
    }

    return result;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    clearErrors();

    if (!validate()) {
      return;
    }

    const classroom = { name };

    const response = await ClassroomService.createClassroom(classroom);

    if (response.status === 200) {
      const data = await response.json();
      setStatusMessages([
        {
          message: t("classroom.success", {
            name: classroom.name,
            id: data.id,
          }),
          type: "success",
        },
      ]);
      setName("");
    } else if (response.status === 400) {
      setStatusMessages([{ message: t("classroom.error"), type: "error" }]);
    } else {
      setStatusMessages([
        {
          message: t("general.error"),
          type: "error",
        },
      ]);
    }
  };

  return (
    <div className="max-w-sm m-auto">
      <div>
        <h3 className="px-0">{t("classroom.title")}</h3>
      </div>
      {statusMessages && (
        <div className="row">
          <ul className="list-none mb-3 mx-auto ">
            {statusMessages.map(({ message, type }, index) => (
              <li
                key={index}
                className={classNames({
                  " text-red-800": type === "error",
                  "text-green-800": type === "success",
                })}
              >
                {message}
              </li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label
              htmlFor="nameInput"
              className="block mb-2 text-sm font-medium"
            >
              {t("classroom.label.name")}
            </label>
          </div>
          <div className="block mb-2 text-sm font-medium">
            <input
              id="nameInput"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
            />
            {nameError && <div className="text-red-800 ">{nameError}</div>}
          </div>
        </div>
        <div className="row">
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            type="submit"
          >
            {t("classroom.button")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClassroomForm;
