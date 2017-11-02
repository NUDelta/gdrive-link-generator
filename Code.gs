/*
 * Make a menu item so script can be called easily
 */
function onOpen() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Papers');
  var ui = SpreadsheetApp.getUi();

  var menuEntries = [
    {name: 'Generate Paper URLs', functionName: 'generateDownloadUrls'}
  ];
  ss.addMenu('Website URL Generator', menuEntries);
}

/*
 * Generates URLs and replaces existing data in spreadsheet with new URLs
 */
function generateDownloadUrls() {
  // get list of files stored in Publications in same folder as Spreadsheet
  var fileList = getFileList('Publications');

  // create object with files and urls
  var urlObject = createUrlObject(fileList);

  // get data from existing sheet
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Papers');
  var range = sheet.getDataRange();
  var values = range.getValues();

  // get indices for needed columns
  const normalizedHeader = normalizeHeaders(values[0]);
  const fileNameIndex = normalizedHeader.indexOf('fileName');
  const currentLinkIndex = normalizedHeader.indexOf('currentLink');
  const linkToPdfIndex = normalizedHeader.indexOf('linkToPdf') + 1;

  // iterate through spreadsheet and replace urls
  // if fileName is blank, linkToPdf = currentLink
  // if linkToPdf is blank, linkToPfd = ''
  for (var i = 0; i < values.length; i++) {
    if (i !== 0) {
      var currentCell = range.getCell(i + 1, linkToPdfIndex);
      var currentRow = values[i];
      var fileName = currentRow[fileNameIndex];

      // set to google drive link or existing link (if blank, keep blank)
      if (fileName !== '' && urlObject.hasOwnProperty(fileName)) {
        currentCell.setValue(urlObject[fileName].downloadLink);
      } else {
        currentCell.setValue(currentRow[currentLinkIndex]);
      }
    }
  }
}