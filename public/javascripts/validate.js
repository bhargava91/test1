/*<script type="text/javascript">
var emailRegex = /^[A-Za-z0-9._]*\@[A-Za-z]*\.[A-Za-z]{2,5}$/;
 var passw= /^[a-zA-Z0-9!@#$%^&*]$/;
 var fname = document.MYForm1.fname.value,
 lname = document.MYForm1.lname.value,
 femail = document.MYForm1.email.value,
 freemail = document.MYForm1.enterEmail.value,
 fpassword = document.MYForm1.pass.value,
 
 fphone=document.MYForm1.phone.value;
</script>*/
function validate(){
 
 //alert("hi");
  //var a="hai"; 
  //document.write(a);
 if( document.MYForm1.fname.value == "" )
 {
  
  document.getElementById("txtid").innerHTML="first name should not be empty";
  return;

 }
 else
 {
  document.getElementById("txtid").innerHTML="";
  return;

 }
}
 function validate1(){
 if( document.MYForm1.lname.value == "" )
   {
     document.getElementById("txtid1").innerHTML="last name should not be empty";
     return;
   }
    else
 {
  document.getElementById("txtid1").innerHTML="";
  return;

 }
}

  function validate2(){
  
    
if ( document.MYForm1.email.value== "" )
 {
  document.getElementById("txtid2").innerHTML="enter email id";
  return;
  } else if(!(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(document.MYForm1.email.value))){
  document.getElementById("txtid2").innerHTML="enter correct email id";
  return;
  }

  else{
    //document.getElementById("txtid2").innerHTML="";
    document.getElementById("txtid2").innerHTML="";

       var xmlhttp=new XMLHttpRequest();
     
       xmlhttp.onreadystatechange=function() 
       {
           if (xmlhttp.readyState==4 && xmlhttp.status==200) 
           {
               document.getElementById("txtid2").innerHTML=xmlhttp.responseText;
           }
       }
         xmlhttp.open("POST","/emailcheck",true);

        xmlhttp.setRequestHeader('data', document.MYForm1.email.value);

       xmlhttp.send();


    return;
  }

   }
   
   function validate3(){
 if(document.MYForm1.pass.value == "")
  {
    document.getElementById("txtid3").innerHTML="password should not be empty";
    return;

  }

   if(!/^[a-zA-Z0-9!@#$%^&*]{8,16}$/.test(document.MYForm1.pass.value)){
   document.getElementById("txtid3").innerHTML="password include spl char and number";
   return;

  }
else{
  document.getElementById("txtid3").innerHTML="";
  return;
}}
  function validate4(){
   
   if(document.MYForm1.phone.value== "")
   {
     document.getElementById("txtid4").innerHTML="phone number should not be empty";
     return;

   }
   if(!(/^[0-9]{9}$/.test(document.MYForm1.phone.value))){
     document.getElementById("txtid4").innerHTML="enter valid phone number";
     return;

   }
   else{
    document.getElementById("txtid4").innerHTML="";
    return;
   }
 }
  
  
     

