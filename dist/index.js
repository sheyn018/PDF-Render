"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require('express');
const PDFDocument = require('pdfkit');
const axios = require('axios');
const svgToImg = require('svg-to-img');
const nodemailer = require('nodemailer');
const app = express();
// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sheane39@gmail.com',
        pass: 'gxqi seqf gjyz kkmj'
    }
});
// Existing route handler
app.get("/", (req, res) => res.send("Express on Vercel"));
// New route handler for PDF generation
app.get("/generate-pdf", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { userName, email, businessName, industry, description, targetAudience, visualPreference, keyMessage, designElements, firstUrl, secondUrl, thirdUrl, fourthUrl, fifthUrl, firstRGB, secondRGB, thirdRGB, fourthRGB, fifthRGB, firstHex, secondHex, thirdHex, fourthHex, fifthHex, firstCMYK, secondCMYK, thirdCMYK, fourthCMYK, fifthCMYK, screenshotUrl } = req.query;
        userName = decodeURIComponent(userName);
        email = decodeURIComponent(email);
        businessName = decodeURIComponent(businessName);
        industry = decodeURIComponent(industry);
        description = decodeURIComponent(description);
        targetAudience = decodeURIComponent(targetAudience);
        visualPreference = decodeURIComponent(visualPreference);
        keyMessage = decodeURIComponent(keyMessage);
        designElements = decodeURIComponent(designElements);
        firstRGB = decodeURIComponent(firstRGB);
        secondRGB = decodeURIComponent(secondRGB);
        thirdRGB = decodeURIComponent(thirdRGB);
        fourthRGB = decodeURIComponent(fourthRGB);
        fifthRGB = decodeURIComponent(fifthRGB);
        firstCMYK = decodeURIComponent(firstCMYK);
        secondCMYK = decodeURIComponent(secondCMYK);
        thirdCMYK = decodeURIComponent(thirdCMYK);
        fourthCMYK = decodeURIComponent(fourthCMYK);
        userName = decodeURIComponent(userName);
        firstRGB = decodeURIComponent(firstRGB);
        secondRGB = decodeURIComponent(secondRGB);
        thirdRGB = decodeURIComponent(thirdRGB);
        fourthRGB = decodeURIComponent(fourthRGB);
        fifthRGB = decodeURIComponent(fifthRGB);
        firstCMYK = decodeURIComponent(firstCMYK);
        secondCMYK = decodeURIComponent(secondCMYK);
        thirdCMYK = decodeURIComponent(thirdCMYK);
        fourthCMYK = decodeURIComponent(fourthCMYK);
        fifthCMYK = decodeURIComponent(fifthCMYK);
        const urlSet = [firstUrl, secondUrl, thirdUrl, fourthUrl, fifthUrl];
        const rgbSet = [firstRGB, secondRGB, thirdRGB, fourthRGB, fifthRGB];
        const hexSet = [firstHex, secondHex, thirdHex, fourthHex, fifthHex];
        const cmykSet = [firstCMYK, secondCMYK, thirdCMYK, fourthCMYK, fifthCMYK];
        // Create a new PDF document in memory
        const doc = new PDFDocument({ layout: 'landscape' });
        const buffers = [];
        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => __awaiter(void 0, void 0, void 0, function* () {
            const pdfBuffer = Buffer.concat(buffers);
            const filename = `${userName}.pdf`;
            try {
                // Send the PDF as attachment via email
                const info = yield transporter.sendMail({
                    from: 'sheane39@gmail.com',
                    to: email,
                    subject: 'Chatbot-Generated Starter Moodboard',
                    text: `Hello ${userName}!\n\nWe're thrilled to present you with your personalized starter mood board, generated through your interaction with our chatbot. This mood board is designed to ignite inspiration for your brand identity.\n\nWe look forward to collaborating with you on building your remarkable brand.`,
                    attachments: [
                        {
                            filename: filename,
                            content: pdfBuffer
                        }
                    ]
                });
                console.log('Email sent:', info.response);
                res.status(200).send('PDF emailed successfully');
            }
            catch (error) {
                console.error('Error sending email:', error);
                res.status(500).send('Error sending email');
            }
        }));
        // Add User Name
        doc.fontSize(12).text(`User Name: ${userName}`, 50, 50);
        // Add Date Generated
        const dateGenerated = new Date().toLocaleDateString();
        doc.text(`Date Generated: ${dateGenerated}`, 550, 50);
        // Add "Business Information" header
        doc.font('Helvetica-Bold').text('BUSINESS INFORMATION', 50, 90, { continued: true, width: 200, align: 'left' });
        // Add business details
        const lineHeight = 15; // Adjust this value as needed
        const startY = 120; // Start Y position
        const spacing = lineHeight + 5; // Adjust this value to control spacing between lines
        doc.font('Helvetica').fontSize(10)
            .text('')
            .text(`Business Name: ${businessName}`, 50, startY)
            .text(`Industry: ${industry}`, 50, startY + spacing)
            .text(`Description: ${description}`, 50, startY + 2 * spacing)
            .text(`Target Audience: ${targetAudience}`, 50, startY + 3 * spacing)
            .text(`Visual Preference: ${visualPreference}`, 50, startY + 4 * spacing)
            .text(`Key Message: ${keyMessage}`, 50, startY + 5 * spacing)
            .text(`Design Elements: ${designElements}`, 50, startY + 6 * spacing);
        // Add "Typography" header
        doc.font('Helvetica-Bold').text('TYPOGRAPHY', 50, 275, { continued: true, width: 200, align: 'left' });
        // Add screenshot image from URL
        const screenshotResponse = yield axios.get(screenshotUrl, { responseType: 'arraybuffer' });
        const screenshotImage = screenshotResponse.data;
        // Draw the screenshot image on the page
        doc.image(screenshotImage, 50, 305, { width: 300 });
        // Add "Color Palette" header
        doc.font('Helvetica-Bold').text('COLOR PALETTE', 395, 90, { continued: true, width: 200, align: 'right' });
        // Add images from URLs on the right side
        let currentPosition = 120; // Start position vertically
        const textXCoordinate = 590; // X-coordinate for text
        let index = 0;
        for (const url of urlSet) {
            const response = yield axios.get(url, { responseType: 'text' });
            const svgString = response.data;
            // Convert SVG to PNG
            const pngBuffer = yield svgToImg.from(svgString).toPng();
            // Draw the image on the right side
            doc.image(pngBuffer, 510, currentPosition, { width: 70, height: 70 });
            // Add text next to the image
            const hexValue = hexSet[index];
            const rgbValue = rgbSet[index];
            const cmykValue = cmykSet[index];
            doc.fontSize(10)
                .text('')
                .font('Helvetica')
                .text(`HEX: ${hexValue}`, textXCoordinate, currentPosition + 7)
                .text(`RGB: ${rgbValue}`, textXCoordinate, currentPosition + 17)
                .text(`CMYK: ${cmykValue}`, textXCoordinate, currentPosition + 27);
            currentPosition += 95; // Increment vertical position
            index++;
        }
        // Finalize the document
        doc.end();
    }
    catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).send('Error generating PDF');
    }
}));
app.listen(3001, () => console.log("Server ready on port 3001."));
module.exports = app;
