/*
 * Get list of files for a folder
 */
function getFileList(folderName) {
  // get file listing within folder
  var folders = DriveApp.getFoldersByName(folderName)
  var folder = folders.next();
  var contents = folder.getFiles();

  return contents;
};

/*
 * Generate object with file name as key and object with view and download links as value
 */
function createUrlObject(files) {
  var file;
  var name;
  var link;
  var row;
  var output = {};

  while(files.hasNext()) {
    // get next file
    file = files.next();

    // strip information from file object and create links
    fileId = file.getId();
    fileName = file.getName();
    viewLink = constructViewLink(fileId);
    downloadLink = constructDownloadLink(fileId);

    // add to output object
    output[fileName] = {
      'viewLink': viewLink,
      'downloadLink': downloadLink
    };
  };

  return output;
};

/*
 * Create link to view file using file id
 */
function constructViewLink(id) {
  return 'https://drive.google.com/file/d/' + id + '/view';
};

/*
 * Create link to download file using file id
 */
function constructDownloadLink(id) {
  return 'https://drive.google.com/uc?export=download&id=' + id;
};