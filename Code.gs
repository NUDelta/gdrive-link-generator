// replace your-folder below with the folder for which you want a listing
function listFolderContents() {
  var foldername = 'Published Papers';
  var folderlisting = 'listing of folder ' + foldername;
  
  var folders = DriveApp.getFoldersByName(foldername)
  var folder = folders.next();
  var contents = folder.getFiles();
  
  var ss = SpreadsheetApp.getActiveSpreadsheet(); 
  var sheet = ss.getActiveSheet();
  sheet.clear(); 
  sheet.appendRow( ['name', 'link', 'download link'] );
  
  var file;
  var name;
  var link;
  var row;
  while(contents.hasNext()) {
    file = contents.next();
    
    fileId = file.getId(); 
    fileName = file.getName();
    viewLink = constructViewLink(fileId); 
    downloadLink = constructDownloadLink(fileId); 

    sheet.appendRow( [fileName, viewLink, downloadLink] );     
  }  
};

function constructViewLink(id) {
  return 'https://drive.google.com/file/d/' + id + '/view';
}

function constructDownloadLink(id) {
  return 'https://drive.google.com/uc?export=download&id=' + id; 
}
