/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/purity */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Clock, Plus, Trash2 } from "lucide-react";
import { useBookingSocket } from "@/providers/BookingSocketProvider";
import {
  useCreateExpertAvailabilityMutation,
  useGetExpertAvailabiltiyQuery,
} from "@/redux/features/expertDashboard/expertAvailability.api";
import { useExpertProfileQuery } from "@/redux/features/expertDashboard/expertProfile.api";
import { toast } from "sonner";

export type Day =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

interface TimeSlot {
  id: number;
  start_time: string;
  end_time: string;
}

interface DayAvailability {
  enabled: boolean;
  slots: TimeSlot[];
}

type WeeklyAvailabilityState = Record<Day, DayAvailability>;

const DAYS: Day[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const DEFAULT_TIME_SLOT: Omit<TimeSlot, "id"> = {
  start_time: "09:00",
  end_time: "17:00",
};

const INITIAL_AVAILABILITY: WeeklyAvailabilityState = DAYS.reduce(
  (acc, day) => {
    acc[day] = {
      enabled: day !== "Saturday" && day !== "Sunday",
      slots: [{ ...DEFAULT_TIME_SLOT, id: Date.now() + Math.random() }],
    };
    return acc;
  },
  {} as WeeklyAvailabilityState,
);

const TIME_OPTIONS = Array.from({ length: 288 }, (_, i) => {
  const h = Math.floor(i / 12);
  const m = (i % 12) * 5;
  const value = `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
  const hour12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  const ampm = h >= 12 ? "PM" : "AM";
  return { value, label: `${hour12}:${m.toString().padStart(2, "0")} ${ampm}` };
});

const WeeklyAvailability: React.FC = () => {
  const [createAvailability] = useCreateExpertAvailabilityMutation();
  const { data: getAvailability } = useGetExpertAvailabiltiyQuery(undefined);

  const [availability, setAvailability] =
    useState<WeeklyAvailabilityState>(INITIAL_AVAILABILITY);
  const [bufferTime, setBufferTime] = useState(15);

  // Load initial availability data when API response changes
  useEffect(() => {
    const rawData = getAvailability?.data;
    if (rawData && Array.isArray(rawData.availabilities)) {
      if (rawData.buffer_time_minutes !== undefined) {
        setBufferTime(rawData.buffer_time_minutes);
      }

      // Initialize all days as disabled with empty slots
      const mappedAvailability = DAYS.reduce((acc, day) => {
        acc[day] = {
          enabled: false,
          slots: [],
        };
        return acc;
      }, {} as WeeklyAvailabilityState);

      // Populate slots from backend data
      rawData.availabilities.forEach((item: any) => {
        const weekdayIndex = item.weekday;
        const day = DAYS[weekdayIndex];
        if (day) {
          mappedAvailability[day].enabled = true;
          // Extract HH:MM from HH:MM:SS format
          const startTime = item.start_time
            ? item.start_time.substring(0, 5)
            : "09:00";
          const endTime = item.end_time
            ? item.end_time.substring(0, 5)
            : "17:00";

          mappedAvailability[day].slots.push({
            id: item.id || Date.now() + Math.random(),
            start_time: startTime,
            end_time: endTime,
          });
        }
      });

      // Ensure every day (even if disabled or empty) has at least one default slot so toggling works nicely
      DAYS.forEach((day) => {
        if (mappedAvailability[day].slots.length === 0) {
          mappedAvailability[day].slots.push({
            id: Date.now() + Math.random(),
            ...DEFAULT_TIME_SLOT,
          });
        }
      });

      setAvailability(mappedAvailability);
    }
  }, [getAvailability]);
  const toggleDay = (day: Day) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: { ...prev[day], enabled: !prev[day].enabled },
    }));
  };

  const updateSlot = (
    day: Day,
    index: number,
    field: "start_time" | "end_time",
    value: string,
  ) => {
    setAvailability((prev) => {
      const newSlots = [...prev[day].slots];
      newSlots[index] = { ...newSlots[index], [field]: value };
      return { ...prev, [day]: { ...prev[day], slots: newSlots } };
    });
  };

  const addSlot = (day: Day) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: [
          ...prev[day].slots,
          { ...DEFAULT_TIME_SLOT, id: Date.now() + Math.random() },
        ],
      },
    }));
  };

  const removeSlot = (day: Day, index: number) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: prev[day].slots.filter((_, i) => i !== index),
      },
    }));
  };

  const copyToAll = (slots: TimeSlot[], day: Day) => {
    setAvailability((prev) => {
      const updated = { ...prev };
      DAYS.forEach((d) => {
        if (updated[d].enabled && d !== day) {
          updated[d] = {
            ...updated[d],
            slots: slots.map((s) => ({ ...s, id: Date.now() + Math.random() })),
          };
        }
      });
      return updated;
    });
  };
  const { data: expertProfile } = useExpertProfileQuery(undefined);
  const expertId = expertProfile?.data?.user?.id;

  const { isConnected, lastMessage, sendMessage, setExpertId } =
    useBookingSocket();

  useEffect(() => {
    if (expertId) {
      setExpertId(expertId);
    }
    return () => {
      setExpertId(null);
    };
  }, [expertId, setExpertId]);

  console.log(isConnected, lastMessage, sendMessage);

  const handleSaveAvailability = async () => {
    const availabilities: Array<{
      weekday: number;
      start_time: string;
      end_time: string;
    }> = [];

    DAYS.forEach((day, index) => {
      const dayData = availability[day];
      if (dayData.enabled) {
        dayData.slots.forEach((slot) => {
          if (slot.start_time && slot.end_time) {
            availabilities.push({
              weekday: index, // Monday = 0, Tuesday = 1, etc.
              start_time: slot.start_time,
              end_time: slot.end_time,
            });
          }
        });
      }
    });

    const payload = {
      buffer_time_minutes: bufferTime,
      availabilities,
    };

    try {
      console.log("Saving availability with payload:", payload);
      await createAvailability(payload).unwrap();
      toast.success("Availability updated successfully!");
    } catch (error: any) {
      console.error("Failed to save availability:", error);
      toast.error(
        error?.data?.details ||
          "Failed to save availability. Please try again.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1324] text-white p-4 sm:p-6 select-none">
      <div className="max-w-5xl mx-auto">
        {/* Top Navigation + Buffer Time */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8">
          <div className="bg-[#1E2A44] rounded-2xl px-4 py-3 flex flex-wrap items-center gap-3 w-full lg:w-auto justify-between sm:justify-start">
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-[#25344A] rounded-xl transition-colors">
                <ChevronLeft size={22} className="text-gray-400" />
              </button>
              <button className="bg-[#25344A] hover:bg-zinc-700 px-5 py-2.5 rounded-2xl text-sm font-medium whitespace-nowrap transition-colors">
                Today
              </button>
            </div>

            <div className="flex items-center gap-2 bg-[#1E2A44] px-4 py-2.5 rounded-2xl text-sm">
              <button className="text-gray-400 hover:text-white transition-colors">
                <ChevronLeft size={18} />
              </button>
              <span className="font-medium whitespace-nowrap">
                Jul 13 - 18, 2026
              </span>
              <button className="text-gray-400 hover:text-white transition-colors">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Buffer Time */}
          <div className="bg-[#1E2A44] rounded-2xl px-5 py-3 flex items-center justify-between gap-4 w-full lg:w-auto">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400">
                <Clock size={18} />
              </div>
              <div>
                <div className="font-medium text-sm">Buffer Time</div>
                <div className="text-xs text-white/50">
                  Minutes between appointments
                </div>
              </div>
            </div>
            <div className="flex items-center bg-[#0A1324] rounded-xl px-4 py-2">
              <input
                type="number"
                value={bufferTime}
                onChange={(e) => setBufferTime(Number(e.target.value))}
                className="bg-transparent w-14 text-center text-lg font-semibold focus:outline-none"
              />
              <span className="text-gray-400 text-sm ml-1">min</span>
            </div>
          </div>
        </div>

        {/* Days List */}
        <div className="space-y-4">
          {DAYS.map((day) => {
            const dayData = availability[day];
            return (
              <div
                key={day}
                className="bg-[#1E2A44] rounded-3xl p-5 sm:p-6 transition-all hover:bg-[#25344A]"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                  {/* Day Toggle Column */}
                  <div className="flex items-center gap-4 sm:w-52 shrink-0 justify-between sm:justify-start w-full sm:w-auto border-b border-gray-700 sm:border-0 pb-3 sm:pb-0">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => toggleDay(day)}
                        className={`relative inline-flex h-9 w-16 items-center rounded-full transition-all ${
                          dayData.enabled ? "bg-blue-600" : "bg-gray-600"
                        }`}
                      >
                        <span
                          className={`inline-block h-7 w-7 transform rounded-full bg-white shadow transition-transform ${
                            dayData.enabled ? "translate-x-8" : "translate-x-1"
                          }`}
                        />
                      </button>
                      <div>
                        <div className="font-semibold text-lg">{day}</div>
                        <div className="text-gray-500 text-sm">16 Jun 2025</div>
                      </div>
                    </div>
                  </div>

                  {/* Time Slots Column */}
                  <div className="flex-1 w-full">
                    {dayData.enabled ? (
                      <div className="space-y-4">
                        {dayData.slots.map((slot, idx) => (
                          <div
                            key={slot.id}
                            className="flex items-center gap-2 w-full"
                          >
                            <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:gap-3 flex-1 w-full">
                              <select
                                value={slot.start_time}
                                onChange={(e) =>
                                  updateSlot(
                                    day,
                                    idx,
                                    "start_time",
                                    e.target.value,
                                  )
                                }
                                className="bg-[#334155] border border-gray-600 rounded-2xl px-4 py-3 text-sm focus:border-blue-500 w-full sm:w-auto min-w-[140px]"
                              >
                                {TIME_OPTIONS.map((opt) => (
                                  <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                  </option>
                                ))}
                              </select>

                              <div className="text-gray-400 text-xl hidden sm:block mx-1">
                                &rarr;
                              </div>

                              <select
                                value={slot.end_time}
                                onChange={(e) =>
                                  updateSlot(
                                    day,
                                    idx,
                                    "end_time",
                                    e.target.value,
                                  )
                                }
                                className="bg-[#334155] border border-gray-600 rounded-2xl px-4 py-3 text-sm focus:border-blue-500 w-full sm:w-auto min-w-[140px]"
                              >
                                {TIME_OPTIONS.map((opt) => (
                                  <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                  </option>
                                ))}
                              </select>
                            </div>

                            {dayData.slots.length > 1 && (
                              <button
                                onClick={() => removeSlot(day, idx)}
                                className="opacity-70 hover:opacity-100 p-2 hover:bg-red-500/10 rounded-xl text-red-400 shrink-0 transition-colors"
                              >
                                <Trash2 size={20} />
                              </button>
                            )}
                          </div>
                        ))}

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-3">
                          <button
                            onClick={() => addSlot(day)}
                            className="flex items-center justify-center sm:justify-start gap-2 px-5 py-3 bg-[#3B82F633] text-blue-400 rounded-2xl text-sm hover:bg-blue-600/20 transition-colors"
                          >
                            <Plus size={18} /> Add time slot
                          </button>
                          <button
                            onClick={() => copyToAll(dayData.slots, day)}
                            className="flex items-center justify-center sm:justify-start gap-2 px-5 py-3 bg-[#3B82F633] text-purple-400 rounded-2xl text-sm hover:bg-purple-600/20 transition-colors"
                          >
                            Copy to all days
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="h-12 flex items-center text-gray-400 italic text-sm">
                        This day is unavailable
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-4 mt-12">
          <button className="w-full sm:w-auto px-10 py-4 text-gray-400 hover:bg-gray-800 rounded-2xl font-medium transition-colors">
            Cancel
          </button>
          <button
            onClick={handleSaveAvailability}
            className="w-full sm:w-auto px-10 py-4 bg-blue-600 hover:bg-blue-700 rounded-2xl font-semibold transition-colors"
          >
            Save Availability
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeeklyAvailability;
