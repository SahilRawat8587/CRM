const { mailtrapClient, sender } = require("../config/mailtrap");
const { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } = require("./emailTemplates");

const sendPasswordResetEmail = async (email, resetURL) => {
    const recipient = [{ email }];
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Password Reset",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password Reset",
        })
        console.log("Password reset email sent successfully");
    } catch (error) {
        console.error(error);
        throw new Error(`Failed to send password reset email: ${error.message}`); 
    }
}

const sendResetSuccessEmail = async (email) => {
    const recipient = [{ email }];
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Password Reset Successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset",
        })
        console.log("Password reset success email sent successfully");
    } catch (error) {
        console.error(error);
        throw new Error(`Failed to send password reset success email: ${error.message}`);
    }
}

module.exports = { sendPasswordResetEmail, sendResetSuccessEmail };