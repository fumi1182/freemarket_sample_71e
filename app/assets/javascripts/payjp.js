document.addEventListener(
  'DOMContentLoaded', (e) => {
    if (document.getElementById("token_submit") != null) { //token_submitというidがnullの場合、下記コードを実行しない
      Payjp.setPublicKey("pk_test_43e2e13c79bc27b1ce6ee5f3"); //ここに公開鍵を直書き
      var btn = document.getElementById("token_submit"); //IDがtoken_submitの場合に取得されます
      btn.addEventListener('click', function(e) { //ボタンが押されたときに作動します
        e.preventDefault(); //ボタンを一旦無効化します
        var card = {
          number: document.getElementById('card_number').value,
          cvc: document.getElementById('cvc').value,
          exp_month: document.getElementById('exp_month').value,
          exp_year: document.getElementById('exp_year').value
        }; //入力されたデータを取得します。
        

        Payjp.createToken(card, function(status, response) {
          if (status === 200) { //成功した場合
            $("#card_number").removeAttr("name");
            $("#cvc").removeAttr("name");
            $("#exp_month").removeAttr("name");
            $("#exp_year").removeAttr("name"); //データを自サーバにpostしないように削除
            $("#card_token").append(
              $('<input type="hidden" name="payjp_token">').val(response.id)
            ); //取得したトークンを送信できる状態にします
            console.log(response.id);
            document.inputForm.submit();
            alert("登録が完了しました"); //確認用
          } else {
            alert("カード情報が正しくありません。"); //確認用
          }
        });
      });
    }
  },
  false
);