##samba  

→Linuxシステム上でWindowsサーバー相当の機能を実現するソフトウェア。  

　Sambaを使用することで、LinuxシステムをWindowsネットワーク内のファイルサーバーに仕立てることが可能。またLinuxマシンとWindowsマシンとの間でのデータ交換が簡単に行えるメリットもある。  

**サーバーにsambaユーザーでログインするまで**  

(前提)SElinuxとfirewallは無効にしておくこと。  

1. sambaをインストールする  

  #yum install -y samba  

  rpm -qa | grep samba(確認)  


 2. 新規ユーザーを登録  
   
   #pdbedit - a yukiotake  


 3. 設定ファイルを設定  

   cd /etc/samba/smb.conf  

   [grobal]セクション(samba全体の設定)  

   A WORKGROUPの設定  
   
     workgroup = WORKGROUP  

 4. samba起動  

    systemctl start smb.service  

    systemctl enable smb(自動起動)  

 **よくあるエラー**  

 - ipアドレスが違う  
 - selinux or firewallが有効  
 - sambaが起動していない  

 ***  

 **フォルダー作る**  

 1. 共有フォルダ  

  A 共有pathの下にディレクトリ作成。共有だからパーミッションは777に設定。   

    mkdir /home/samba
    
    chmod 777 /home/samba  

    mkdir public  

  B 設定ファイルの編集  

    [共有名](他のユーザーとの共有スペース)  

    comment = public
    path = /home/samba/public
    writable = yes               ←書き込みを許可する  
    public = no                  ←guestアカウントでのログインを許可する  
    printable = no
    write list = +staff  

2. 登録ユーザー(yukiotake)だけが入れる  

  A 共有pathの下にディレクトリ作成。  

    mkdir test1  

  B 設定ファイルの編集(/etc/samba/smb.conf)  

   [test1]
   comment = only yukiotake  
   path = /home/samba/test1  
   writable = yes  
   public = yes  
   printable = no  
   write list = +staff  
   valid users = yukiotake  

**自分のディレクトリを消したい場合は[homes](一般ユーザのホームディレクトリに関する設定)をコメントアウト**  

 ***




