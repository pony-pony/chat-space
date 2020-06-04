$(function(){
  function buildHTML(message){
    if( message.image ) {
      let html =
        `<div class="chat-info">
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
        </div>`
      return html;
    } else {
      let html =
        `<div class="chat-box">
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
        </div>`
      return html;
    };
  }
  $('.Form').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.chat-main__message-list').append(html);
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      $(".submit-btn").prop("disabled", false);
      $('form')[0].reset();
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました")
    });
  })
})