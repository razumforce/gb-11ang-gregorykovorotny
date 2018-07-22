window.onload = function() {
  $5('.class1').setHTML('<p>Эта разметка была <strong>вставленна</strong> фреймворком $5</p>');
  $5('p span').setText('Этот текст был вставлен фреймворком $5');
  $5('+check1').setAttr('checked', true);
  $5('+check2').setAttr('checked', true);
  $5('#elem-to-remove').del();
  $5('#html-plus-attributes')
    .setHTML('<h2>Привет</h2><p>Меня вставил фреймворк $5</p>')
    .setAttr('title', 'Я подсказка');

  var $5extra = $5('#extra-sample');
  $5extra.setHTML('<p>Я разметка, которую вставил фреймворк $5.</p>');

}
