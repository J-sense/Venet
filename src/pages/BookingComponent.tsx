import React, { useEffect } from 'react';

const BookingComponent = () => {
    useEffect(() => {
        // Calendly-এর এক্সটার্নাল জাভাস্ক্রিপ্ট ফাইলটি ডাইনামিকালি লোড করার জন্য
        const script = document.createElement('script');
        script.src = "https://assets.calendly.com/assets/external/widget.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            // কম্পোনেন্ট আনমাউন্ট হলে স্ক্রিপ্টটি রিমুভ করার জন্য
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <h2>Book an Appointment</h2>
            <p>নিচের ক্যালেন্ডার থেকে আপনার সুবিধাজনক সময়টি বেছে নিন।</p>

            {/* আপনার দেওয়া আসল HTML ডিভটি এখানে বসবে */}
            <div
                className="calendly-inline-widget"
                data-url="https://calendly.com/jishan1873/new-meeting"
                style={{ minWidth: '320px', height: '700px' }}
            />
        </div>
    );
};

export default BookingComponent;