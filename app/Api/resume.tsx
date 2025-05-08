import api from "@/lib/api";
import { ResumeFormData } from "@/types";


const getUserResumes = async () => {
  const response = await api.get(`/resumes`);
  return response.data;
};

const createResume = async (resumeData: ResumeFormData) => {
  const response = await api.post(`/resumes`, resumeData);
  return response.data;
};

const getResumeById = async (resumeId: string) => {
  console.log("Fetching resume with ID:", resumeId); // Debug log
  const response = await api.get(`/resumes/${resumeId}`);
  return response.data;
};

const updateResume = async (resumeId: string, updatedData: ResumeFormData) => {
  const response = await api.put(`/resumes/${resumeId}`, updatedData);
  return response.data;
};

const deleteResume = async (resumeId: string) => {
  const response = await api.delete(`/resumes/${resumeId}`);
  return response.data;
};

export {
  getUserResumes,
  getResumeById,
  createResume,
  updateResume,
  deleteResume,
};
