/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Plus, Trash2, Upload, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProfileInput } from "@/components/ui/profileInput";
import { toast } from "sonner";
import {
  useAddAchievementMutation,
  useUpdateAchievementMutation,
  useDeleteAchievementMutation,
} from "@/redux/features/expertDashboard/expertProfile.api";
import { formatApiErrorMessage, getImageUrl } from "../../utils/profileUtils";

export default function AchievementsSection() {
  const { control, getValues, setValue, watch } = useFormContext();
  const {
    fields: achieveFields,
    append: appendAchievement,
    remove: removeAchievement,
  } = useFieldArray({ control, name: "achievements" });

  const [addAchievement] = useAddAchievementMutation();
  const [updateAchievement] = useUpdateAchievementMutation();
  const [deleteAchievement] = useDeleteAchievementMutation();

  const [achievementFiles, setAchievementFiles] = React.useState<
    Record<number, File>
  >({});

  const handleAchievementUpload = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setAchievementFiles((prev) => ({ ...prev, [index]: file }));
      setValue(`achievements.${index}.fileName`, file.name);
      setValue(`achievements.${index}.file`, file);
    }
  };

  const handleRemoveAchievementFile = (index: number) => {
    setAchievementFiles((prev) => {
      const next = { ...prev };
      delete next[index];
      return next;
    });
    setValue(`achievements.${index}.fileUrl`, null);
    setValue(`achievements.${index}.file`, null);
    setValue(`achievements.${index}.fileName`, "");
  };

  const handleSaveAchievement = async (index: number) => {
    const values = getValues(`achievements.${index}`);
    if (!values.name) {
      toast.error("Achievement title / name is required");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", values.name);
      const fileObj = achievementFiles[index] || values.file;
      if (fileObj && fileObj instanceof File) {
        formData.append("file", fileObj);
      }

      if (!values.id) {
        // Create new achievement -> POST
        const res = await addAchievement(formData).unwrap();
        const newId = res?.data?.id || res?.id;
        if (newId) {
          setValue(`achievements.${index}.id`, newId);
        }
        toast.success("Achievement added successfully!");
      } else {
        // Update existing achievement -> PATCH
        await updateAchievement({
          id: values.id,
          data: formData,
        }).unwrap();
        toast.success("Achievement updated successfully!");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(formatApiErrorMessage(err));
    }
  };

  const handleDeleteAchievement = async (index: number) => {
    const values = getValues(`achievements.${index}`);
    if (!values.id) {
      removeAchievement(index);
      return;
    }

    try {
      await deleteAchievement(values.id).unwrap();
      removeAchievement(index);
      toast.success("Achievement deleted successfully!");
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
            Achievements
          </CardTitle>
          <p className="text-sm text-zinc-400 mt-1">
            Share your notable achievements and recognitions
          </p>
        </div>
        <Button
          type="button"
          onClick={() => appendAchievement({ id: null, name: "", fileName: "" })}
          className="bg-[rgba(59,130,246,0.2)] hover:bg-blue-200 text-[#0A66C2]"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Achievement
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {achieveFields.map((field, index) => {
          const currentAch = watch(`achievements.${index}`) as any;
          const achId = currentAch?.id;
          const uploadedFile = achievementFiles[index];
          const fileUrl = uploadedFile
            ? null
            : getImageUrl(currentAch?.fileUrl || currentAch?.file);
          const fileName =
            uploadedFile?.name ||
            currentAch?.fileName ||
            currentAch?.name ||
            (fileUrl ? "Uploaded File" : "");

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
                onClick={() => handleDeleteAchievement(index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
              <div className="space-y-6">
                <ProfileInput
                  name={`achievements.${index}.name`}
                  label="Achievement Title / Name"
                  placeholder="e.g. Top Rated Expert 2025, Industry Leadership Award"
                />
                <div>
                  <label className="text-[#94A3B8] text-sm font-medium block mb-2">
                    Media / Proof Document
                  </label>
                  <label className="border border-dashed border-zinc-600 hover:border-blue-500 transition-colors rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer bg-zinc-950">
                    <Upload className="w-8 h-8 text-zinc-400 mb-3" />
                    <p className="text-white text-sm">
                      Upload achievement image or PDF
                    </p>
                    <p className="text-zinc-500 text-xs mt-1">JPG, PNG or PDF</p>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,application/pdf"
                      className="hidden"
                      onChange={(e) => handleAchievementUpload(index, e)}
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
                            View Document
                          </a>
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemoveAchievementFile(index)}
                          className="p-1 text-zinc-400 hover:text-red-400 hover:bg-zinc-700/50 rounded-lg transition-colors"
                          title="Remove file"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex justify-end pt-2">
                  <Button
                    type="button"
                    onClick={() => handleSaveAchievement(index)}
                    className="bg-[#0A66C2] hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg"
                  >
                    {achId ? "Update Achievement" : "Save Achievement"}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
        {achieveFields.length === 0 && (
          <div className="text-center py-16 text-zinc-500">
            No achievements added yet.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
