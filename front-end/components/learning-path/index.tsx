import TeacherService from "@services/TeacherService";
import { useEffect, useState } from "react";

type Props = {
  teacherId: number;
  learningPath: string;
};

const LearningPath: React.FC<Props> = ({ teacherId, learningPath }: Props) => {
  const [newLearningPath, setNewLearningPath] = useState(learningPath);

  const handleLearningPathChange = async (event: {
    target: { value: string };
  }) => {
    {
      /* Use TeacherService to update the learning path for the teacher */
      setNewLearningPath(event.target.value);
      await TeacherService.updateLearningPath(teacherId, event.target.value);
    }
  };

  return (
    <div className="ml-6">
      <select
        id="learningPath"
        className="ml-2 p-1"
        value={newLearningPath}
        onChange={handleLearningPathChange}
      >
        <option value="Infrastructure">Infrastructure</option>
        <option value="Software development">Software development</option>
        <option value="Cybersecurity">Cybersecurity</option>
      </select>
    </div>
  );
};

export default LearningPath;
