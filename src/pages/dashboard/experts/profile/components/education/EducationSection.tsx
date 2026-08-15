/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Plus, Trash2, Upload, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProfileInput } from "@/components/ui/profileInput";
import { toast } from "sonner";
import {
  useAddEducationMutation,
  useUpdateEducationMutation,
  useDeleteEducationMutation,
} from "@/redux/features/expertDashboard/expertProfile.api";
import { formatApiErrorMessage, getImageUrl } from "../../utils/profileUtils";

export default function EducationSection() {
  const { control, getValues, setValue, watch } = useFormContext();
  const {
    fields: eduFields,
    append: appendEdu,
    remove: removeEdu,
  } = useFieldArray({ control, name: "educations" });

  const [addEducation] = useAddEducationMutation();
  const [updateEducation] = useUpdateEducationMutation();
  const [deleteEducation] = useDeleteEducationMutation();

  const [eduFiles, setEduFiles] = React.useState<Record<number, File>>({});

  const handleEduUpload = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setEduFiles((prev) => ({ ...prev, [index]: file }));
      setValue(`educations.${index}.fileName`, file.name);
      setValue(`educations.${index}.file`, file);
    }
  };

  const handleRemoveEduFile = (index: number) => {
    setEduFiles((prev) => {
      const next = { ...prev };
      delete next[index];
      return next;
    });
    setValue(`educations.${index}.fileUrl`, null);
    setValue(`educations.${index}.file`, null);
    setValue(`educations.${index}.certificate`, null);
    setValue(`educations.${index}.fileName`, "");
  };

  const handleSaveEdu = async (index: number) => {
    const values = getValues(`educations.${index}`);
    if (!values.degree) {
      toast.error("Degree is required");
      return;
    }
    if (!values.institution) {
      toast.error("Institution is required");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("degree", values.degree);
      formData.append("institution", values.institution);
      const yearVal = parseInt(values.year, 10);
      if (!isNaN(yearVal)) {
        formData.append("year", String(yearVal));
      }
      formData.append("order", String(index));

      const fileObj = eduFiles[index] || values.file;
      if (fileObj && fileObj instanceof File) {
        formData.append("certificate", fileObj);
      }

      if (!values.id) {
        // Create new education -> POST
        const res = await addEducation(formData).unwrap();
        const newId = res?.data?.id || res?.id;
        if (newId) {
          setValue(`educations.${index}.id`, newId);
        }
        toast.success("Education added successfully!");
      } else {
        // Update existing education -> PATCH
        await updateEducation({
          id: values.id,
          data: formData,
        }).unwrap();
        toast.success("Education updated successfully!");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(formatApiErrorMessage(err));
    }
  };

  const handleDeleteEdu = async (index: number) => {
    const values = getValues(`educations.${index}`);
    if (!values.id) {
      removeEdu(index);
      return;
    }

    try {
      await deleteEducation(values.id).unwrap();
      removeEdu(index);
      toast.success("Education deleted successfully!");
    } catch (err: any) {
      console.error(err);
      toast.error(formatApiErrorMessage(err));
    }
  };

  return (
    <Card className="bg-[#0F172A] border-none">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-white font-semibold uppercase">
            Education
          </CardTitle>
          <p className="text-sm text-zinc-400 mt-1">
            Add your educational qualifications
          </p>
        </div>
        <Button
          type="button"
          onClick={() =>
            appendEdu({ id: null, degree: "", institution: "", year: "" })
          }
          className="bg-[rgba(59,130,246,0.2)] hover:bg-blue-200 text-[#0A66C2]"
        >
          <Plus className="w-4 h-4 mr-2" color="#0A66C2" /> Add Education
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {eduFields.map((field, index) => {
          const currentEdu = watch(`educations.${index}`) as any;
          const eduId = currentEdu?.id;
          const uploadedFile = eduFiles[index];
          const fileUrl = uploadedFile
            ? null
            : getImageUrl(currentEdu?.fileUrl || currentEdu?.certificate);
          const fileName =
            uploadedFile?.name ||
            currentEdu?.fileName ||
            (fileUrl ? "Uploaded Certificate" : "");

          return (
            <div
              key={field.id}
              className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 relative"
            >
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-red-400"
                onClick={() => handleDeleteEdu(index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ProfileInput
                  name={`educations.${index}.degree`}
                  label="Degree / Qualification"
                  placeholder="e.g. PhD in Clinical Psychology, MBA, Master of Arts"
                />
                <ProfileInput
                  name={`educations.${index}.institution`}
                  label="Institution"
                  placeholder="e.g. Harvard University, Stanford, University of Oxford"
                />
                <ProfileInput
                  name={`educations.${index}.year`}
                  label="Year"
                  placeholder="e.g. 2022"
                  type="number"
                />
              </div>

              <div className="mt-6">
                <label className="text-[#94A3B8] text-sm font-medium block mb-2">
                  Certificate (Optional)
                </label>
                <label className="border border-dashed border-zinc-600 hover:border-blue-500 transition-colors rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer bg-zinc-950">
                  <Upload className="w-8 h-8 text-zinc-400 mb-3" />
                  <p className="text-white text-sm">
                    Upload certificate / transcript
                  </p>
                  <p className="text-zinc-500 text-xs mt-1">JPG, PNG or PDF</p>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,application/pdf"
                    className="hidden"
                    onChange={(e) => handleEduUpload(index, e)}
                  />
                </label>
                {(uploadedFile || fileUrl) && (
                  <div className="mt-3 p-3 bg-zinc-800 rounded-lg flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 truncate min-w-0">
                      <div className="text-green-400 shrink-0">✓</div>
                      <div className="text-sm text-white truncate">
                        {fileName}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      {fileUrl && (
                        <a
                          href={fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-400 hover:underline font-medium"
                        >
                          View Certificate
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={() => handleRemoveEduFile(index)}
                        className="p-1 text-zinc-400 hover:text-red-400 hover:bg-zinc-700/50 rounded-lg transition-colors"
                        title="Remove certificate"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end pt-4">
                <Button
                  type="button"
                  onClick={() => handleSaveEdu(index)}
                  className="bg-[#0A66C2] hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg"
                >
                  {eduId ? "Update Education" : "Save Education"}
                </Button>
              </div>
            </div>
          );
        })}
        {eduFields.length === 0 && (
          <div className="text-center py-16 text-zinc-500">
            No education added yet.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
