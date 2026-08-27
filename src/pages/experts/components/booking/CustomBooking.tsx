/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo, useEffect } from "react";
import { Clock, Check, ChevronLeft, ChevronRight, Info } from "lucide-react";
import type { Expert } from "../../data/expertsData";
import {
  useBookSessionMutation,
  useGetSingleExpertSlotsQuery,
} from "@/redux/features/expertsRoute/expertRoute.api";
import { useGetServerTimeQuery } from "@/redux/features/userDashboard/userSession.api";
import { toast } from "sonner";

interface CustomBookingProps {
  expert: Expert;
  availabilityData?: any[];
  durationAndCost?: any[];
}

type Step = 1 | 2 | 3 | 4;

export default function CustomBooking({
  expert,
  availabilityData,
  durationAndCost,
}: CustomBookingProps) {
  const [currentStep, setCurrentStep] = useState<Step>(1);

  const { data: serverTimeData } = useGetServerTimeQuery(undefined);

  // Compute current timestamp in ms based on server time or fallback
  const nowMs = useMemo(() => {
    if (serverTimeData?.data?.timestamp) {
      return serverTimeData.data.timestamp * 1000;
    }
    if (serverTimeData?.data?.server_time) {
      return new Date(serverTimeData.data.server_time).getTime();
    }
    return Date.now();
  }, [serverTimeData]);

  const isDateAvailable = (date: Date) => {
    // 0 is Sunday, 1 is Monday, ..., 6 is Saturday in JS
    const jsDay = date.getDay();
    // Monday = 0, Tuesday = 1, ..., Sunday = 6 in backend
    const backendDay = jsDay === 0 ? 6 : jsDay - 1;

    if (!Array.isArray(availabilityData)) return false;
    return availabilityData.some((item: any) => item.weekday === backendDay);
  };

  // Selection States
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<number>(30); // default to 30 mins
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [agreeToTerms, setAgreeToTerms] = useState<boolean>(false);
  const [createBooking, { isLoading: isBooking }] = useBookSessionMutation();
  const durations = useMemo(() => {
    if (Array.isArray(durationAndCost) && durationAndCost.length > 0) {
      return durationAndCost.filter((item: any) => item.is_active);
    }
    // Fallback if not loaded
    return [
      { duration_minutes: 15, cost: Math.round(expert.pricePerHour * 0.25) },
      { duration_minutes: 30, cost: Math.round(expert.pricePerHour * 0.5) },
      { duration_minutes: 60, cost: Math.round(expert.pricePerHour * 1.0) },
    ];
  }, [durationAndCost, expert.pricePerHour]);

  useEffect(() => {
    if (Array.isArray(durationAndCost) && durationAndCost.length > 0) {
      const activeDurations = durationAndCost.filter(
        (item: any) => item.is_active,
      );
      if (activeDurations.length > 0) {
        const has30 = activeDurations.some(
          (item: any) => item.duration_minutes === 30,
        );
        if (!has30) {
          setSelectedDuration(activeDurations[0].duration_minutes);
        }
      }
    }
  }, [durationAndCost]);

  // Navigation states for calendar
  const [calendarDate, setCalendarDate] = useState<Date>(() => {
    const today = new Date();
    // Default calendar view to current month/year
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });

  // Calculate session cost and totals
  const sessionCost = useMemo(() => {
    if (Array.isArray(durationAndCost) && durationAndCost.length > 0) {
      const match = durationAndCost.find(
        (item: any) => item.duration_minutes === selectedDuration,
      );
      if (match) {
        if (match.cost && typeof match.cost === "object") {
          return Number(
            match.cost.session_fee !== undefined ? match.cost.session_fee : 0,
          );
        }
        if (match.session_fee !== undefined) {
          return Number(match.session_fee);
        }
        if (match.cost !== undefined) {
          return Number(match.cost);
        }
      }
    }
    // Proportional pricing fallback based on expert's price per hour
    const factor = selectedDuration / 60;
    return Math.round(expert.pricePerHour * factor * 100) / 100;
  }, [selectedDuration, durationAndCost, expert.pricePerHour]);

  const platformFee = useMemo(() => {
    if (Array.isArray(durationAndCost) && durationAndCost.length > 0) {
      const match = durationAndCost.find(
        (item: any) => item.duration_minutes === selectedDuration,
      );
      if (match) {
        if (
          match.cost &&
          typeof match.cost === "object" &&
          match.cost.platform_fee !== undefined
        ) {
          return Number(match.cost.platform_fee);
        }
        if (match.platform_fee !== undefined) {
          return Number(match.platform_fee);
        }
      }
    }
    return 5.0;
  }, [selectedDuration, durationAndCost]);

  const totalCost = useMemo(() => {
    if (Array.isArray(durationAndCost) && durationAndCost.length > 0) {
      const match = durationAndCost.find(
        (item: any) => item.duration_minutes === selectedDuration,
      );
      if (match) {
        if (
          match.cost &&
          typeof match.cost === "object" &&
          match.cost.total_amount !== undefined
        ) {
          return Number(match.cost.total_amount);
        }
        if (match.total_amount !== undefined) {
          return Number(match.total_amount);
        }
      }
    }
    return Math.round((sessionCost + platformFee) * 100) / 100;
  }, [sessionCost, platformFee, selectedDuration, durationAndCost]);

  // Calendar logic
  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  // Helper to get array of dates in the visible calendar month
  const calendarCells = useMemo(() => {
    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const cells = [];

    // Fill empty cells for previous month padding
    for (let i = 0; i < firstDayIndex; i++) {
      cells.push(null);
    }

    // Fill days of current month
    for (let day = 1; day <= totalDays; day++) {
      cells.push(new Date(year, month, day));
    }

    return cells;
  }, [year, month]);

  const handlePrevMonth = () => {
    setCalendarDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCalendarDate(new Date(year, month + 1, 1));
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (date: Date) => {
    if (!selectedDate) return false;
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const isPastDate = (date: Date) => {
    const today = new Date(nowMs);
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    return checkDate < today;
  };

  // Helper to format 24h time to 12h AM/PM
  const formatTimeTo12Hour = (timeStr: string) => {
    if (!timeStr) return "";
    const parts = timeStr.split(":");
    if (parts.length < 2) return timeStr;
    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    const ampm = hours >= 12 ? "PM" : "AM";
    const hour12 = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
    return `${hour12}:${String(minutes).padStart(2, "0")} ${ampm}`;
  };

  // Helper to format Date to YYYY-MM-DD for backend
  const formatDateToYYYYMMDD = (date: Date | null) => {
    if (!date) return "";
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const dateStr = useMemo(
    () => formatDateToYYYYMMDD(selectedDate),
    [selectedDate],
  );

  const { data: slotsResponse, isLoading: isLoadingSlots } =
    useGetSingleExpertSlotsQuery(
      {
        id: expert.id,
        date: dateStr,
        duration_minutes: selectedDuration,
      },
      {
        skip: !expert.id || !dateStr || !selectedDuration,
        refetchOnMountOrArgChange: true,
      },
    );

  // Helper to convert UTC date string (YYYY-MM-DD) and UTC time string (HH:MM) to local Date object
  const parseUtcTimeToLocalDate = (dStr: string, tStr: string) => {
    if (!dStr || !tStr) return null;
    const parts = tStr.trim().split(":");
    if (parts.length < 2) return null;
    const [hours, minutes] = parts.map(Number);

    const dateParts = dStr.trim().split("-").map(Number);
    if (dateParts.length < 3) return null;
    const [year, month, day] = dateParts;

    const utcMs = Date.UTC(year, month - 1, day, hours, minutes, 0);
    return new Date(utcMs);
  };

  const timeSlots = useMemo(() => {
    const rawSlots = slotsResponse?.data?.slots;
    if (!Array.isArray(rawSlots) || !dateStr) return [];

    return rawSlots
      .map((item: any) => {
        const utcTimeStr = typeof item === "string" ? item : item?.time || "";
        if (!utcTimeStr) return null;

        const isLocked =
          typeof item === "object" && item !== null
            ? !!item.is_locked
            : false;

        // Convert UTC slot time to local Date object
        const localSlotDate = parseUtcTimeToLocalDate(dateStr, utcTimeStr);
        if (!localSlotDate) return null;

        const slotMs = localSlotDate.getTime();
        const isPast = slotMs <= nowMs;

        const localHours = localSlotDate.getHours();
        const localMinutes = localSlotDate.getMinutes();
        const localTimeStr = `${String(localHours).padStart(2, "0")}:${String(
          localMinutes
        ).padStart(2, "0")}`;

        return {
          raw: utcTimeStr, // UTC time string for backend API / Socket payload
          localTimeStr,
          formatted: formatTimeTo12Hour(localTimeStr), // Local 12h display string
          isLocked: isLocked || isPast,
          isPast,
        };
      })
      .filter((slot): slot is NonNullable<typeof slot> => slot !== null && !slot.isPast);
  }, [slotsResponse, dateStr, nowMs]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleNextStep = () => {
    setCurrentStep((prev) => (prev + 1) as Step);
  };

  // Helper to format date nicely
  const formatDateString = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStepStatus = (stepNumber: number) => {
    if (currentStep > stepNumber) return "completed";
    if (currentStep === stepNumber) return "active";
    return "upcoming";
  };

  const handleBookNow = async () => {
    if (!agreeToTerms || !selectedDate || !selectedTime) return;
    console.log(selectedTime, "selected time (UTC)");
    try {
      const formattedUtcStartTime = selectedTime.includes(":")
        ? selectedTime.split(":").length === 2
          ? `${selectedTime}:00`
          : selectedTime
        : selectedTime;

      const payload = {
        expert: expert.id,
        date: dateStr,
        start_time: formattedUtcStartTime,
        duration_minutes: selectedDuration,
        agree_terms: agreeToTerms,
      };
      console.log("Submitting booking payload:", payload);

      const res = await createBooking(payload).unwrap();

      const responseData = res?.data || res;
      const checkoutUrl = responseData?.checkout_url;
      if (checkoutUrl) {
        window.open(checkoutUrl, "_blank", "noopener,noreferrer");
      }
      // handleReset();
    } catch (err: any) {
      console.error("Booking error:", err);
      let errorMessage = "An error occurred while booking. Please try again.";
      if (err?.data?.details) {
        if (typeof err.data.details === "object") {
          errorMessage = Object.entries(err.data.details)
            .map(([field, msg]) => `${field}: ${msg}`)
            .join("\n");
        } else {
          errorMessage = String(err.data.details);
        }
      } else if (err?.data?.detail) {
        errorMessage = err.data.detail;
      } else if (err?.data?.message) {
        errorMessage = err.data.message;
      } else if (err?.message) {
        errorMessage = err.message;
      }
      toast.error(errorMessage);
    }
  };

  // Memoized helper to format selected UTC time slot to local display time on Step 4 review
  const displaySelectedTime = useMemo(() => {
    if (!selectedTime) return "";
    const match = timeSlots.find((s) => s.raw === selectedTime);
    if (match) return match.formatted;

    if (dateStr) {
      const localDate = parseUtcTimeToLocalDate(dateStr, selectedTime);
      if (localDate) {
        const h = localDate.getHours();
        const m = localDate.getMinutes();
        const localTimeStr = `${String(h).padStart(2, "0")}:${String(m).padStart(
          2,
          "0"
        )}`;
        return formatTimeTo12Hour(localTimeStr);
      }
    }
    return formatTimeTo12Hour(selectedTime);
  }, [selectedTime, timeSlots, dateStr]);

  return (
    <div className="w-full bg-[#0B1220]/60 border border-[#1E293B]/60 rounded-3xl p-6 md:p-8 backdrop-blur-md relative overflow-hidden shadow-2xl">
      {/* Visual background gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-32 bg-blue-600/10 rounded-full filter blur-3xl pointer-events-none" />

      {/* Stepper Header (Only show for steps 1-4) */}
      {currentStep <= 4 && (
        <div className="mb-8 relative z-10">
          <div className="flex items-center justify-between relative">
            {/* Stepper connecting progress bar */}
            <div className="absolute top-4 left-4 right-4 h-[2px] bg-slate-800 -z-10">
              <div
                className="h-full bg-[#007AFF] transition-all duration-300"
                style={{
                  width: `${currentStep === 1
                    ? "0%"
                    : currentStep === 2
                      ? "33%"
                      : currentStep === 3
                        ? "66%"
                        : "100%"
                    }`,
                }}
              />
            </div>

            {/* Step 1: Session */}
            <div className="flex flex-col items-center gap-1.5 flex-1">
              <button
                onClick={() => selectedDate && setCurrentStep(1)}
                disabled={currentStep === 1}
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${getStepStatus(1) === "completed"
                  ? "bg-[#007AFF] text-white hover:bg-[#0066FF] cursor-pointer"
                  : getStepStatus(1) === "active"
                    ? "bg-[#007AFF] text-white ring-4 ring-blue-500/20"
                    : "bg-slate-900 border-2 border-slate-800 text-slate-500"
                  }`}
              >
                {getStepStatus(1) === "completed" ? (
                  <Check className="w-4 h-4 text-white" />
                ) : (
                  "1"
                )}
              </button>
              <span
                className={`text-[10px] md:text-xs font-bold tracking-wider uppercase ${currentStep === 1 ? "text-[#3B82F6]" : "text-slate-500"}`}
              >
                Session
              </span>
            </div>

            {/* Step 2: Duration */}
            <div className="flex flex-col items-center gap-1.5 flex-1">
              <button
                onClick={() => selectedDate && setCurrentStep(2)}
                disabled={!selectedDate || currentStep === 2}
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${getStepStatus(2) === "completed"
                  ? "bg-[#007AFF] text-white hover:bg-[#0066FF] cursor-pointer"
                  : getStepStatus(2) === "active"
                    ? "bg-[#007AFF] text-white ring-4 ring-blue-500/20"
                    : "bg-slate-900 border-2 border-slate-800 text-slate-500"
                  }`}
              >
                {getStepStatus(2) === "completed" ? (
                  <Check className="w-4 h-4 text-white" />
                ) : (
                  "2"
                )}
              </button>
              <span
                className={`text-[10px] md:text-xs font-bold tracking-wider uppercase ${currentStep === 2 ? "text-[#3B82F6]" : "text-slate-500"}`}
              >
                Duration
              </span>
            </div>

            {/* Step 3: Time */}
            <div className="flex flex-col items-center gap-1.5 flex-1">
              <button
                onClick={() => selectedDate && setCurrentStep(3)}
                disabled={!selectedDate || currentStep === 3}
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${getStepStatus(3) === "completed"
                  ? "bg-[#007AFF] text-white hover:bg-[#0066FF] cursor-pointer"
                  : getStepStatus(3) === "active"
                    ? "bg-[#007AFF] text-white ring-4 ring-blue-500/20"
                    : "bg-slate-900 border-2 border-slate-800 text-slate-500"
                  }`}
              >
                {getStepStatus(3) === "completed" ? (
                  <Check className="w-4 h-4 text-white" />
                ) : (
                  "3"
                )}
              </button>
              <span
                className={`text-[10px] md:text-xs font-bold tracking-wider uppercase ${currentStep === 3 ? "text-[#3B82F6]" : "text-slate-500"}`}
              >
                Time
              </span>
            </div>

            {/* Step 4: Confirm */}
            <div className="flex flex-col items-center gap-1.5 flex-1">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${getStepStatus(4) === "active"
                  ? "bg-[#007AFF] text-white ring-4 ring-blue-500/20"
                  : "bg-slate-900 border-2 border-slate-800 text-slate-500"
                  }`}
              >
                4
              </div>
              <span
                className={`text-[10px] md:text-xs font-bold tracking-wider uppercase ${currentStep === 4 ? "text-[#3B82F6]" : "text-slate-500"}`}
              >
                Confirm
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Wizard Content Layout */}
      <div className="relative z-10 min-h-[380px] flex flex-col justify-between">
        {/* STEP 1: DATE SELECT (CALENDAR) */}
        {currentStep === 1 && (
          <div className="space-y-5 animate-fadeIn">
            <div className="flex items-center justify-between">
              <h3 className="text-sm md:text-base font-bold text-slate-300">
                {selectedDate
                  ? `Availability - ${formatDateString(selectedDate)}`
                  : "Select Session Date"}
              </h3>
              <div className="flex items-center gap-1">
                <button
                  onClick={handlePrevMonth}
                  className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs md:text-sm font-bold text-white px-2">
                  {monthNames[month]} {year}
                </span>
                <button
                  onClick={handleNextMonth}
                  className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4">
              <div className="grid grid-cols-7 gap-1 text-center mb-2">
                {daysOfWeek.map((day) => (
                  <div
                    key={day}
                    className="text-slate-500 text-[10px] md:text-xs font-extrabold uppercase"
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {calendarCells.map((cell, idx) => {
                  if (cell === null) {
                    return <div key={`empty-${idx}`} />;
                  }

                  const past = isPastDate(cell);
                  const isAvailable = isDateAvailable(cell);
                  const disabled = past || !isAvailable;
                  const active = isSelected(cell);
                  const currentDay = isToday(cell);

                  return (
                    <button
                      key={cell.toISOString()}
                      disabled={disabled}
                      onClick={() => handleDateSelect(cell)}
                      className={`aspect-square w-full rounded-xl text-xs font-semibold transition-all flex items-center justify-center ${active
                        ? "bg-[#007AFF] text-white shadow-lg shadow-blue-500/20 scale-105"
                        : currentDay
                          ? "border-2 border-[#007AFF] text-white bg-blue-950/20"
                          : disabled
                            ? "text-slate-700 cursor-not-allowed opacity-30"
                            : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                        }`}
                    >
                      {cell.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-2 items-center bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-3 text-slate-400">
              <Info className="w-4 h-4 text-[#3B82F6] flex-shrink-0" />
              <p className="text-[11px] font-medium leading-normal">
                Click a highlighted date on the calendar to reserve your
                preferred day.
              </p>
            </div>
          </div>
        )}

        {/* STEP 2: DURATION */}
        {currentStep === 2 && (
          <div className="space-y-5 animate-fadeIn">
            <h3 className="text-sm md:text-base font-bold text-slate-300">
              2. Select Session Duration
            </h3>

            <div className="space-y-3">
              {durations.map((item) => {
                const dur = item.duration_minutes;
                const isSel = selectedDuration === dur;

                const getDisplayCost = (itemObj: any) => {
                  if (!itemObj) return "0.00";
                  if (itemObj.cost && typeof itemObj.cost === "object") {
                    const c = itemObj.cost;
                    if (c.session_fee !== undefined) return String(c.session_fee);
                    if (c.total_amount !== undefined) return String(c.total_amount);
                  }
                  if (itemObj.session_fee !== undefined) {
                    return String(itemObj.session_fee);
                  }
                  if (itemObj.total_amount !== undefined) {
                    return String(itemObj.total_amount);
                  }
                  if (itemObj.cost !== undefined) {
                    return String(itemObj.cost);
                  }
                  return "0.00";
                };

                const displayCost = getDisplayCost(item);

                return (
                  <button
                    key={dur}
                    onClick={() => setSelectedDuration(dur)}
                    className={`w-full flex items-center justify-between bg-slate-950/40 border p-4 rounded-2xl text-left transition-all ${isSel
                      ? "border-[#007AFF] bg-[#007AFF]/5 text-white ring-1 ring-[#007AFF]"
                      : "border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-xl ${isSel ? "bg-[#007AFF]/20 text-[#3B82F6]" : "bg-slate-900 text-slate-500"}`}
                      >
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm md:text-base">
                          {dur} Minutes
                        </h4>
                        <p className="text-xs text-slate-400">
                          Individual consulting session
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-extrabold text-sm md:text-base">
                        ${displayCost}
                      </span>
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSel
                          ? "bg-[#007AFF] border-[#007AFF]"
                          : "border-slate-700"
                          }`}
                      >
                        {isSel && (
                          <Check className="w-3 h-3 text-white fill-white" />
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: SELECT TIME */}
        {currentStep === 3 && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-sm md:text-base font-bold text-slate-300">
              3. Select Booking Time
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Availability for {formatDateString(selectedDate)}:
            </p>

            <div className="grid grid-cols-2 gap-2 max-h-[260px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-800">
              {isLoadingSlots ? (
                <div className="col-span-2 py-8 text-center text-xs text-slate-400">
                  Loading available slots...
                </div>
              ) : timeSlots.length > 0 ? (
                timeSlots.map((slot) => {
                  const isSel = selectedTime === slot.raw;
                  return (
                    <button
                      key={slot.raw}
                      disabled={slot.isLocked}
                      onClick={() => setSelectedTime(slot.raw)}
                      className={`py-3 px-4 rounded-xl text-xs font-bold text-center border transition-all ${slot.isLocked
                        ? "bg-amber-500/10 border-amber-500/30 text-amber-500/50 cursor-not-allowed"
                        : isSel
                          ? "bg-[#007AFF] border-[#007AFF] text-white shadow-lg shadow-blue-500/15"
                          : "bg-slate-950/40 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white"
                        }`}
                    >
                      <span>{slot.formatted}</span>
                      {slot.isLocked && (
                        <span className="block text-[9px] text-amber-500/70 font-semibold uppercase mt-0.5">
                          Pending
                        </span>
                      )}
                    </button>
                  );
                })
              ) : (
                <div className="col-span-2 py-8 text-center text-xs text-slate-400">
                  No slots available for the selected day.
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 4: CONFIRM */}
        {currentStep === 4 && (
          <div className="space-y-5 animate-fadeIn">
            <h3 className="text-sm md:text-base font-bold text-slate-300">
              4. Review & Confirm Booking
            </h3>

            {/* Small summary details card */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 space-y-3.5">
              <div className="flex gap-3 items-center">
                <img
                  src={expert.avatar}
                  alt={expert.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-700"
                />
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {expert.name}
                  </h4>
                  <p className="text-xs text-slate-400">{expert.title}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 border-t border-slate-800/80 pt-3.5 text-xs">
                <div>
                  <span className="text-slate-500 block font-medium mb-0.5">
                    Date
                  </span>
                  <span className="text-white font-bold">
                    {formatDateString(selectedDate)}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block font-medium mb-0.5">
                    Time & Duration
                  </span>
                  <span className="text-white font-bold">
                    {displaySelectedTime} ({selectedDuration} Min)
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pricing Summary (only for Steps 1-4) */}
        {currentStep <= 4 && (
          <div className="mt-8 border-t border-slate-800/80 pt-5 space-y-4">
            {/* Price lines */}
            <div className="space-y-2.5 text-xs font-semibold">
              <div className="flex justify-between text-slate-400">
                <span>
                  {expert.name.split(" ")[0]} Fee ({selectedDuration}m)
                </span>
                <span>${sessionCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Platform Fee</span>
                <span>${platformFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-white text-sm font-extrabold border-t border-slate-900 pt-2.5">
                <span>Total Amount</span>
                <span>${totalCost.toFixed(2)}</span>
              </div>
            </div>

            {/* Terms check box (only for Step 4) */}
            {currentStep === 4 && (
              <div className="flex gap-2.5 items-start text-[11px] text-slate-400 leading-normal">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-800 bg-slate-950 text-[#007AFF] focus:ring-[#007AFF] mt-0.5 cursor-pointer"
                />
                <label htmlFor="terms" className="cursor-pointer">
                  I agree to the{" "}
                  <a
                    href="#"
                    className="text-[#3B82F6] hover:underline font-bold"
                  >
                    Terms of Service
                  </a>{" "}
                  &{" "}
                  <a
                    href="#"
                    className="text-[#3B82F6] hover:underline font-bold"
                  >
                    Privacy Policy
                  </a>
                  . Understand that slots cannot be refunded within 24 hours of
                  starting.
                </label>
              </div>
            )}

            {/* Control buttons */}
            <div className="flex gap-3 pt-2">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep((prev) => (prev - 1) as Step)}
                  className="px-4 py-3 bg-transparent border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-bold transition-all active:scale-[0.98]"
                >
                  Back
                </button>
              )}

              {currentStep < 4 ? (
                <button
                  type="button"
                  disabled={
                    (currentStep === 1 && !selectedDate) ||
                    (currentStep === 2 && !selectedDuration) ||
                    (currentStep === 3 && !selectedTime)
                  }
                  onClick={handleNextStep}
                  className="flex-1 py-3 bg-[#007AFF] hover:bg-[#0066FF] disabled:bg-slate-900 disabled:text-slate-600 disabled:cursor-not-allowed text-white rounded-xl text-xs font-extrabold transition-all active:scale-[0.98] shadow-md shadow-blue-500/10 flex items-center justify-center gap-1.5"
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="button"
                  disabled={!agreeToTerms || isBooking}
                  onClick={handleBookNow}
                  className="flex-1 py-3 bg-[#007AFF] hover:bg-[#0066FF] disabled:bg-slate-900 disabled:text-slate-600 disabled:cursor-not-allowed text-white rounded-xl text-xs font-extrabold transition-all active:scale-[0.98] shadow-md shadow-blue-500/10 flex items-center justify-center gap-2"
                >
                  {isBooking ? "Booking..." : "Book Now"}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
