const fileInput =document.getElementById("fileInput"); //selecting the DOM element for the js access to that element

////adding event listener to the file input element for change event 
fileInput.addEventListener("change", function(event){
    const file=event.target.files[0] //we are targetting the input file on click , that event triggers first then we targetting the file array! and we are storing that file in the constfile variable
    
    const reader=new FileReader(); //creating new reader variable for reading the file contents using the object FILEREADER!!

    reader.onload=function(event){ //onload of the file we are creating a function to read the file contents
        const data=event.target.result; //we are storing the file contents in the data variable
        const workbook=XLSX.read(data,{type:"binary"}); //we are using the XLSX library imported from CDN then we say read object then data to read in bianry format! to read the file contents and storing it in the workbook variable
        
        console.log(workbook); //we are logging the workbook data to the console to see the file contents in the console
       
        const sheetName=workbook.SheetNames[0]; //we are getting the first sheet name from the workbook and storing it in the sheetName variable
        const sheet=workbook.Sheets[sheetName];
        const emaillist=XLSX.utils.sheet_to_json(sheet,{header:1}); //we are using the XLSX library to convert the sheet data to JSON format and storing it in the emailist variable
    } 
    reader.readAsBinaryString(file)//implementing filereader is nit enough we need add make the file read function so default it will be in binary so yeh
})