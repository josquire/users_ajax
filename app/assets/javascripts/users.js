$(document).ready(function() {

  var BASEURL = 'http://devpoint-ajax-example-server.herokuapp.com/api/v1/';

  function loadUsers() {
      $('#users').empty();
    $.ajax({
      url: BASEURL + '/users',
      type: 'GET',
      dataType: 'JSON'
    }).done(function(data) {
      data.forEach(function(user) {
        $('#users').append('<li data-user-id="' + user.id + '">' + user.first_name + ' ' + user.last_name +
                           '<button class="delete_user">Delete</button> \
                            <button class="edit_button">Edit</button> \
                            </li>');

      });
    }).fail(function(data) {
      console.log(data);
    });
  }

  $('#load_users').click(function() {
    loadUsers();
  });

  $(document).on('click', '.delete_user', function() {
    var userId = $(this).parent().data('user-id');
    $.ajax({
      url: BASEURL + '/users/' + userId,
      type: 'DELETE',
      dataType: 'JSON'
    }).done(function(data){
      loadUsers();
    }).fail(function(data){

    });
  });

  $('#create_users').click(function() {
    var $newUserContent = $('#new_user_content')
    $newUserContent.slideToggle(400, function() {
      var $createButton = $('#create_users')
      if($newUserContent.is(':hidden')) {
        $createButton.text('Create User');
      } else {
        $createButton.text('Hide Create User');
      }
    });
  });

  $('#new_user').submit(function(e) {
    e.preventDefault();

    var $userFirst = $('#user_first_name');
    var $userLast = $('#user_last_name');
    var $userPhone = $('#user_phone_number');
    var form = this;
    var userId = $('#user_id').val();

    $.ajax({
      url: BASEURL + $(this).attr('action'),
      type: $(this).attr('method'),
      dataType: 'JSON',
      data: $(this).serializeArray()
    }).done(function(data){
      form.reset();
      $userFirst.focus();
      loadUsers();
    }).fail(function(data){
    });
  });

  $(document).on('click', '.edit_button', function() {
    var userId = $(this).parent().data('user-id');
    $.ajax({
      url: BASEURL + '/users/' + userId,
      type: 'GET',
      dataType: 'JSON'
    }).done(function(data){
      var firstName = data.first_name;
      var lastName = data.last_name;
      var phoneNumber = data.phone_number;
      $('#edit_first_name').val(firstName);
      $('#edit_last_name').val(lastName);
      $('#edit_phone_number').val(phoneNumber);
      $('#user_id').val(userId);
      $('#edit_content').slideDown();
      console.log(data);
    }).fail(function(data){

    });
  });

  $('#edit_user_content').submit(function(e) {
    e.preventDefault();
    var form = this;
    var userId = $('#user_id').val();
    $.ajax({
      url: BASEURL + '/users/' + userId,
      type: 'PUT',
      dataType: 'JSON',
      data: $(this).serializeArray()
    }).done(function(data){
      form.reset();
      $('#edit_content').slideUp();
      loadUsers();
    }).fail(function(data){

    });
  });

});
