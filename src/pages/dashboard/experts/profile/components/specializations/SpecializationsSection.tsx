/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfileInput } from "@/components/ui/profileInput";
import {
  useAddSpecializationsMutation,
  useDeleteSpecializationMutation,
  useUpdateSpecializationsMutation,
} from "@/redux/features/expertDashboard/expertProfile.api";
import { Plus, Trash2 } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { formatApiErrorMessage } from "../../utils/profileUtils";

export default function SpecializationsSection() {
  const { control, getValues, setValue, watch } = useFormContext();
  const {
    fields: specFields,
    append: appendSpec,
    remove: removeSpec,
  } = useFieldArray({ control, name: "specializations" });

  const [addSpecialization] = useAddSpecializationsMutation();
  const [updateSpecialization] = useUpdateSpecializationsMutation();
  const [deleteSpecialization] = useDeleteSpecializationMutation();

  const handleSaveSpec = async (index: number) => {
    const values = getValues(`specializations.${index}`);
    if (!values.title) {
      toast.error("Specialization title is required");
      return;
    }

    try {
      if (!values.id) {
        // Create new specialization -> POST
        const res = await addSpecialization({
          title: values.title,
          description: values.description || "",
          order: index,
        }).unwrap();

        const newId = res?.data?.id || res?.id;
        if (newId) {
          setValue(`specializations.${index}.id`, newId);
        }
        toast.success("Specialization added successfully!");
      } else {
        // Update existing specialization -> PATCH
        await updateSpecialization({
          id: values.id,
          title: values.title,
          description: values.description || "",
          order: index,
        }).unwrap();
        toast.success("Specialization updated successfully!");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(formatApiErrorMessage(err));
    }
  };

  const handleDeleteSpec = async (index: number) => {
    const values = getValues(`specializations.${index}`);
    if (!values.id) {
      removeSpec(index);
      return;
    }

    try {
      await deleteSpecialization(values.id).unwrap();
      removeSpec(index);
      toast.success("Specialization deleted successfully!");
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
            Specializations
          </CardTitle>
          <p className="text-sm text-zinc-400 mt-1">
            Manage your areas of expertise
          </p>
        </div>
        <Button
          type="button"
          onClick={() => appendSpec({ id: null, title: "", description: "" })}
          className="bg-[rgba(59,130,246,0.2)] hover:bg-blue-200 text-[#0A66C2]"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Specialization
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {specFields.map((field, index) => {
          const specId = watch(`specializations.${index}.id`);
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
                onClick={() => handleDeleteSpec(index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
              <div className="space-y-4">
                <ProfileInput
                  name={`specializations.${index}.title`}
                  label="Title"
                  placeholder="e.g. Leadership Development, Executive Coaching"
                />
                <ProfileInput
                  name={`specializations.${index}.description`}
                  label="Description"
                  as="textarea"
                  rows={3}
                  placeholder="Describe this specialization, your approach, and the value you provide..."
                />
                <div className="flex justify-end pt-2">
                  <Button
                    type="button"
                    onClick={() => handleSaveSpec(index)}
                    className="bg-[#0A66C2] hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg"
                  >
                    {specId ? "Update Specialization" : "Save Specialization"}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
