NoteNum=1;
	chrome.storage.sync.get(null, function(items) 
    {
    console.log(items,document.getElementById('1'));
    for (var key in items)
	{
	    var itm = document.createElement("textarea");
	    itm.innerHTML=items[key];
	    itm.id=NoteNum;
	    var button1 = document.createElement("input");
        button1.type = 'button';
        button1.value = "X";
        button1.id = "but"+NoteNum;
        button1.name=NoteNum+","+key;
        button1.onclick = function () 
        {
        if(confirm('Delete Note?'+this.name)==true)
        	{
        		document.getElementById(this.name.split(",")[0]).remove();
        		document.getElementById(this.id).remove();
			chrome.storage.sync.remove(this.name.split(",")[1]);
            }
          };
        NoteNum+=1;
                itm.innerHTML=items[key]+itm.id;
		button1.style.position="absolute";
		button1.style.marginTop="4px";
		button1.style.marginLeft="-25px";
		button1.style.borderRadius="5px";
		button1.style.fontWeight="bold";
		document.getElementById("div1").appendChild(itm);        
		document.getElementById("div1").appendChild(button1);
}});

    document.getElementById("back").onclick=function (evt) 
    {
    window.open ('popup2.html','_self',false)
}
