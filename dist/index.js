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
const nodemailer = require('nodemailer');
const sharp = require('sharp'); // Import Sharp
const stream = require('stream');
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
        let { userName, businessName, industry, targetAudience, visualPreference, keyMessage, designElements, firstUrl, secondUrl, thirdUrl, fourthUrl, fifthUrl, firstRGB, secondRGB, thirdRGB, fourthRGB, fifthRGB, firstHex, secondHex, thirdHex, fourthHex, fifthHex, firstCMYK, secondCMYK, thirdCMYK, fourthCMYK, fifthCMYK, screenshotUrl } = req.query;
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
            try {
                // Send the PDF as attachment via email
                const info = yield transporter.sendMail({
                    from: 'sheane39@gmail.com',
                    to: 'sheanemtolentino@gmail.com',
                    subject: 'Your PDF Report',
                    text: 'Please find the PDF attached.',
                    attachments: [
                        {
                            filename: 'landscape.pdf',
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
        userName = decodeURIComponent(userName);
        // Add User Name
        doc.fontSize(12).text(`User Name: ${userName}`, 50, 50);
        // Add Date Generated
        const dateGenerated = new Date().toLocaleDateString();
        doc.text(`Date Generated: ${dateGenerated}`, 550, 50);
        // Add "Typography" header
        doc.font('Helvetica-Bold').text('TYPOGRAPHY', 50, 90, { continued: true, width: 200, align: 'left' });
        // Add screenshot image from URL
        const screenshotResponse = yield axios.get(screenshotUrl, { responseType: 'arraybuffer' });
        const screenshotImage = screenshotResponse.data;
        // Draw the screenshot image on the page
        doc.image(screenshotImage, 50, 120, { width: 300 });
        // Add business details
        doc.font('Helvetica').fontSize(10)
            .text('')
            .text(`Business Name: ${businessName}`, 50, 430)
            .text(`Industry: ${industry}`, 50, 445)
            .text(`Target Audience: ${targetAudience}`, 50, 460)
            .text(`Visual Preference: ${visualPreference}`, 50, 475)
            .text(`Key Message: ${keyMessage}`, 50, 490)
            .text(`Design Elements: ${designElements}`, 50, 505);
        // Pipe the PDF document to the response
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="landscape.pdf"`);
        // Add "Color Palette" header
        doc.font('Helvetica-Bold').text('COLOR PALETTE', 350, 90, { continued: true, width: 200, align: 'right' });
        let currentPosition = 120; // Start position vertically
        let index = 0;
        for (const url of urlSet) {
            const response = yield axios.get(url, { responseType: 'text' });
            const svgString = response.data;
            // Convert SVG to PNG using Sharp
            const pngBuffer = yield sharp(Buffer.from(svgString)).png().toBuffer();
            // Embed the converted PNG onto the PDF
            doc
                .fontSize(10)
                .text('')
                .text(`HEX: ${hexSet[index]}`, 530, currentPosition + 7)
                .text(`RGB: ${rgbSet[index]}`, 530, currentPosition + 17)
                .text(`CMYK: ${cmykSet[index]}`, 530, currentPosition + 27)
                .image(pngBuffer, 450, currentPosition, { width: 70, height: 70 });
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
const port = 3800;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
module.exports = app;
