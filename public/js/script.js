function rl(com){
  $.ajax(
      {
        url : '/rl/' + com,
        success : function(data)
        {
            console.log(data);
        }
      }
  );
}