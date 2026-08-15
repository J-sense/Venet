/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Plus, Trash2, Upload, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProfileInput } from "@/components/ui/profileInput";
import { toast } from "sonner";
import {
  useAddCertificationMutation,
  useUpdateCertificationMutation,
  useDeleteCertificationMutation,
} from "@/redux/features/expertDashboard/expertProfile.api";
import { formatApiErrorMessage, getImageUrl } from "../../utils/profileUtils";

export default function CertificationsSection() {
  const { control, getValues, setValue, watch } = useFormContext();
  const {
    fields: certFields,
    append: appendCert,
    remove: removeCert,
  } = useFieldArray({ control, name: "certifications" });

  const [addCertification] = useAddCertificationMutation();
  const [updateCertification] = useUpdateCertificationMutation();
  const [deleteCertification] = useDeleteCertificationMutation();

  const [certFiles, setCertFiles] = React.useState<Record<number, File>>({});

  const handleCertUpload = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setCertFiles((prev) => ({ ...prev, [index]: file }));
      setValue(`certifications.${index}.fileName`, file.name);
      setValue(`certifications.${index}.file`, file);
    }
  };

  const handleRemoveCertFile = (index: number) => {
    setCertFiles((prev) => {
      const next = { ...prev };
      delete next[index];
      return next;
    });
    setValue(`certifications.${index}.fileUrl`, null);
    setValue(`certifications.${index}.file`, null);
    setValue(`certifications.${index}.fileName`, "");
  };

  const handleSaveCert = async (index: number) => {
    const values = getValues(`certifications.${index}`);
    if (!values.name) {
      toast.error("Certificate name is required");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", values.name);
      const fileObj = certFiles[index] || values.file;
      if (fileObj && fileObj instanceof File) {
        formData.append("file", fileObj);
      }

      if (!values.id) {
        // Create new certification -> POST
        const res = await addCertification(formData).unwrap();
        const newId = res?.data?.id || res?.id;
        if (newId) {
          setValue(`certifications.${index}.id`, newId);
        }
        toast.success("Certificate added successfully!");
      } else {
        // Update existing certification -> PATCH
        await updateCertification({
          id: values.id,
          data: formData,
        }).unwrap();
        toast.success("Certificate updated successfully!");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(formatApiErrorMessage(err));
    }
  };

  const handleDeleteCert = async (index: number) => {
    const values = getValues(`certifications.${index}`);
    if (!values.id) {
      removeCert(index);
      return;
    }

    try {
      await deleteCertification(values.id).unwrap();
      removeCert(index);
      toast.success("Certificate deleted successfully!");
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
            Certifications
          </CardTitle>
          <p className="text-sm text-zinc-400 mt-1">
            Upload your certificates (JPG, PNG, PDF)
          </p>
        </div>
        <Button
          type="button"
          onClick={() => appendCert({ id: null, name: "", fileName: "" })}
          className="bg-[rgba(59,130,246,0.2)] hover:bg-blue-200 text-[#0A66C2]"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Certificate
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {certFields.map((field, index) => {
          const currentCert = watch(`certifications.${index}`) as any;
          const certId = currentCert?.id;
          const uploadedFile = certFiles[index];
          const fileUrl = uploadedFile
            ? null
            : getImageUrl(currentCert?.fileUrl || currentCert?.file);
          const fileName =
            uploadedFile?.name ||
            currentCert?.fileName ||
            currentCert?.name ||
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
                onClick={() => handleDeleteCert(index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
              <div className="space-y-6">
                <ProfileInput
                  name={`certifications.${index}.name`}
                  label="Certificate Name"
                  placeholder="e.g. Certified Personal Trainer, Advanced Psychology Coach"
                />
                <div>
                  <label className="text-[#94A3B8] text-sm font-medium block mb-2">
                    Certificate Document
                  </label>
                  <label className="border border-dashed border-zinc-600 hover:border-blue-500 transition-colors rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer bg-zinc-950">
                    <Upload className="w-8 h-8 text-zinc-400 mb-3" />
                    <p className="text-white text-sm">
                      Upload certificate image or PDF
                    </p>
                    <p className="text-zinc-500 text-xs mt-1">JPG, PNG or PDF • Max 10MB</p>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,application/pdf"
                      className="hidden"
                      onChange={(e) => handleCertUpload(index, e)}
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
                          onClick={() => handleRemoveCertFile(index)}
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
                    onClick={() => handleSaveCert(index)}
                    className="bg-[#0A66C2] hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg"
                  >
                    {certId ? "Update Certificate" : "Save Certificate"}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
        {certFields.length === 0 && (
          <div className="text-center py-16 text-zinc-500">
            No certificates added yet.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
