"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter, useParams } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import LivePreview from "@/app/components/LivePreview";
import {
  createResume,
  getResumeById,
  updateResume,
} from "@/app/Api/resume";
import { useModal } from "@/app/contexts/ModalContext";
import { ResumeFormData } from "@/types";
import toast from "react-hot-toast";

const PDFDownloadButton = dynamic(() => import("@/component/PDFDownloadButton"), {
  ssr: false,
});

export default function ResumePage() {
  const router = useRouter();
  const params = useParams();
  const { openModal } = useModal();

  const id = params?.id ? String(params.id) : undefined;
  const isEditMode = id !== "new" && !!id;

  const [data, setData] = useState<ResumeFormData>({
    title: "",
    fullName: "",
    summary: "",
    experience: "",
    education: "",
    skills: "",
  });

  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setContainerWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/dashboard");
  }, [router]);

  const { data: resumeData, isError: fetchError, error } = useQuery({
    queryKey: ["resume", id],
    queryFn: async () => {
      if (!id || id === "new") throw new Error("Invalid resume ID");
      return await getResumeById(id);
    },
    enabled: isEditMode,
    retry: 1,
  });

  useEffect(() => {
    if (fetchError && error) {
      router.push("/dashboard");
    }
  }, [fetchError, error, router]);

  useEffect(() => {
    if (resumeData) {
      setData({
        title: String(resumeData.title || ""),
        fullName: String(resumeData.fullName || ""),
        summary: String(resumeData.summary || ""),
        experience: String(resumeData.experience || ""),
        education: String(resumeData.education || ""),
        skills: String(resumeData.skills || ""),
      });
    }
  }, [resumeData]);

  const createMutation = useMutation({
    mutationFn: (formData: ResumeFormData) => createResume(formData),
    onSuccess: () => {
      toast.success("Resume created successfully.");
      router.push("/dashboard");
    },
    onError: (err) => {
      toast.error("Failed to create resume.");
      console.error("Create failed:", err);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (formData: ResumeFormData) => {
      if (!id) throw new Error("Resume ID is missing");
      return updateResume(id, formData);
    },
    onSuccess: () => {
      toast.success("Resume updated successfully.");
      router.push("/dashboard");
    },
    onError: (err) => {
      toast.error("Failed to update resume.");
      console.error("Update failed:", err);
    },
  });
  const handleChange = (field: keyof ResumeFormData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const isComplete = Object.values(data).every(
    (val) => typeof val === "string" && val.trim() !== ""
  );

  const handleSubmit = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      openModal("login");
      return;
    }

    if (!isComplete) return;

    if (isEditMode && id) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="min-h-screen w-full px-4 py-6 overflow-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {isEditMode ? "Edit Your Resume" : "Create Your Resume"}
      </h1>

      <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
        <div className="flex-1 space-y-4">
          <Input
            className="sm:w-150 w-full"
            placeholder="Title"
            value={data.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
          <Input
            className="sm:w-150 w-full"
            placeholder="Full Name"
            value={data.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
          />
          <Textarea
            className="sm:w-150 w-full h-32 resize-none"
            placeholder="Summary"
            value={data.summary}
            onChange={(e) => handleChange("summary", e.target.value)}
          />
          <Textarea
            className="sm:w-150 w-full h-32 resize-none"
            placeholder="Experience"
            value={data.experience}
            onChange={(e) => handleChange("experience", e.target.value)}
          />
          <Textarea
            className="sm:w-150 w-full h-32 resize-none"
            placeholder="Education"
            value={data.education}
            onChange={(e) => handleChange("education", e.target.value)}
          />
          <Textarea
            className="sm:w-150 w-full h-32 resize-none"
            placeholder="Skills"
            value={data.skills}
            onChange={(e) => handleChange("skills", e.target.value)}
          />

          {isComplete ? (
            <div className="flex gap-4 items-center">
              <PDFDownloadButton
                resume={{
                  ...data,
                  id: isEditMode ? id : undefined,
                }}
              />
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 disabled:opacity-50"
              >
                {isLoading
                  ? isEditMode
                    ? "Saving..."
                    : "Creating..."
                  : isEditMode
                  ? "Update Resume"
                  : "Create Resume"}
              </button>
            </div>
          ) : (
            <p className="text-sm text-gray-500 pt-2">
              Please fill in all fields to enable PDF download and saving.
            </p>
          )}
        </div>

        <LivePreview
          {...data}
          id={isEditMode && id ? id : undefined}
          containerWidth={containerWidth}
        />
      </div>
    </div>
  );
}
