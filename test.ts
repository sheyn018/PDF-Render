const axios = require('axios');
const { AxiosError } = require('axios');
const { AggregateError } = require('axios');

async function testGeneratePDFEndpoint() {
  try {
    const queryParams = {
      userName: encodeURIComponent("Sheane Tolentino"),
      email: 'sheanemtolentino@gmail.com',
      businessName: encodeURIComponent("DevIsko"),
      industry: encodeURIComponent("Apparel"),
      description: encodeURIComponent("Stylish, sustainable fashion empowering self-expression"),
      targetAudience: encodeURIComponent("All ages | South America | Fashion-forward, ethical shoppers"),
      visualPreference: encodeURIComponent("Modern and sophisticated with clean lines, minimalism, and subtle impactful details"),
      keyMessage: encodeURIComponent(" Empowering self-expression through sustainable and stylish choices"),
      designElements: encodeURIComponent("Sleek, versatile, iconic, minimalist, global leader in sportswear"),
      firstUrl: "https://www.thecolorapi.com/id?format=svg&hex=aed8e6",
      secondUrl: "https://www.thecolorapi.com/id?format=svg&hex=d1b58b",
      thirdUrl: "https://www.thecolorapi.com/id?format=svg&hex=e9783e",
      fourthUrl: "https://www.thecolorapi.com/id?format=svg&hex=9b4d22",
      fifthUrl: "https://www.thecolorapi.com/id?format=svg&hex=6c8a42",
      firstRGB: encodeURIComponent("(174, 216, 230)"),
      secondRGB: encodeURIComponent("(209, 181, 139)"),
      thirdRGB: encodeURIComponent("(233, 120, 62)"),
      fourthRGB: encodeURIComponent("(155, 77, 34)"),
      fifthRGB: encodeURIComponent("(108, 138, 66)"),
      firstHex: "#aed8e6",
      secondHex: "#d1b58b",
      thirdHex: "#e9783e",
      fourthHex: "#9b4d22",
      fifthHex: "#6c8a42",
      firstCMYK: encodeURIComponent("24, 6, 0, 10"),
      secondCMYK: encodeURIComponent("0, 13, 33, 18"),
      thirdCMYK: encodeURIComponent("0, 48, 73, 9"),
      fourthCMYK: encodeURIComponent("0, 50, 78, 39"),
      fifthCMYK: encodeURIComponent(" 22, 0, 52, 46"),
      primaryFontUrl: "https://puppeteer-api-iy77.onrender.com/capture-screenshot?font=Lexend+Deca",
      secondaryFontUrl: "https://puppeteer-api-iy77.onrender.com/capture-screenshot?font=Montserrat",
    };

    const response = await axios.get('http://localhost:3001/generate-pdf', {
      params: queryParams,
      responseType: 'arraybuffer', // Set the response type to arraybuffer to handle binary data
    });

    console.log('PDF generated successfully');
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error;
      if (axiosError.response) {
        console.error('Error generating PDF:', axiosError.response.status, axiosError.response.data);
      } else {
        console.error('Error generating PDF:', axiosError.message);
      }
    } else if (error instanceof AggregateError) {
      error.errors.forEach(err => {
        console.error('Error generating PDF:', err);
      });
    } else {
      console.error('Error generating PDF:', error);
    }
  }
}

testGeneratePDFEndpoint();