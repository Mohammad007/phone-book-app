import { Alert, PermissionsAndroid, Platform } from "react-native";
import RNFS from 'react-native-fs';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import XLSX from 'xlsx';

const handleDownloadPDF = async (filteredData: any) => {
    try {
        const tableRows = filteredData.map(user => `
        <tr>
          <td>${user.id}</td>
          <td>${user.name}</td>
          <td>${user.phone}</td>
          <td>${user.address}</td>
          <td>${user.profession}</td>
          <td>${user.state}</td>
          <td>${user.district}</td>
          <td>${user.city}</td>
        </tr>
      `).join('');

      const htmlContent = `
        <html>
          <head>
            <style>
              table {
                width: 100%;
                border-collapse: collapse;
              }
              th, td {
                border: 1px solid #dddddd;
                text-align: left;
                padding: 8px;
              }
              th {
                background-color: #f2f2f2;
              }
            </style>
          </head>
          <body>
            <h1><center>User List</center></h1>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Profession</th>
                  <th>State</th>
                  <th>District</th>
                  <th>City</th>
                </tr>
              </thead>
              <tbody>
                ${tableRows}
              </tbody>
            </table>
          </body>
        </html>
      `;

      const options = {
        html: htmlContent,
        fileName: 'users_',
      };
      const pdf = await RNHTMLtoPDF.convert(options);
  
      // Get default Download directory path
      const defaultDownloadDir = RNFS.DownloadDirectoryPath;
  
      // Move downloaded file to default Download directory
      const newFilePath = `${defaultDownloadDir}/${pdf.filePath.split('/').pop()}`;
      await RNFS.moveFile(pdf.filePath, newFilePath);
  
      Alert.alert('PDF Download', `PDF saved at: ${newFilePath}`);
    } catch (error) {
      console.error('Error saving PDF:', error);
      Alert.alert('Error', 'Failed to save PDF. Please try again.');
    }
};


const handleDownloadExcel = async (filteredData: any) => {
    // Convert JSON to Excel workbook
    const workbook = XLSX.utils.book_new();
    workbook.SheetNames.push('Users');
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    workbook.Sheets['Users'] = worksheet;

    // Convert workbook to binary Excel data
    const excelBinaryData = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });

    // Prepare download path
    const downloadDir = RNFS.DownloadDirectoryPath;
    const downloadPath = `${downloadDir}/users_${Date.now()}.xlsx`;

    // Write binary data to file
    RNFS.writeFile(downloadPath, excelBinaryData, 'ascii')
        .then(() => {
            console.log('');
            Alert.alert('Excel Download', `Excel saved at: ${downloadPath}`);
        })
        .catch((error) => {
            console.error('Error downloading Excel file:', error);
        });
};


  export { handleDownloadPDF, handleDownloadExcel }
