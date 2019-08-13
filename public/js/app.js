 var info = document.querySelector("#infomation") 
            document.querySelector("#defaultJson").addEventListener("click",function(){
            alert("클릭")
        })
        document.querySelector("#btn_send").addEventListener("click",function(){
            const title = document.querySelector("#title");
            const json = document.querySelector("#json");
            let obj = {"title": title.value
                        ,"json": json.value
                      };
                    
            data = JSON.stringify(obj);
           
            sendAjax(data, "/upload");
           
        })
        
        function init(){
         let xhr = new XMLHttpRequest();
           xhr.open("GET","/getlist");
           xhr.setRequestHeader("Content-Type", "application/json")
           xhr.send();

           xhr.onload = function () {
            var data =JSON.parse(xhr.response);  
                    info.innerHTML = "현재 사용중인 api2의 수는 " + data.count +" 개 입니다."
            };     
        }

      
    
    function sendAjax(data, url) {
            const xhr = new XMLHttpRequest();
            xhr.open("POST",url);
            xhr.setRequestHeader("Content-Type", "application/json")
            xhr.send(data)
            xhr.addEventListener("load",function(){
                //console.log(xhr.responseText)
            })
            xhr.onreadystatechange = function(){
                if (xhr.readyState === xhr.DONE && this.status === 200) {
                    info.innerHTML = "등록 성공 "
                }else{
                    info.innerHTML = xhr.responseText
                 }
            }
    }
    init();