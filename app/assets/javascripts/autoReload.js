$(function(){
  // let last_message_id = $('.chat-box:last').data("message-id");
  // console.log(last_message_id)
  function buildHTML(message){
    if( message.image ) {
      let html = `
        <div class="chat-box" data-message-id=${message.id}>
          <div class="chat-info">
            <div class="chat-info__name">
              ${message.user_name}
            </div>
            <div class="chat-info__date">
              ${message.created_at}
            </div>
          </div>
          <div class="Message">
            <div class="chat-message">
              ${message.content}
            </div>
            <img class="Message__image" src="${message.image}">
          </div>
        </div>
      `
      return html;
    } else {
      let html = `
        <div class="chat-box" data-message-id=${message.id}>
          <div class="chat-info">
            <div class="chat-info__name">
              ${message.user_name}
            </div>
            <div class="chat-info__date">
              ${message.created_at}
            </div>
          </div>
          <div class="Message">
            <div class="chat-message">
              ${message.content}
            </div>
          </div>
        </div>
      `
      return html;
    };
  }
  let reloadMessages = function() {
    let last_message_id = $('.chat-box:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages){
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message){
          insertHTML += buildHTML(message)
        });
        $('.chat-main__message-list').append(insertHTML);
        $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      }
    })
    .fail(function(){
      alert('error');
    });
  };
  setInterval(reloadMessages, 1000)
});