const fetch = require("node-fetch");

async function sendTrialLessonEmail(email) {
    const emailData = {
        from: {
            name: "Group8",
            address: "group8@hbo-ict.cloud",
        },
        to: [
            {
                name: "infinity",
                address: email,
            },
        ],
        subject: "Proefles",
        html:"Email",
    };

    try {
        const response = await fetch("https://api.hbo-ict.cloud/mail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer pad_hva_8.Np8Z1P7jCOOIscBx",
            },
            body: JSON.stringify(emailData),
        });

        if (response.ok) {
            console.log("Email sent successfully!");
        } else {
            console.error("Failed to send email. Status:", response.status);
        }
    } catch (e) {
        console.error("Failed to send email:", e);
    }
}

module.exports = sendTrialLessonEmail