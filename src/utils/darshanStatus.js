/**
 * Computes live Darshan status according to Indian Standard Time (IST, UTC+5:30)
 * Morning Window: 05:00 AM – 10:30 AM (300 to 630 mins)
 * Evening Window: 05:30 PM – 08:00 PM (1050 to 1200 mins)
 */
export const getDarshanStatus = (lang = 'en') => {
    const isML = lang === 'ml';
    const now = new Date();
    const utcMs = now.getTime() + (now.getTimezoneOffset() * 60000);
    const ist = new Date(utcMs + (5.5 * 3600000));
    
    const h = ist.getHours();
    const m = ist.getMinutes();
    const totalMins = h * 60 + m;

    const morningOpen = 5 * 60;          // 05:00 AM (300)
    const morningClose = 10 * 60 + 30;    // 10:30 AM (630)
    const eveningOpen = 17 * 60 + 30;     // 05:30 PM (1050)
    const eveningClose = 20 * 60;         // 08:00 PM (1200)

    const isMorning = totalMins >= morningOpen && totalMins < morningClose;
    const isEvening = totalMins >= eveningOpen && totalMins < eveningClose;

    if (isMorning || isEvening) {
        const closeTime = isMorning ? '10:30 AM' : '08:00 PM';
        return {
            open: true,
            label: isML ? 'നട തുറന്നിരിക്കുന്നു' : 'Darshan Open Now',
            shortLabel: isML ? 'ദർശനം' : 'Darshan Active',
            sub: isML ? (isMorning ? 'രാവിലെ 10:30 ന് അടയ്ക്കും' : 'രാത്രി 08:00 ന് അടയ്ക്കും') : `Closes at ${closeTime}`,
            timing: isML ? (isMorning ? 'പ്രഭാത ദർശനം' : 'ദീപാരാധന') : (isMorning ? 'Morning Darshan' : 'Evening Deeparadhana')
        };
    }

    let nextLabel;
    if (totalMins < morningOpen) {
        nextLabel = isML ? 'രാവിലെ 05:00 ന് തുറക്കും' : 'Opens at 05:00 AM';
    } else if (totalMins < eveningOpen) {
        nextLabel = isML ? 'വൈകിട്ട് 05:30 ന് തുറക്കും' : 'Opens at 05:30 PM';
    } else {
        nextLabel = isML ? 'നാളെ രാവിലെ 05:00 ന് തുറക്കും' : 'Opens Tomorrow 05:00 AM';
    }

    return {
        open: false,
        label: isML ? 'നട അടച്ചിരിക്കുന്നു' : 'Darshan Closed',
        shortLabel: isML ? 'നട അടച്ചു' : 'Darshan Closed',
        sub: nextLabel,
        timing: isML ? nextLabel : 'Next: ' + nextLabel
    };
};
