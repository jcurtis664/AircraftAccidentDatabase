function addRef(){
    let pn = document.createElement('input');
    pn.classList.add('pageNum');
    pn.placeholder = "Page Number";
    pn.type = "text";

    let ref = document.createElement('input');
    ref.classList.add('reference')
    ref.placeholder = "Reference";
    ref.type = "text";

    let br = document.createElement('br');

    document.getElementById('Language References').append(pn);
    document.getElementById('Language References').append(ref);
    document.getElementById('Language References').append(br);
}

function removeRef(){
    let a = document.getElementById('Language References');
    if(a.children.length < 4){return};
    a.removeChild(a.children[a.children.length-1]);
    a.removeChild(a.children[a.children.length-1]);
    a.removeChild(a.children[a.children.length-1]);
}