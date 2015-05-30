<?php
class Controller_Mysql extends Controller_Hybrid
{

  public function action_index()
  {
    $this->template->title = 'データベース'; 
    $this->template->content =  View::forge('mysql/database1');
  }

  public function forge_validation()
  {
    $val = Validation::forge();
    $val->add('name', '名前')
        ->add_rule('trim')
        ->add_rule('required')
        ->add_rule('max_length', 50);
    return $val;
  }
  
  protected $format = 'json';

  public function post_index()
  {
    $val = $this->forge_validation();

    if($val->run())
    {
      $data['name'] = $val->validated();
      $data = Model_Staff1::get_all();
      $kekka['docs'] = array_unique($data, SORT_REGULAR);
      $kekka['result'] = Model_kakikomi::get_all();
      $this->response($kekka);
    } 
    else
    {
      $data['name'] = $val->validated();
      $this->response($data);
      $this->response->status = 400;
        
    }

  }
 
  public function post_update($id)
  {  
    $entry = Model_staff1::find_one_by_id($id);
    $name = $_POST['name'];
    $age =  $_POST['age'];
    $entry->set(array(
      'name'  => $name,
      'age' => $age
    ));
    $entry->save();
      $this->response($entry);
  }
  public function post_remove($id)
  {
    $entry = Model_staff1::find_one_by_id($id);
    $this->response($entry);
    $entry->delete();
  }
  public function  post_add()
  {
    $name = $_POST['name'];
    $age =  $_POST['age'];
    $data = array('name' => $name,'age' => $age,);
    $form = Model_staff1::forge()->set($data);
    $form->save();
    $this->response($form); 
  }
  public function  post_adm($id1)
  {
    $comment = $_POST['comment1'];
    $data = array(
     'id1' => $id1,
   'comment' => $comment,
    );
    $form = Model_kakikomi::forge()->set($data);
    $form->save();
    $form['number'] = $form->number; 
    $form->save();
    $this->response($form);
  }
  
  public function post_upupup($number)
  {

    $entry = Model_kakikomi::find_one_by_number($number);
    $comment = $_POST['comment'];
    $entry->set(array('comment' => $comment));
    $entry->save();
    $this->response($entry);
  }

  public function post_delete($number)
  {
    $entry = Model_kakikomi::find_one_by_number($number);
    $this->response($entry);
    $entry->delete();
  }
}


