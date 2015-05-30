<?php

class Model_Staff1 extends Model_Crud
{

  protected static $_table_name = 'staff1';

  public static function get_all()
  {
    $result = DB::query('SELECT * FROM staff1')->execute();
    return $result->as_array();
  }
  public static function get_remove()
  {
    $result = DB::query('SELECT * FROM staff1')->execute()->as_array();
    return $result;
  }
  public static function get_update()
  {
    $result = DB::query('SELECT * FROM staff1')->execute()->as_array();
   return $result;
  }
}
