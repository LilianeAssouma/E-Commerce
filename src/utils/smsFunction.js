const twilio = require("twilio");

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);


export const sendSMS = async (phoneNumber, message) => {
  try {
    if (!phoneNumber || typeof phoneNumber !== 'string') {
      console.error('Invalid phone number provided.');
      return { success: false, message: 'Invalid phone number' };
    }
    
    const result = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });

    console.log(`SMS sent to ${phoneNumber}. SID: ${result.sid}`);
    
    return { success: true, message: 'SMS sent successfully' };
  } catch (error) {
    console.error(`Error sending SMS to ${phoneNumber}:`, error);
    return { success: false, message: 'Error sending SMS' };
  }
};


export const sendResetToken = async (phoneNumber, resetToken) => {
  const message = `Your password reset token is: ${resetToken}`;
  return sendSMS(phoneNumber, message);
};