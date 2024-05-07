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
        user: 'cs.development.test@gmail.com',
        pass: 'mwsg nknp dvra detz'
    }
});

// Existing route handler
app.get("/", (req: any, res: { send: (arg0: string) => any; }) => res.send("Express on Vercel"));

// New route handler for PDF generation
app.get("/generate-pdf", async (req: { query: { userName: any; email: any; businessName: any; industry: any; description: any; targetAudience: any; visualPreference: any; keyMessage: any; designElements: any; firstUrl: any; secondUrl: any; thirdUrl: any; fourthUrl: any; fifthUrl: any; firstRGB: any; secondRGB: any; thirdRGB: any; fourthRGB: any; fifthRGB: any; firstHex: any; secondHex: any; thirdHex: any; fourthHex: any; fifthHex: any; firstCMYK: any; secondCMYK: any; thirdCMYK: any; fourthCMYK: any; fifthCMYK: any; primaryFontUrl: any; secondaryFontUrl: any;}; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): void; new(): any; }; }; }) => {
    try {
        let { userName, email, businessName, industry, description, targetAudience, visualPreference, keyMessage, designElements,
            firstUrl, secondUrl, thirdUrl, fourthUrl, fifthUrl, 
            firstRGB, secondRGB, thirdRGB, fourthRGB, fifthRGB,
            firstHex, secondHex, thirdHex, fourthHex, fifthHex,
            firstCMYK, secondCMYK, thirdCMYK, fourthCMYK, fifthCMYK,
            primaryFontUrl, secondaryFontUrl } = req.query;
        
        // Function to capitalize the first letter of a string
        function capitalizeFirstLetter(variable: string) {
            return variable.charAt(0).toUpperCase() + variable.slice(1);
        }

        userName = decodeURIComponent(userName);
        email = decodeURIComponent(email);
        businessName = capitalizeFirstLetter(decodeURIComponent(businessName));
        industry = capitalizeFirstLetter(decodeURIComponent(industry));
        description = capitalizeFirstLetter(decodeURIComponent(description));
        targetAudience = capitalizeFirstLetter(decodeURIComponent(targetAudience));
        visualPreference = capitalizeFirstLetter(decodeURIComponent(visualPreference));
        keyMessage = capitalizeFirstLetter(decodeURIComponent(keyMessage));
        designElements = capitalizeFirstLetter(decodeURIComponent(designElements));
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
        const buffers: any = [];
        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', async () => {
            const pdfBuffer = Buffer.concat(buffers);
            const filename = `${userName}.pdf`;

            try {
                // Send the PDF as attachment via email
                const info = await transporter.sendMail({
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
            } catch (error) {
                console.error('Error sending email:', error);
                res.status(500).send('Error sending email');
            }
        });

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
        const screenshotResponse = await axios.get(primaryFontUrl, { responseType: 'arraybuffer' });
        const screenshotImage = screenshotResponse.data;

        // Primary Font Label
        doc.fontSize(10)
            .text('')
            .font('Helvetica')
            .text('Primary Font:', 50, 305);

        // Draw the screenshot image on the page
        doc.image(screenshotImage, 130, 285, { width: 200, height: 150 });
        
        // Add screenshot image from URL
        const secondaryScreenshotResponse = await axios.get(secondaryFontUrl, { responseType: 'arraybuffer' });
        const secondaryScreenshotImage = secondaryScreenshotResponse.data;

        // Secondary Font Label
        doc.font('Helvetica').fontSize(10).text('Secondary Font:', 50, 455);

        // Draw the screenshot image on the page
        doc.image(secondaryScreenshotImage, 130, 435, { width: 200, height: 150 });

        // Add "Color Palette" header
        doc.font('Helvetica-Bold').text('COLOR PALETTE', 395, 90, { continued: true, width: 200, align: 'right' });

        // Add images from URLs on the right side
        let currentPosition = 120; // Start position vertically
        const textXCoordinate = 590; // X-coordinate for text
        let index = 0;

        for (const url of urlSet) {
            const response = await axios.get(url, { responseType: 'text' });
            const svgString = response.data;

            // Convert SVG to PNG
            const pngBuffer = await svgToImg.from(svgString).toPng();

            // Draw the image on the right side
            doc.image(pngBuffer, 510, currentPosition - 3, { width: 70, height: 70 });

            // Add text next to the image
            const hexValue = hexSet[index];
            const rgbValue = rgbSet[index];
            const cmykValue = cmykSet[index];

            const lineHeight = 13; // Adjust this value for desired vertical spacing

            doc.fontSize(10)
                .text('')
                .font('Helvetica')
                .text(`HEX: ${hexValue}`, textXCoordinate, currentPosition)
                .text(`RGB: ${rgbValue}`, textXCoordinate, currentPosition + lineHeight)
                .text(`CMYK: ${cmykValue}`, textXCoordinate, currentPosition + 2 * lineHeight);

            currentPosition += 95; // Increment vertical position
            index++;
        }
        
        // Finalize the document
        doc.end();
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).send('Error generating PDF');
    }
});

app.listen(3001, () => console.log("Server ready on port 3001."));

module.exports = app;
