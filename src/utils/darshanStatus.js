/**
 * Computes live Darshan status according to Indian Standard Time (IST, UTC+5:30)
 * Morning Window: 05:00 AM – 10:30 AM (300 to 630 mins)
 * Evening Window: 05:30 PM – 08:00 PM (1050 to 1200 mins)
 */
export const getDarshanStatus = () => {
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
            label: 'Darshan Open Now',
            shortLabel: 'Darshan Active',
            sub: `Closes at ${closeTime}`,
            timing: isMorning ? 'Morning Darshan' : 'Evening Deeparadhana'
        };
    }

    let nextLabel;
    if (totalMins < morningOpen) {
        nextLabel = 'Opens at 05:00 AM';
    } else if (totalMins < eveningOpen) {
        nextLabel = 'Opens at 05:30 PM';
    } else {
        nextLabel = 'Opens Tomorrow 05:00 AM';
    }

    return {
        open: false,
        label: 'Darshan Closed',
        shortLabel: 'Darshan Closed',
        sub: nextLabel,
        timing: 'Next: ' + nextLabel
    };
};
