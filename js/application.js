$(document).ready(function() {
  $( '#button' ).click(function() {
      $( '#textbox' ).blur();
      var lastfmusername = 'user='
          + document.getElementById( 'textbox' ).value;
      $.ajax({
          type: 'POST',
          url: 'http://ws.audioscrobbler.com/2.0/',
          data: 'method=user.getfriends&'
              + lastfmusername
              + '&api_key=84f102d8aaa1c663732540d339bf2100&'
              + 'format=json',
          dataType: 'json',
          success: function(data) {
              var users = data.friends.user;
              $.each(users, function(i, user) {
                  $.ajax({
                      type: 'POST',
                      url: 'http://ws.audioscrobbler.com/2.0/',
                      data: 'method=user.gettopartists&'
                          + 'user='
                          + user.name
                          + '&period=7day&'
                          + 'api_key=84f102d8aaa1c663732540d339bf2100&'
                          + 'format=json',
                      dataType: 'json',
                      success: function(data1) {
                          if(typeof data1.topartists.artist[0] !== "undefined") {
                              $.when($( '#success' ).append('<span class="username">'
                                  + '<b>'
                                  + '<i class="fa fa-lastfm-square"'
                                  + 'title="See '
                                  + user.name
                                  + '\'s friends"'
                                  + 'user-name='
                                  + user.name
                                  + '>'
                                  + '</i>'
                                  + '&nbsp;'
                                  + '<a href="'
                                  + "http://www.last.fm/user/"
                                  + user.name
                                  + '"'
                                  + 'target="_blank"'
                                  + 'title='
                                  + user.realname
                                  + '>'
                                  + user.name
                                  + '</a>' + '</b>' + "'s "
                                  + "top artist: "
                                  + '</span>'
                                  + '<div class="bottom-row">')).then($( '#success' ).append('<span class="topartist">'
                                  + '&nbsp;' + '&nbsp;' + '&nbsp;' + '&nbsp;'
                                  + '<a href="'
                                  + data1.topartists.artist[0].url
                                  + '"' + 'target="_blank"'
                                  + '>'
                                  + data1.topartists.artist[0].name
                                  + '</a>'
                                  + '</span>'
                                  + '<span class="playcount">'
                                  + '<a href="'
                                  + "http://www.last.fm/user/"
                                  + user.name
                                  + "/library/music/"
                                  + data1.topartists.artist[0].name
                                  + '?date_preset=LAST_7_DAYS"'
                                  + 'target="_blank"'
                                  + '>'
                                  + " (" + data1.topartists.artist[0].playcount
                                  + " plays)"
                                  + '</a>'
                                  + '</span>'
                                  + '</div>'
                                  + '<br>' + '<br>'));
                          }
                      }
                  });
              });
          }
      }).done(function(data) {
          $( '#success' ).html(data);
      });
  });
});
$(document).ready(function () {
    $(document).on('click', '.fa-lastfm-square', function(event) {
        var userName = event.target.getAttribute( 'user-name' );
        $( '#textbox' ).val(userName);
        $( '#button' ).trigger('click');
        $( '#textbox' ).val(userName);
    });
});

//code to toggle between style sheets

/*
$('#minimalist').click(function (){
    $('link[href="css/application.css"]').attr('href','css/new.css');
});
$('#newfangled').click(function (){
    $('link[href="css/new.css"]').attr('href','css/application.css');
});
*/
