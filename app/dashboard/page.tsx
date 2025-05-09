"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PlusIcon, TrashIcon, PencilIcon } from "lucide-react";
import toast from "react-hot-toast";

import { deleteResume, getUserResumes } from "../Api/resume";
import { useAuth } from "../contexts/authcontext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Resume = {
  id: string;
  title: string;
  summary: string;
  // Optional: createdAt?: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const [resumes, setResumes] = useState<Resume[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    const fetchResumes = async () => {
      if (!isAuthenticated) return;
      try {
        const data = await getUserResumes();
        setResumes(data);
      } catch  {
        console.error("Failed to fetch resumes");
        toast.error("Failed to fetch your resumes.");
      }
    };

    fetchResumes();
  }, [isAuthenticated]);

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteResume(deleteId);
      setResumes((prev) => prev.filter((r) => r.id !== deleteId));
      setDeleteId(null);
      toast.success("Resume deleted.");
  } catch {
  toast.error("Failed to delete resume.");
}

  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-0">
        {/* Add Resume Card */}
        <div
          onClick={() => {
            if (!isAuthenticated) {
              toast.error("Please login to create a resume.");
              return;
            }
            router.push(`/resume/new`);
          }}
          className="h-[300px] flex flex-col gap-5 items-center justify-center bg-white rounded-2xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50/50 cursor-pointer transition"
        >
          <div className="w-12 h-12 flex items-center justify-center bg-purple-200/60 rounded-2xl">
            <PlusIcon className="text-xl text-purple-500" />
          </div>
          <h3 className="font-medium text-gray-800">Add new resume</h3>
        </div>

        {/* Resume Cards */}
        {resumes.map((resume) => (
          <div
            key={resume.id}
            className="relative h-[300px] bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md hover:border-purple-400 transition group cursor-pointer"
          >
            {/* Action buttons */}
            <div className="absolute top-4 right-4 flex gap-1 z-10">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push(`/resume/${resume.id}`)}
                className="text-gray-500 hover:text-purple-600"
              >
                <PencilIcon className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDeleteId(resume.id)}
                className="text-red-500 hover:text-red-700"
              >
                <TrashIcon className="w-4 h-4" />
              </Button>
            </div>

            {/* Avatar or Icon */}
            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4">
              <span className="text-lg font-bold">{resume.title?.[0] || "R"}</span>
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-gray-800 line-clamp-1 mb-1">
              {resume.title}
            </h3>

            {/* Summary */}
            <p className="text-sm text-gray-600 line-clamp-3 mb-4">
              {resume.summary || "No summary available."}
            </p>

          </div>
        ))}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Resume?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-600">
            Are you sure you want to delete this resume? This action is irreversible.
          </p>
          <div className="flex gap-2 mt-4">
            <Button variant="destructive" onClick={handleDelete} className="flex-1">
              Yes, delete
            </Button>
            <Button variant="outline" onClick={() => setDeleteId(null)} className="flex-1">
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
