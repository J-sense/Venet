import { useState, useMemo } from "react";
import { 
  Clock, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  Info
} from "lucide-react";
import type { Expert } from "../types";
import { Link } from "react-router";

interface CustomBookingProps {
  expert: Expert;
}

type Step = 1 | 2 | 3 | 4 | 5; // 1: Date, 2: Duration, 3: Time, 4: Confirm, 5: Success

export default function CustomBooking({ expert }: CustomBookingProps) {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  
  // Selection States
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<15 | 30 | 60>(30); // default to 30 mins
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [agreeToTerms, setAgreeToTerms] = useState<boolean>(false);
  
  // Navigation states for calendar
  const [calendarDate, setCalendarDate] = useState<Date>(() => {
    const today = new Date();
    // Default calendar view to current month/year
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });

  // Calculate session cost and totals
  const sessionCost = useMemo(() => {
    // Proportional pricing based on expert's price per hour
    const factor = selectedDuration / 60;
    return Math.round(expert.pricePerHour * factor * 100) / 100;
  }, [selectedDuration, expert.pricePerHour]);

  const platformFee = 5.00;
  const totalCost = useMemo(() => {
    return Math.round((sessionCost + platformFee) * 100) / 100;
  }, [sessionCost]);

  // Calendar logic
  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
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
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  const isSelected = (date: Date) => {
    if (!selectedDate) return false;
    return date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear();
  };

  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  // Predefined time slots
  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "1:30 PM", "2:00 PM", "2:30 PM", "2:45 PM", "3:00 PM", "3:15 PM", 
    "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM"
  ];

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  // Helper to format date nicely
  const formatDateString = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });
  };

  const getStepStatus = (stepNumber: number) => {
    if (currentStep > stepNumber) return "completed";
    if (currentStep === stepNumber) return "active";
    return "upcoming";
  };

  const handleBookNow = () => {
    if (agreeToTerms) {
      setCurrentStep(5); // Success step
    }
  };

  const handleReset = () => {
    setSelectedDate(null);
    setSelectedTime(null);
    setAgreeToTerms(false);
    setCurrentStep(1);
  };

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
                  width: `${
                    currentStep === 1 ? "0%" : 
                    currentStep === 2 ? "33%" : 
                    currentStep === 3 ? "66%" : "100%"
                  }` 
                }}
              />
            </div>

            {/* Step 1: Session */}
            <div className="flex flex-col items-center gap-1.5 flex-1">
              <button 
                onClick={() => selectedDate && setCurrentStep(1)}
                disabled={currentStep === 1}
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  getStepStatus(1) === "completed" 
                    ? "bg-[#007AFF] text-white hover:bg-[#0066FF] cursor-pointer" 
                    : getStepStatus(1) === "active"
                    ? "bg-[#007AFF] text-white ring-4 ring-blue-500/20"
                    : "bg-slate-900 border-2 border-slate-800 text-slate-500"
                }`}
              >
                {getStepStatus(1) === "completed" ? <Check className="w-4 h-4 text-white" /> : "1"}
              </button>
              <span className={`text-[10px] md:text-xs font-bold tracking-wider uppercase ${currentStep === 1 ? "text-[#3B82F6]" : "text-slate-500"}`}>
                Session
              </span>
            </div>

            {/* Step 2: Duration */}
            <div className="flex flex-col items-center gap-1.5 flex-1">
              <button 
                onClick={() => selectedDate && setCurrentStep(2)}
                disabled={!selectedDate || currentStep === 2}
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  getStepStatus(2) === "completed" 
                    ? "bg-[#007AFF] text-white hover:bg-[#0066FF] cursor-pointer" 
                    : getStepStatus(2) === "active"
                    ? "bg-[#007AFF] text-white ring-4 ring-blue-500/20"
                    : "bg-slate-900 border-2 border-slate-800 text-slate-500"
                }`}
              >
                {getStepStatus(2) === "completed" ? <Check className="w-4 h-4 text-white" /> : "2"}
              </button>
              <span className={`text-[10px] md:text-xs font-bold tracking-wider uppercase ${currentStep === 2 ? "text-[#3B82F6]" : "text-slate-500"}`}>
                Duration
              </span>
            </div>

            {/* Step 3: Time */}
            <div className="flex flex-col items-center gap-1.5 flex-1">
              <button 
                onClick={() => selectedDate && setCurrentStep(3)}
                disabled={!selectedDate || currentStep === 3}
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  getStepStatus(3) === "completed" 
                    ? "bg-[#007AFF] text-white hover:bg-[#0066FF] cursor-pointer" 
                    : getStepStatus(3) === "active"
                    ? "bg-[#007AFF] text-white ring-4 ring-blue-500/20"
                    : "bg-slate-900 border-2 border-slate-800 text-slate-500"
                }`}
              >
                {getStepStatus(3) === "completed" ? <Check className="w-4 h-4 text-white" /> : "3"}
              </button>
              <span className={`text-[10px] md:text-xs font-bold tracking-wider uppercase ${currentStep === 3 ? "text-[#3B82F6]" : "text-slate-500"}`}>
                Time
              </span>
            </div>

            {/* Step 4: Confirm */}
            <div className="flex flex-col items-center gap-1.5 flex-1">
              <div 
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  getStepStatus(4) === "active"
                    ? "bg-[#007AFF] text-white ring-4 ring-blue-500/20"
                    : "bg-slate-900 border-2 border-slate-800 text-slate-500"
                }`}
              >
                4
              </div>
              <span className={`text-[10px] md:text-xs font-bold tracking-wider uppercase ${currentStep === 4 ? "text-[#3B82F6]" : "text-slate-500"}`}>
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
                {selectedDate ? `Availability - ${formatDateString(selectedDate)}` : "Select Session Date"}
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
                  <div key={day} className="text-slate-500 text-[10px] md:text-xs font-extrabold uppercase">
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
                  const active = isSelected(cell);
                  const currentDay = isToday(cell);

                  return (
                    <button
                      key={cell.toISOString()}
                      disabled={past}
                      onClick={() => handleDateSelect(cell)}
                      className={`aspect-square w-full rounded-xl text-xs font-semibold transition-all flex items-center justify-center ${
                        active 
                          ? "bg-[#007AFF] text-white shadow-lg shadow-blue-500/20 scale-105" 
                          : currentDay
                          ? "border-2 border-[#007AFF] text-white bg-blue-950/20"
                          : past
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
                Click a highlighted date on the calendar to reserve your preferred day.
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
              {[15, 30, 60].map((dur) => {
                const isSel = selectedDuration === dur;
                const factor = dur / 60;
                const cost = Math.round(expert.pricePerHour * factor);
                
                return (
                  <button
                    key={dur}
                    onClick={() => setSelectedDuration(dur as 15 | 30 | 60)}
                    className={`w-full flex items-center justify-between bg-slate-950/40 border p-4 rounded-2xl text-left transition-all ${
                      isSel 
                        ? "border-[#007AFF] bg-[#007AFF]/5 text-white ring-1 ring-[#007AFF]" 
                        : "border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl ${isSel ? "bg-[#007AFF]/20 text-[#3B82F6]" : "bg-slate-900 text-slate-500"}`}>
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm md:text-base">{dur} Minutes</h4>
                        <p className="text-xs text-slate-400">Individual consulting session</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-extrabold text-sm md:text-base">${cost}</span>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        isSel ? "bg-[#007AFF] border-[#007AFF]" : "border-slate-700"
                      }`}>
                        {isSel && <Check className="w-3 h-3 text-white fill-white" />}
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
              {timeSlots.map((time) => {
                const isSel = selectedTime === time;
                return (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-3 px-4 rounded-xl text-xs font-bold text-center border transition-all ${
                      isSel 
                        ? "bg-[#007AFF] border-[#007AFF] text-white shadow-lg shadow-blue-500/15" 
                        : "bg-slate-950/40 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white"
                    }`}
                  >
                    {time}
                  </button>
                );
              })}
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
                  <h4 className="text-sm font-bold text-white">{expert.name}</h4>
                  <p className="text-xs text-slate-400">{expert.title}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 border-t border-slate-800/80 pt-3.5 text-xs">
                <div>
                  <span className="text-slate-500 block font-medium mb-0.5">Date</span>
                  <span className="text-white font-bold">{formatDateString(selectedDate)}</span>
                </div>
                <div>
                  <span className="text-slate-500 block font-medium mb-0.5">Time & Duration</span>
                  <span className="text-white font-bold">{selectedTime} ({selectedDuration} Min)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: SUCCESS STATE */}
        {currentStep === 5 && (
          <div className="flex flex-col items-center justify-center text-center py-6 space-y-5 animate-fadeIn">
            <div className="w-16 h-16 bg-emerald-500/10 border-2 border-emerald-500 rounded-full flex items-center justify-center text-emerald-500 animate-scaleUp">
              <ShieldCheck className="w-8 h-8" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-xl md:text-2xl font-black text-white">Booking Confirmed!</h2>
              <p className="text-slate-400 text-xs md:text-sm max-w-xs mx-auto leading-relaxed">
                Your consultation session with <strong className="text-white">{expert.name}</strong> has been successfully booked.
              </p>
            </div>

            <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 w-full text-left space-y-2.5 text-xs text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500">Expert:</span>
                <span className="font-bold text-white">{expert.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Scheduled Date:</span>
                <span className="font-bold text-white">{formatDateString(selectedDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Time / Duration:</span>
                <span className="font-bold text-white">{selectedTime} ({selectedDuration} min)</span>
              </div>
              <div className="flex justify-between border-t border-slate-800/80 pt-2.5">
                <span className="text-slate-500">Reference ID:</span>
                <span className="font-mono text-blue-400 uppercase font-bold">VNT-{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
            </div>

            <p className="text-[10px] text-slate-500 font-medium">
              A calendar invite and joining details have been dispatched to your registered email address.
            </p>

            <div className="flex gap-3 w-full pt-2">
              <button 
                onClick={handleReset}
                className="flex-1 py-3 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-bold transition-all"
              >
                Book Another
              </button>
              <Link to="/experts" className="flex-1">
                <button className="w-full py-3 bg-[#007AFF] hover:bg-[#0066FF] text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-500/10">
                  Done
                </button>
              </Link>
            </div>
          </div>
        )}

        {/* Pricing Summary (only for Steps 1-4) */}
        {currentStep <= 4 && (
          <div className="mt-8 border-t border-slate-800/80 pt-5 space-y-4">
            {/* Price lines */}
            <div className="space-y-2.5 text-xs font-semibold">
              <div className="flex justify-between text-slate-400">
                <span>{expert.name.split(' ')[0]} Fee ({selectedDuration}m)</span>
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
                  I agree to the <a href="#" className="text-[#3B82F6] hover:underline font-bold">Terms of Service</a> & <a href="#" className="text-[#3B82F6] hover:underline font-bold">Privacy Policy</a>. Understand that slots cannot be refunded within 24 hours of starting.
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
                  onClick={() => setCurrentStep((prev) => (prev + 1) as Step)}
                  className="flex-1 py-3 bg-[#007AFF] hover:bg-[#0066FF] disabled:bg-slate-900 disabled:text-slate-600 disabled:cursor-not-allowed text-white rounded-xl text-xs font-extrabold transition-all active:scale-[0.98] shadow-md shadow-blue-500/10 flex items-center justify-center gap-1.5"
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="button"
                  disabled={!agreeToTerms}
                  onClick={handleBookNow}
                  className="flex-1 py-3 bg-[#007AFF] hover:bg-[#0066FF] disabled:bg-slate-900 disabled:text-slate-600 disabled:cursor-not-allowed text-white rounded-xl text-xs font-extrabold transition-all active:scale-[0.98] shadow-md shadow-blue-500/10"
                >
                  Book Now
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
