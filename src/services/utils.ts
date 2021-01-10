export const toBase64 = (file: File) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        resolve(reader.result)
    };
    reader.onerror = error => reject(error);
});

export function setToLocalStorage(key: string, value: any) {
    window.localStorage.setItem(key, value);
}

export function readLocalStorage(key: string): any {
    return window.localStorage.getItem(key);
}

export function printElem(elem: any) {
    const mywindow = window.open('', 'PRINT', 'height=800,width=800');
    // @ts-ignore
    const customStyles = `.analyze-card{
    background: #EFEFEF;
    margin: 10px;
    box-shadow: 5px 5px 5px 5px #888888;
    width: 100%;
}

.diagnose-card{
    background: #EFEFEF;
    margin: 10px;
    box-shadow: 5px 5px 5px 5px #888888;
    width: 100%;
}`

    // @ts-ignore
    mywindow.document.write('<html><head>');
       // @ts-ignore
    mywindow.document.write('<link rel="stylesheet" href="plugins/bootstrap/css/bootstrap.css">');
    // @ts-ignore
    mywindow.document.write('<style type="text/css">'+customStyles+' </style>');
    const styles = ``
    // @ts-ignore
    mywindow.document.write('<style type="text/css">'+styles+' </style>');

    // @ts-ignore
    mywindow.document.write('</head><body >');
    // @ts-ignore
    mywindow.document.write(document.getElementById(elem).innerHTML);
    // @ts-ignore
    mywindow.document.write('</body></html>');
    // @ts-ignore
    mywindow.document.close(); // necessary for IE >= 10
    // @ts-ignore
    mywindow.focus(); // necessary for IE >= 10*/
    // @ts-ignore
    mywindow.print();
    // @ts-ignore
    mywindow.close();
    return true;
}


export function downloadURI(uri:string, name:string) {
    let link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    //after creating link you should delete dynamic link
    //clearDynamicLink(link);
}


