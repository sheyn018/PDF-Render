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
                    from: 'Whizzle at Creative Shizzle <cs.development.test@gmail.com>',
                    to: email,
                    subject: '[Save This] Your Brand Mood Board',
                    html: `<!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Your Brand Mood Board</title>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                margin: 0;
                                padding: 0;
                                background-color: #f9f9f9;
                            }
                            .container {
                                max-width: 600px;
                                margin: 0 auto;
                                padding: 20px;
                                background-color: #ffffff;
                                border-radius: 10px;
                                box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
                            }
                            .header {
                                text-align: center;
                                margin-bottom: 20px;
                            }
                            .header h1 {
                                color: #333333;
                            }
                            .content {
                                color: #555555;
                                line-height: 1.6;
                            }
                            .cta-button {
                                display: inline-block;
                                background-color: #21A901;
                                color: #ffffff;
                                padding: 12px 24px;
                                text-decoration: none;
                                border-radius: 25px;
                                transition: background-color 0.3s;
                            }
                            .cta-button:hover {
                                background-color: #1a7e01;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="header">
                                <img src="https://rbbsdrzrdfsrvigkfhoj.supabase.co/storage/v1/object/public/files_bucket/test_folder/logo.png?t=2024-05-09T07%3A57%3A05.662Z" alt="Creative Shizzle Logo" width="30%" height="30%">
                                <h1>Your Brand Mood Board</h1>
                            </div>
                            <div class="content">
                                <p>Hello <strong>${userName}</strong>!</p>
                                <p>We're thrilled to present you with your personalized starter mood board, generated through your interaction with Whizzle! This mood board is designed to ignite inspiration for your brand identity.</p>
                                <p>Need help implementing your new brand? With our <strong>Pro Fo' Shizzle plan</strong>, you can get an all-new brand and all of the marketing materials you need for your biz to shine and sizzle. Start a free trial today for just $149.</p>
                                <div style="text-align: center; margin-top: 20px;">
                                    <a href="https://creativeshizzle.com/" style="background-color: #6e36e9; border: none; color: white; padding: 12px 24px; text-align: center; text-decoration: none; display: inline-block; font-size: 14px; border-radius: 25px;">Explore Our Services</a>
                                </div>
                            </div>
                            <div class="social-section" style="margin-top: 40px; text-align: center;">
                                <hr style="border: 0; height: 1px; background-color: #dddddd; margin-bottom: 20px;">
                                <p style="font-size: 16px; margin-bottom: 10px;">Let's get social</p>
                                <a href="https://www.facebook.com/creativeshizzle">
                                    <img src="https://cdn.jsdelivr.net/gh/dmhendricks/signature-social-icons/icons/round-flat-filled/50px/facebook.png" alt="Facebook" title="Facebook" width="25" height="25" style="filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(263deg) brightness(111%) contrast(107%);" />
                                </a>
                                <a href="https://www.instagram.com/creativeshizzle/">
                                    <img src="https://cdn.jsdelivr.net/gh/dmhendricks/signature-social-icons/icons/round-flat-filled/50px/instagram.png" alt="Instagram" title="Instagram" width="25" height="25" style="filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(259deg) brightness(107%) contrast(101%);" />
                                </a>
                                <a href="https://www.linkedin.com/company/creativeshizzle/">
                                    <img src="https://cdn.jsdelivr.net/gh/dmhendricks/signature-social-icons/icons/round-flat-filled/50px/linkedin.png" alt="LinkedIn" title="LinkedIn" width="25" height="25" style="filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(220deg) brightness(102%) contrast(101%);" />
                                </a>
                            </div>
                        </div>
                    </body>
                    </html>`,
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

        // Define the generated by text
        const generatedByText = 'Generated by Creative Shizzle';

        // Set font size and color for the generated by text
        doc.fontSize(8) // Set font size to 10
        .fillColor('#666') // Set text color to gray
        .text(generatedByText, 50, 15) // Add the text to the PDF
        .fillColor('black'); // Set text color back to black for other text

        // Add User Name
        doc.fontSize(12).text(`Name: ${userName}`, 50, 50);

        // Function to fetch image and embed it into PDF
        async function embedImageFromURL(doc: { image: (arg0: Buffer, arg1: any, arg2: any, arg3: { width: any; }) => void; }, url: string, x: number, y: number, width: number) {
            try {
                const response = await axios.get(url, { responseType: 'arraybuffer' });
                const imageData = Buffer.from(response.data, 'binary');
                doc.image(imageData, x, y, { width: width });
            } catch (error) {
                console.error("Error fetching or embedding image:", error);
            }
        }
       // Insert Image
        const imageURL = 'https://rbbsdrzrdfsrvigkfhoj.supabase.co/storage/v1/object/public/files_bucket/test_folder/small-logo.png?t=2024-05-09T09%3A30%3A37.107Z';
        await embedImageFromURL(doc, imageURL, 350, 15, 100);

        // Add Date Generated
        const dateGenerated = new Date().toLocaleDateString();
        doc.text(`Date Generated: ${dateGenerated}`, 575, 50);

        // Define the y-coordinate for the line
        const lineYCoordinate = 75; // Adjust this value as needed

        // Add a horizontal thin line below the text and image
        doc.moveTo(50, lineYCoordinate) // Move to the starting point
            .lineTo(730, lineYCoordinate) // Draw a line to the end point
            .lineWidth(1) // Set line width to 1
            .strokeColor('#6e36e9') // Set line color to #E5CE22
            .stroke(); // Draw the line

        // Add the "Business Information" header
        doc.font('Helvetica-Bold').text('BUSINESS INFORMATION', 50, 91, { align: 'left' });

        // Calculate the height of the text to position the line correctly
        let textHeight = doc.currentLineHeight() + 10; // Adjusted for padding

        // Add the line on the left side of the text
        doc.moveTo(45, 90) // Starting point on the left side of the text
        .lineTo(45, 80 + textHeight) // Draw a line to the bottom of the text
        .lineWidth(3) // Set line width to 5
        .strokeColor('#6e36e9') // Set line color to #6e36e9
        .stroke(); // Draw the line

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
        doc.font('Helvetica-Bold').fontSize(12).text('TYPOGRAPHY', 50, 276, { continued: true, width: 200, align: 'left' });

        // Calculate the height of the text to position the line correctly
        let typographyTextHeight = doc.currentLineHeight() + 10; // Adjusted for padding

        // Add the line on the left side of the text
        doc.moveTo(45, 275) // Starting point on the left side of the text
            .lineTo(45, 265 + typographyTextHeight) // Draw a line to the bottom of the text
            .lineWidth(3) // Set line width to 3
            .strokeColor('#6e36e9') // Set line color to #6e36e9
            .stroke(); // Draw the line

        if (secondaryFontUrl === "") {
            // Add screenshot image from URL
            const screenshotResponse = await axios.get(primaryFontUrl, { responseType: 'arraybuffer' });
            const screenshotImage = screenshotResponse.data;

            // Draw the screenshot image on the page
            doc.image(screenshotImage, 50, 305, { width: 300 });
        }

        else {
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
        }

        // Add "Color Palette" header
        doc.font('Helvetica-Bold').fontSize(12).text('COLOR PALETTE', 438, 90, { continued: true, width: 200, align: 'right' });

        // Calculate the height of the text to position the line correctly
        let colorPaletteTextHeight = doc.currentLineHeight() + 10; // Adjusted for padding

        // Adjust the position of the line
        let lineXPosition = 533; // X coordinate for the line
        let lineYStart = 90; // Y coordinate to start the line
        let lineYEnd = 80 + colorPaletteTextHeight; // Y coordinate to end the line

        // Add the line on the left side of the text
        doc.moveTo(lineXPosition, lineYStart) // Starting point on the left side of the text
            .lineTo(lineXPosition, lineYEnd) // Draw a line to the bottom of the text
            .lineWidth(3) // Set line width to 3
            .strokeColor('#6e36e9') // Set line color to #6e36e9
            .stroke(); // Draw the line

        // Add images from URLs on the right side
        let currentPosition = 120; // Start position vertically
        const textXCoordinate = 593 + 28; // X-coordinate for text
        let index = 0;

        for (const url of urlSet) {
            const response = await axios.get(url, { responseType: 'text' });
            const svgString = response.data;

            // Convert SVG to PNG
            const pngBuffer = await svgToImg.from(svgString).toPng();

            // Draw the image on the right side
            doc.image(pngBuffer, 510 + 28, currentPosition - 3, { width: 70, height: 70 });

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
