<?php


class Model_kakikomi extends Model_Crud  {

  protected static $_table_name = 'kakikomi';
  protected static $_primary_key = 'number';

    public static function get_all()
    {
        $results = DB::query('SELECT * FROM kakikomi')->execute();
        return $results->as_array();
    }
}


