##ssh公開認証鍵を使った接続

1.Linuxサーバーに.sshディレクトリを作る。  
  
   mkdir .ssh  

   chmod 700 .ssh ←自分だけ読む書く実行できる状態  


2. Linuxサーバー公開鍵と秘密鍵を作る。(一般ユーザー側に作る)  
  
   ssh-keygen -t rsa  
    
   →id_rsa id_rsa.pub生成   
  
3. Linuxの公開鍵の名前をauthorized_keysに変更・そしてpermissionは600に変更  

   mv .ssh/id_rsa.pub .ssh/authorized_keys  

   chmod 600  .ssh/authorized_keys  

4. sshの設定ファイルは/etc/ssh/sshd_configの  
  
   A protcol 2の#とる。 ←１より２だけの方が安全性がたかい 

   B PubkeyAuthentication yes にして#をとる。  

**ここで一回、SSH接続（パスワード有りの）をしてみよう！！！！！！！！！！！！**  

    **ssh yukiotake@192.168.ccc.ddd**  


 ***  
 
ここからは秘密鍵で認証できるようにするのだ

5. mac側にも.sshディレクトリ作る。  

   mkdir .ssh  
  
   chmod 700 .ssh ←自分だけ読む書く実行できる状態  

6. Linuxサーバーで作った秘密鍵をコピーしてくる。  

   scp ssh:/home/yukiotake/.ssh/id_rsa /Users/yukimelon/.ssh  

7. 秘密鍵のpermissionを４００にする。  

   chmod 400  .ssh/id_rsa  

8. sshの設定ファイルを作る。  

   .sshディレクトリの下にconfigファイルを作る。  

   host ssh  
   HostName        192.168.11.13  
   IdentityFile    ~/.ssh/id_rsa  
   User            yukiotake  

9. sshの設定ファイルは/etc/ssh/sshd_configの 

   A PermitRootLogin noにする。  

   B passwordauthentification noにする。下  

10. SElinuxを無効化  

   setenforce 0 (root側で)  

## 公開鍵認証（パスワードなし）が完了。  


** よくあるエラー **

- ssh接続でsettimeout  

  →繋げる先が間違ってて時間切れになる  

  1. IPアドレスが違っている。  
  2. NATになっている。  

 - permission denied  
 
  →権限がない  

  1. SElinuxが有効  
  2. 設定ファイルが違う。  
  3. Linuxサーバー側かローカル側かどっちかのディレクトリのpermissionが違う。  
  4. 秘密鍵がローカル側にないor設定が違う  

***

##SElinuxとfirewall  

1.SElinux  
  
  Linuxのセキュリティを向上させるためのセキュリティ拡張機能。  

  プロセスやユーザーごとにファイルやディレクトリ、ネットワークへのアクセスを細かく制限することができる。  

  →つまり**ファイルのパーミッションよりきめ細かい！！**  

  A 現在の動作モード確認  

   #getenforce  

   Enforcing(有効)  permissive(無効)　　

  B 再起動後もとめる  

    /etc/sysconfig/selinux  

    SELINUX = disabled  

2.firewall  

  ある特定のコンピュータネットワークとその外部との通信を制御し、内部のコンピュータネットワークの安全を維持することを目的としたもの。  

  A firewalld自動起動停止  

  # systemctl disable firewalld  


  外部のlinuxサーバー使う場合つまりは外部に接続する場合はこの２つとめておくこと。  


  
