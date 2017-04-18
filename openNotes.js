NoteNum=1;

    chrome.storage.sync.get(null, function(items) 
    {
        console.log(items,document.getElementById('1'));
        Object.keys(items).sort().reverse().forEach(function(key, i) 
        {
            console.log(key);
            if(key!='upNote')
            { 
                    var itm = document.createElement("textarea");
                    itm.innerHTML=items[key];
                    itm.id=NoteNum;
                    itm.onclick= function()
                    {
                    alert("clicked "+this.id);
                    chrome.storage.sync.set({'upNote':this.id});
                    window.open ('update.html','_self',false);
                    }
                    console.log(items[key]);
                    var button1 = document.createElement("input");
                    button1.type = 'button';
                    button1.value = "X";
                    button1.id = "but"+NoteNum;
                    button1.name=NoteNum+","+key;
                    button1.onclick = function () 
                    {
                    if(confirm('Delete Note?')==true)
                        {
                            document.getElementById(this.name.split(",")[0]).remove();
                            document.getElementById(this.id).remove();
                            chrome.storage.sync.remove(this.name.split(",")[1]);
                        }
                      };
                    NoteNum+=1;
                    itm.innerHTML=items[key];
                    button1.style.position="absolute";
                    button1.style.marginTop="25px";
                    button1.style.marginLeft="-25px";
                    button1.style.borderRadius="5px";
                    button1.style.fontWeight="bold";

                    document.getElementById("div1").appendChild(itm);        
                    document.getElementById("div1").appendChild(button1);
            }
        });
    });

    document.getElementById("back").onclick=function (evt) 
    {
    window.open ('popup2.html','_self',false)
}